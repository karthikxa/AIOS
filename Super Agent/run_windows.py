"""Windows launcher for SuperAgent.

Starts:
  1. Windows Desktop API server (screenshot + input via mss/Win32) on port 7777
  2. SuperAgent instance connected to the LLM Proxy on port 3002
  3. HITL HTTP server on port 9001 for frontend instruction injection
"""

from __future__ import annotations

import asyncio
import logging
import sys
from pathlib import Path

# Add parent to path so we can import superagent
sys.path.insert(0, str(Path(__file__).parent.resolve()))

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("run_windows")

HITL_PORT = 9002


async def agent_worker(agent) -> None:
    """Persistent background worker: waits for instructions and processes them."""
    last_processed = 0
    while True:
        try:
            instructions = agent.loop.state.instructions
            if len(instructions) > last_processed:
                # Process new instructions
                for i in range(last_processed, len(instructions)):
                    instruction = instructions[i]
                    logger.info("Processing instruction: %s", instruction[:80])
                    # Run the loop with this instruction as objective
                    await agent.loop.run(instruction)
                    logger.info("Finished processing instruction")
                last_processed = len(instructions)
            await asyncio.sleep(0.5)
        except asyncio.CancelledError:
            break
        except Exception as exc:
            logger.error("Agent worker error: %s", exc)
            await asyncio.sleep(1)


async def main() -> None:
    # 1. Start the Windows desktop server in a thread
    from container.windows_desktop_server import run_server
    import threading

    server_thread = threading.Thread(
        target=run_server,
        kwargs={"host": "127.0.0.1", "port": 7777, "debug": False},
        daemon=True,
    )
    server_thread.start()
    logger.info("Windows Desktop API server started on 127.0.0.1:7777")

    # Give the server a moment to start
    await asyncio.sleep(1)

    # 2. Verify LLM Proxy is reachable
    import aiohttp

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get("http://127.0.0.1:3002/v1/models", timeout=aiohttp.ClientTimeout(total=3)) as resp:
                if resp.status == 200:
                    logger.info("LLM Proxy is reachable at 127.0.0.1:3002")
    except Exception as exc:
        logger.warning("LLM Proxy not reachable: %s", exc)
        logger.warning("Make sure the LLM Proxy is running on port 3002")

    # 3. Start the SuperAgent
    from superagent import SuperAgent, AgentConfig

    config = AgentConfig(
        provider="freellm",
        model="auto",
        vision_model="auto",
        action_model="auto",
        base_url="http://127.0.0.1:3002/v1",
        api_base_url="http://127.0.0.1:3002/v1",
        api_key="",
        desktop_host="127.0.0.1",
        desktop_port=7777,
        stream_host="127.0.0.1",
        enable_memory=True,
        enable_scheduler=True,
        enable_monitor=True,
        max_steps=40,
    )
    agent = SuperAgent(config)
    logger.info("SuperAgent constructed")

    await agent.start()
    logger.info("SuperAgent started. Agent is ready.")

    # 4. Register desktop API with dashboard
    from superagent.dashboard_api import register_agent_desktop
    register_agent_desktop(config.agent_id, agent.desktop_api)
    logger.info("Desktop API registered with dashboard for %s", config.agent_id)

    # 5. Start HITL server for frontend communication
    from superagent.hitl import HITLServer
    hitl = HITLServer(agent=agent, host="127.0.0.1", port=HITL_PORT)
    await hitl.start()

    # 6. Start persistent agent worker
    worker_task = asyncio.create_task(agent_worker(agent))

    logger.info("SuperAgent is ready on HITL port %d. Waiting for instructions...", HITL_PORT)

    # Keep running
    try:
        while True:
            await asyncio.sleep(1)
    except KeyboardInterrupt:
        logger.info("Shutting down...")
        worker_task.cancel()
        await hitl.stop()
        await agent.stop()


if __name__ == "__main__":
    asyncio.run(main())
