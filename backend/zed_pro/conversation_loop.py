"""Multi-turn conversation loop for Zed Pro.

ZedProAgent.run() orchestrates:
  1. Build system prompt (prompt_builder)
  2. Load recent session messages (memory_store)
  3. Send to freellmapi via OpenAI SDK
  4. If model returns tool_calls → execute → feed results back → repeat
  5. Stream final text tokens via a callback
  6. Persist messages to session DB

Loop runs up to MAX_ITERATIONS (15) rounds. SSE streaming is handled by
run_zed_pro_chat() which wraps run() in an async generator for FastAPI
StreamingResponse.

All tool calls within a single model response are executed concurrently
(they are independent at that point -- the model chose them together).
"""

from __future__ import annotations

import json
import logging
import time
from typing import Any, AsyncIterator, Callable, Dict, List, Optional

from openai import AsyncOpenAI

from .config import (
    CONTEXT_MESSAGES_LOAD,
    DEFAULT_MODEL,
    FREELLMAPI_API_KEY,
    FREELLMAPI_BASE_URL,
    MAX_ITERATIONS,
)
from . import memory_store
from .prompt_builder import build_system_prompt
from .tools import TOOL_SCHEMAS, execute_tool

logger = logging.getLogger(__name__)


class ZedProAgent:
    """Hermes-style autonomous agent loop, branded as Zed Pro."""

    def __init__(
        self,
        model: str = "auto",
        session_id: Optional[str] = None,
        cwd: Optional[str] = None,
        temperature: float = 0.7,
    ):
        self.model = model or DEFAULT_MODEL
        self.session_id = memory_store.ensure_session(session_id)
        self.cwd = cwd
        self.temperature = temperature
        self.client = AsyncOpenAI(
            base_url=FREELLMAPI_BASE_URL,
            api_key=FREELLMAPI_API_KEY,
        )

    async def run(
        self,
        user_message: str,
        stream_callback: Optional[Callable[[str], None]] = None,
    ) -> str:
        """Run the full agentic loop. Returns the final assistant text.

        Args:
            user_message: The user's input text.
            stream_callback: If provided, called with token deltas as they
                arrive from the final (non-tool) model response.
        """
        # 1. Build system prompt
        system_prompt = build_system_prompt(cwd=self.cwd)

        # 2. Load recent session history
        history = memory_store.load_recent_messages(
            self.session_id, CONTEXT_MESSAGES_LOAD
        )

        # 3. Persist user message
        memory_store.append_message(
            self.session_id, "user", user_message
        )

        # 4. Assemble messages for the API
        messages: List[Dict[str, Any]] = [
            {"role": "system", "content": system_prompt}
        ]
        # Add history (excluding the just-sent user message)
        for msg in history:
            m: Dict[str, Any] = {"role": msg["role"], "content": msg.get("content", "")}
            if msg.get("tool_calls"):
                m["tool_calls"] = msg["tool_calls"]
            if msg.get("tool_call_id"):
                m["tool_call_id"] = msg["tool_call_id"]
            messages.append(m)
        # Append the new user message
        messages.append({"role": "user", "content": user_message})

        # 5. Agentic loop
        final_text = ""
        for iteration in range(MAX_ITERATIONS):
            logger.debug("Zed Pro iteration %d/%d", iteration + 1, MAX_ITERATIONS)

            # Check if we should stream (only on last expected content turn)
            is_last_turn = True  # we don't know in advance; stream always

            resp = await self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                tools=TOOL_SCHEMAS,
                temperature=self.temperature,
                stream=True,
                max_tokens=4096,
            )

            # Accumulate streamed response
            assistant_content = ""
            tool_calls_acc: List[Dict[str, Any]] = []
            current_tool_idx = 0
            current_tool: Dict[str, Any] = {}

            async for chunk in resp:
                if not chunk.choices:
                    continue
                delta = chunk.choices[0].delta

                # Text content
                if delta.content:
                    assistant_content += delta.content
                    if stream_callback:
                        stream_callback(delta.content)

                # Tool calls (streamed in pieces)
                if delta.tool_calls:
                    for tc_delta in delta.tool_calls:
                        idx = tc_delta.index if tc_delta.index is not None else current_tool_idx
                        # Ensure slot exists
                        while len(tool_calls_acc) <= idx:
                            tool_calls_acc.append({
                                "id": "",
                                "type": "function",
                                "function": {"name": "", "arguments": ""},
                            })
                        if tc_delta.id:
                            tool_calls_acc[idx]["id"] = tc_delta.id
                        if tc_delta.function:
                            if tc_delta.function.name:
                                tool_calls_acc[idx]["function"]["name"] += tc_delta.function.name
                            if tc_delta.function.arguments:
                                tool_calls_acc[idx]["function"]["arguments"] += tc_delta.function.arguments

            finish_reason = chunk.choices[0].finish_reason if chunk.choices else "stop"

            # Build assistant message
            asst_msg: Dict[str, Any] = {"role": "assistant", "content": assistant_content or None}
            if tool_calls_acc:
                asst_msg["tool_calls"] = tool_calls_acc
            messages.append(asst_msg)

            # If no tool calls, we're done
            if not tool_calls_acc:
                final_text = assistant_content
                break

            # Execute tool calls concurrently and feed results back
            import asyncio
            tasks = []
            for tc in tool_calls_acc:
                fn_name = tc["function"]["name"]
                try:
                    args = json.loads(tc["function"]["arguments"] or "{}")
                except json.JSONDecodeError:
                    args = {}
                tasks.append(execute_tool(fn_name, args))

            results = await asyncio.gather(*tasks, return_exceptions=True)

            for tc, result in zip(tool_calls_acc, results):
                tool_content = result if isinstance(result, str) else f"Error: {result}"
                messages.append({
                    "role": "tool",
                    "tool_call_id": tc["id"],
                    "content": tool_content[:4000],  # cap tool output
                })

            final_text = assistant_content  # in case loop ends
        else:
            logger.warning("Zed Pro hit max iterations (%d)", MAX_ITERATIONS)

        # 6. Persist assistant message
        asst_final: Dict[str, Any] = {"content": final_text}
        last_asst = messages[-1] if messages else {}
        if last_asst.get("role") == "assistant" and last_asst.get("tool_calls"):
            asst_final["tool_calls"] = last_asst["tool_calls"]
        memory_store.append_message(
            self.session_id, "assistant", final_text,
            tool_calls=asst_final.get("tool_calls"),
        )

        return final_text


