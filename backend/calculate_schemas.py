#!/usr/bin/env python3
"""Calculate total schema character counts for all _ZED_CORE_TOOLS."""
import re, json
from pathlib import Path

tools_dir = Path(r"C:\Users\balur\Downloads\AVDE\Dashboard\zed-agent\tools")

# Find all SCHEMA variable assignments
all_schema_vars = {}
for pyfile in sorted(tools_dir.glob("*.py")):
    if pyfile.name in ("__init__.py", "registry.py", "mcp_tool.py", "schema_sanitizer.py"):
        continue
    try:
        source = pyfile.read_text(encoding="utf-8-sig")
    except:
        continue
    for m in re.finditer(r'([A-Z_]+_SCHEMA)\s*=\s*\{', source):
        var_name = m.group(1)
        # Parse the dict
        start_brace = source.index("{", m.start())
        depth = 0
        in_str = False
        str_char = None
        escape = False
        end = start_brace
        for i in range(start_brace, len(source)):
            c = source[i]
            if escape:
                escape = False
                continue
            if c == '\\':
                escape = True
                continue
            if c in ('"', "'") and not in_str:
                in_str = True
                str_char = c
                continue
            if in_str:
                if c == str_char and (i == 0 or source[i-1] != '\\'):
                    in_str = False
                continue
            if c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    end = i + 1
                    break
        schema_text = source[start_brace:end]
        all_schema_vars[var_name] = schema_text

# Try to evaluate each as JSON
parsed = {}
for var, text in sorted(all_schema_vars.items()):
    try:
        parsed[var] = json.loads(text)
    except json.JSONDecodeError as e:
        print(f"  FAILED to parse {var}: {e}")
        parsed[var] = None

# Core tool schema wire-up
tool_map = {}

# Group by file
file_var_map = {
    "web_tools.py": [("web_search", "WEB_SEARCH_SCHEMA"), ("web_extract", "WEB_EXTRACT_SCHEMA")],
    "terminal_tool.py": [("terminal", "TERMINAL_SCHEMA")],
    "process_registry.py": [("process", "PROCESS_SCHEMA")],
    "read_terminal_tool.py": [("read_terminal", "READ_TERMINAL_SCHEMA")],
    "file_tools.py": [("read_file", "READ_FILE_SCHEMA"), ("write_file", "WRITE_FILE_SCHEMA"), ("patch", "PATCH_SCHEMA"), ("search_files", "SEARCH_FILES_SCHEMA")],
    "vision_tools.py": [("vision_analyze", "VISION_ANALYZE_SCHEMA")],
    "image_generation_tool.py": [("image_generate", "IMAGE_GENERATE_SCHEMA")],
    "skills_tool.py": [("skills_list", "SKILLS_LIST_SCHEMA"), ("skill_view", "SKILL_VIEW_SCHEMA")],
    "skill_manager_tool.py": [("skill_manage", "SKILL_MANAGE_SCHEMA")],
    "browser_tool.py": [("browser_navigate", "BROWSER_NAVIGATE_SCHEMA"), ("browser_snapshot", "BROWSER_SNAPSHOT_SCHEMA"), ("browser_click", "BROWSER_CLICK_SCHEMA"), ("browser_type", "BROWSER_TYPE_SCHEMA"), ("browser_scroll", "BROWSER_SCROLL_SCHEMA"), ("browser_back", "BROWSER_BACK_SCHEMA"), ("browser_press", "BROWSER_PRESS_SCHEMA"), ("browser_get_images", "BROWSER_GET_IMAGES_SCHEMA"), ("browser_vision", "BROWSER_VISION_SCHEMA"), ("browser_console", "BROWSER_CONSOLE_SCHEMA")],
    "browser_cdp_tool.py": [("browser_cdp", "BROWSER_CDP_SCHEMA")],
    "browser_dialog_tool.py": [("browser_dialog", "BROWSER_DIALOG_SCHEMA")],
    "tts_tool.py": [("text_to_speech", "TTS_SCHEMA")],
    "todo_tool.py": [("todo", "TODO_SCHEMA")],
    "memory_tool.py": [("memory", "MEMORY_SCHEMA")],
    "session_search_tool.py": [("session_search", "SESSION_SEARCH_SCHEMA")],
    "clarify_tool.py": [("clarify", "CLARIFY_SCHEMA")],
    "code_execution_tool.py": [("execute_code", "EXECUTE_CODE_SCHEMA")],
    "delegate_tool.py": [("delegate_task", "DELEGATE_TASK_SCHEMA")],
    "cronjob_tools.py": [("cronjob", "CRONJOB_SCHEMA")],
    "homeassistant_tool.py": [("ha_list_entities", "HA_LIST_ENTITIES_SCHEMA"), ("ha_get_state", "HA_GET_STATE_SCHEMA"), ("ha_list_services", "HA_LIST_SERVICES_SCHEMA"), ("ha_call_service", "HA_CALL_SERVICE_SCHEMA")],
    "kanban_tools.py": [("kanban_show", "KANBAN_SHOW_SCHEMA"), ("kanban_list", "KANBAN_LIST_SCHEMA"), ("kanban_complete", "KANBAN_COMPLETE_SCHEMA"), ("kanban_block", "KANBAN_BLOCK_SCHEMA"), ("kanban_heartbeat", "KANBAN_HEARTBEAT_SCHEMA"), ("kanban_comment", "KANBAN_COMMENT_SCHEMA"), ("kanban_create", "KANBAN_CREATE_SCHEMA"), ("kanban_link", "KANBAN_LINK_SCHEMA"), ("kanban_unblock", "KANBAN_UNBLOCK_SCHEMA")],
}

