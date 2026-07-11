"""
Zed Pro — Hermes-style autonomous agent, branded as Zed Pro.

Self-contained subpackage that turns the basic freellmapi chat proxy into a
full agentic loop: 8-layer system-prompt assembly, persistent SQLite memory,
auto-discovered skills, a multi-turn tool loop, and session history.

Modules
-------
config           — paths, constants, env overrides
threat_scanner   — block prompt-injection before files enter the prompt
memory_store     — SQLite memories + sessions (create/list/load/save/delete)
skills_store     — scan ~/.zed/skills/, build index, skill_view()
prompt_builder   — assemble the 8-layer system prompt before every turn
tools            — tool schemas + executors (web_search, files, code, memory, ...)
conversation_loop — the multi-turn AIAgent loop that streams tokens back

Wire-up lives in ../server.py (the /v1/chat/completions route) — when the
request model is "zed-pro", it routes through ZedProAgent.run() instead of
forwarding straight to freellmapi.
"""

from .conversation_loop import ZedProAgent, run_zed_pro_chat

__all__ = ["ZedProAgent", "run_zed_pro_chat"]