# =========================================================================
# Async generator for FastAPI StreamingResponse
# =========================================================================

async def run_zed_pro_chat(
    user_message: str,
    model: str = "auto",
    session_id: Optional[str] = None,
    temperature: float = 0.7,
) -> AsyncIterator[str]:
    """Async generator that yields SSE-formatted tokens.

    Usage in server.py:
        return StreamingResponse(
            run_zed_pro_chat(msg, model, session_id, temp),
            media_type="text/event-stream",
        )
    """
    agent = ZedProAgent(
        model=model,
        session_id=session_id,
        temperature=temperature,
    )
    token_buffer: List[str] = []
    done = False

    def on_token(token: str):
        token_buffer.append(token)

    # Run the agent loop in a separate task so we can yield tokens live
    import asyncio

    loop = asyncio.get_event_loop()

    async def _run_and_collect():
        nonlocal done
        try:
            await agent.run(user_message, stream_callback=on_token)
        finally:
            done = True

    task = loop.create_task(_run_and_collect())

    # Yield tokens as they arrive
    while not done or token_buffer:
        if token_buffer:
            chunk = "".join(token_buffer)
            token_buffer.clear()
            # Format as SSE
            data = json.dumps({"choices": [{"delta": {"content": chunk}, "finish_reason": None}]})
            yield f"data: {data}\n\n"
        else:
            await asyncio.sleep(0.05)
            # Pump the event loop so the agent task can make progress
            await asyncio.sleep(0)

    # Yield final done event
    done_data = json.dumps({"choices": [{"delta": {}, "finish_reason": "stop"}]})
    yield f"data: {done_data}\n\n"
    yield "data: [DONE]\n\n"

    # Re-raise any exception from the agent task
    if task.exception():
        raise task.exception()
