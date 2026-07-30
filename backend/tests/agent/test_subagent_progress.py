"""
Integration tests for SubagentTaskManager real-time telemetry, complete_phase,
watchdog timeout, and token estimate flags.
"""

import asyncio
import json
import pytest
import time
from server import SubagentTaskManager, subagent_manager

@pytest.mark.asyncio
async def test_subagent_spawn_and_completion_lifecycle():
    mgr = SubagentTaskManager()
    sub_id = mgr.create_subagent(
        name="Test Subagent",
        task_description="Research top 3 Python frameworks",
        workers=[{"name": "Worker 1", "motto": "Search frameworks", "icon": "⚡"}],
        tool_call_id="call-test-123"
    )
    assert sub_id.startswith("subagent-")
    assert mgr.get_subagent_id_for_tool("call-test-123") == sub_id

    # Register SSE queue
    q = asyncio.Queue()
    mgr.listeners[sub_id].append(q)

    # Trigger spawn phase
    await mgr.spawn_phase(sub_id)

    # Check spawn_requested and start events
    spawn_evt = await asyncio.wait_for(q.get(), timeout=2.0)
    assert "subagent.spawn_requested" in spawn_evt
    start_evt = await asyncio.wait_for(q.get(), timeout=2.0)
    assert "subagent.start" in start_evt

    # Trigger complete phase with structured result
    structured_result = {
        "result": "FastAPI, Django, Flask",
        "tools_used": ["web_search", "read_file"],
        "token_usage": {"input": 150, "output": 280}
    }
    await mgr.complete_phase(sub_id, structured_result)

    progress_evt = await asyncio.wait_for(q.get(), timeout=2.0)
    assert "subagent.progress" in progress_evt

    complete_evt = await asyncio.wait_for(q.get(), timeout=2.0)
    assert "subagent.complete" in complete_evt

    # Verify task state
    task = mgr.subagents[sub_id]
    assert task["status"] == "Completed"
    assert task["inputTokens"] == 150
    assert task["outputTokens"] == 280
    assert task["toolCount"] == 2
    assert "web_search" in task["logs"][-1]

@pytest.mark.asyncio
async def test_subagent_watchdog_timeout():
    mgr = SubagentTaskManager()
    sub_id = mgr.create_subagent(
        name="Timeout Subagent",
        task_description="Long running task",
        workers=[]
    )

    q = asyncio.Queue()
    mgr.listeners[sub_id].append(q)

    # Trigger spawn phase (which launches watchdog)
    await mgr.spawn_phase(sub_id)

    # Start watchdog with 1-second timeout for testing
    asyncio.create_task(mgr._start_watchdog(sub_id, timeout_seconds=1))

    # Wait for watchdog to trigger error
    await asyncio.sleep(1.5)

    task = mgr.subagents[sub_id]
    assert task["status"] == "Failed"

    # Check error event in queue
    error_found = False
    while not q.empty():
        msg = await q.get()
        if "subagent.error" in msg:
            error_found = True
            assert "timed out" in msg
    assert error_found