# Read skills_tool.py for skills_list and skill_view schema vars
skills_source = (tools_dir / "skills_tool.py").read_text(encoding="utf-8-sig")
for m in re.finditer(r'([A-Z]+_SCHEMA)\s*=\s*\{', skills_source):
    var_name = m.group(1)
    print(f"  skills_tool.py: {var_name}")

# Read computer_use
cu_source = (tools_dir / "computer_use_tool.py").read_text(encoding="utf-8-sig")
for m in re.finditer(r'([A-Z_]+_SCHEMA)\s*=\s*\{', cu_source):
    var_name = m.group(1)
    print(f"  computer_use_tool.py: {var_name}")
# Also check computer_use/schema.py
cu_schema_source = (tools_dir / "computer_use" / "schema.py").read_text(encoding="utf-8-sig")
for m in re.finditer(r'([A-Z_]+_SCHEMA)\s*=\s*\{', cu_schema_source):
    var_name = m.group(1)
    print(f"  computer_use/schema.py: {var_name}")

# Check send_message_tool.py and other tools for schema vars
for fn in ["send_message_tool.py", "mixture_of_agents_tool.py", "discord_tool.py", "video_generation_tool.py", "video_analyze"]:
    fp = tools_dir / fn
    if fp.exists():
        src = fp.read_text(encoding="utf-8-sig")
        for m in re.finditer(r'([A-Z_]+_SCHEMA)\s*=\s*\{', src):
            var_name = m.group(1)
            print(f"  {fn}: {var_name}")

# Check vision_tools.py for VIDEO_ANALYZE_SCHEMA
vt_source = (tools_dir / "vision_tools.py").read_text(encoding="utf-8-sig")
for m in re.finditer(r'([A-Z_]+_SCHEMA)\s*=\s*\{', vt_source):
    print(f"  vision_tools.py: {m.group(1)}")

# Print all parsed schema variable names
print(f"\nAll {len(all_schema_vars)} schema variables found:")
for var in sorted(all_schema_vars.keys()):
    sz = len(all_schema_vars[var])
    print(f"  {var}: {sz} chars")
