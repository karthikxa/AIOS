"""Windows launcher for SuperAgent.

Starts:
  1. Windows Desktop API server (screenshot + input via mss/Win32) on port 7777
  2. SuperAgent instance connected to the LLM Proxy on port 3002
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

    # Keep running
    try:
        while True:
            await asyncio.sleep(1)
    except KeyboardInterrupt:
        logger.info("Shutting down...")
        await agent.stop()


if __name__ == "__main__":
    asyncio.run(main())
