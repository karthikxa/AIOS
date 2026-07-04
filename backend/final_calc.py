#!/usr/bin/env python3
"""Calculate total token consumption / char sizes for all _ZED_CORE_TOOLS schemas."""
import re, json, sys
from pathlib import Path

tools_dir = Path("tools")

def extract_dict(text, pos):
    """Extract balanced dict literal starting at pos (which should be '{')."""
    depth = 0
    in_str = False
    str_char = None
    escape = False
    for i in range(pos, len(text)):
        c = text[i]
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
            if c == str_char and not escape:
                in_str = False
            continue
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return text[pos:i+1]
    return text[pos:]

def py_dict_to_json(text):
    """Approximately convert Python dict literal to JSON (handle True/False/None, single quotes)."""
    result = []
    i = 0
    in_single = False
    in_double = False
    escape = False
    while i < len(text):
        c = text[i]
        if escape:
            result.append(c)
            escape = False
            i += 1
            continue
        if c == '\\':
            result.append(c)
            escape = True
            i += 1
            continue
        if c == "'" and not in_double:
            in_single = not in_single
            result.append('"')
            i += 1
            continue
        if c == '"' and not in_single:
            in_double = not in_double
            result.append('"')
            i += 1
            continue
        if not in_single and not in_double:
            if text[i:i+4] == 'True':
                result.append('true')
                i += 4
                continue
            if text[i:i+5] == 'False':
                result.append('false')
                i += 5
                continue
            if text[i:i+4] == 'None':
                result.append('null')
                i += 4
                continue
        result.append(c)
        i += 1
    return ''.join(result)

def measure_schema(name, raw_text):
    """Measure total raw chars and JSON chars for a schema dict."""
    raw_chars = len(raw_text)
    json_text = py_dict_to_json(raw_text)
    try:
        parsed = json.loads(json_text)
        json_chars = len(json.dumps(parsed))
        desc = parsed.get("description", "")
        desc_chars = len(desc)
        return raw_chars, json_chars, desc_chars, parsed
    except json.JSONDecodeError as e:
        return raw_chars, None, None, None

# All 76 tools in _ZED_CORE_TOOLS (verified from toolsets.py)
core_tools_names = [
    # Web (2)
    "web_search", "web_extract",
    # Terminal + process (3)
    "terminal", "process", "read_terminal",
    # File (4)
    "read_file", "write_file", "patch", "search_files",
    # Vision + image gen (2)
    "vision_analyze", "image_generate",
    # Skills (3)
    "skills_list", "skill_view", "skill_manage",
    # Browser (12)
    "browser_navigate", "browser_snapshot", "browser_click",
    "browser_type", "browser_scroll", "browser_back",
    "browser_press", "browser_get_images",
    "browser_vision", "browser_console", "browser_cdp", "browser_dialog",
    # TTS (1)
    "text_to_speech",
    # Planning & memory (2)
    "todo", "memory",
    # Session search (1)
    "session_search",
    # Clarify (1)
    "clarify",
    # Code execution + delegation (2)
    "execute_code", "delegate_task",
    # Cronjob (1)
    "cronjob",
    # Home Assistant (4)
    "ha_list_entities", "ha_get_state", "ha_list_services", "ha_call_service",
    # Kanban (9)
    "kanban_show", "kanban_list",
    "kanban_complete", "kanban_block", "kanban_heartbeat",
    "kanban_comment", "kanban_create", "kanban_link",
    "kanban_unblock",
    # Computer use (1)
    "computer_use",
    # Google OAuth (6)
    "gmail_list", "gmail_read", "gmail_send",
    "drive_list", "drive_search", "drive_read",
]

# Read all schemas
schemas = {}

# 1. web_tools.py
src = (tools_dir / "web_tools.py").read_text(encoding="utf-8-sig")
for var_name, tool_name in [("WEB_SEARCH_SCHEMA", "web_search"), ("WEB_EXTRACT_SCHEMA", "web_extract")]:
    m = re.search(r'\b' + var_name + r'\s*=\s*(\{)', src)
    raw = extract_dict(src, m.start(1))
    schemas[tool_name] = measure_schema(tool_name, raw)

# 2. terminal_tool.py
src = (tools_dir / "terminal_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'TERMINAL_SCHEMA\s*=\s*(\{)', src)
raw = extract_dict(src, m.start(1))
schemas["terminal"] = measure_schema("terminal", raw)

# 3. process_registry.py
src = (tools_dir / "process_registry.py").read_text(encoding="utf-8-sig")
m = re.search(r'PROCESS_SCHEMA\s*=\s*(\{)', src)
raw = extract_dict(src, m.start(1))
schemas["process"] = measure_schema("process", raw)

# 4. read_terminal_tool.py
src = (tools_dir / "read_terminal_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'READ_TERMINAL_SCHEMA\s*=\s*(\{)', src)
raw = extract_dict(src, m.start(1))
schemas["read_terminal"] = measure_schema("read_terminal", raw)

# 5. file_tools.py
src = (tools_dir / "file_tools.py").read_text(encoding="utf-8-sig")
for var_name, tool_name in [("READ_FILE_SCHEMA", "read_file"), ("WRITE_FILE_SCHEMA", "write_file"), ("PATCH_SCHEMA", "patch"), ("SEARCH_FILES_SCHEMA", "search_files")]:
    m = re.search(r'\b' + var_name + r'\s*=\s*(\{)', src)
    raw = extract_dict(src, m.start(1))
    schemas[tool_name] = measure_schema(tool_name, raw)

# 6. vision_tools.py
src = (tools_dir / "vision_tools.py").read_text(encoding="utf-8-sig")
for var_name, tool_name in [("VISION_ANALYZE_SCHEMA", "vision_analyze")]:
    m = re.search(r'\b' + var_name + r'\s*=\s*(\{)', src)
    raw = extract_dict(src, m.start(1))
    schemas[tool_name] = measure_schema(tool_name, raw)

# 7. image_generation_tool.py
src = (tools_dir / "image_generation_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'IMAGE_GENERATE_SCHEMA\s*=\s*(\{)', src)
raw = extract_dict(src, m.start(1))
schemas["image_generate"] = measure_schema("image_generate", raw)

# 8. skills_tool.py
src = (tools_dir / "skills_tool.py").read_text(encoding="utf-8-sig")
for var_name, tool_name in [("SKILLS_LIST_SCHEMA", "skills_list"), ("SKILL_VIEW_SCHEMA", "skill_view")]:
    m = re.search(r'\b' + var_name + r'\s*=\s*(\{)', src)
    raw = extract_dict(src, m.start(1))
    schemas[tool_name] = measure_schema(tool_name, raw)

# 9. skill_manager_tool.py
src = (tools_dir / "skill_manager_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'SKILL_MANAGE_SCHEMA\s*=\s*(\{)', src)
raw = extract_dict(src, m.start(1))
schemas["skill_manage"] = measure_schema("skill_manage", raw)

# 10. browser_tool.py (BROWSER_TOOL_SCHEMAS list)
src = (tools_dir / "browser_tool.py").read_text(encoding="utf-8-sig")
# Extract each dict from the BROWSER_TOOL_SCHEMAS list
browser_start = src.index("BROWSER_TOOL_SCHEMAS")
browser_list_text = extract_dict(src, src.index("[", browser_start))
# Parse each dict in the list
depth = 0
in_str = False
str_char = None
escape = False
dict_starts = []
for i, c in enumerate(browser_list_text):
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
        if c == str_char and not escape:
            in_str = False
        continue
    if c == '{':
        if depth == 0:
            dict_starts.append(i)
        depth += 1
    elif c == '}':
        depth -= 1
        if depth == 0 and dict_starts:
            start = dict_starts.pop()
            raw = browser_list_text[start:i+1]
            try:
                js = py_dict_to_json(raw)
                parsed = json.loads(js)
                tn = parsed["name"]
                schemas[tn] = measure_schema(tn, raw)
            except Exception as e:
                pass

# 11. browser_cdp_tool.py
src = (tools_dir / "browser_cdp_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'BROWSER_CDP_SCHEMA.*?=\s*(\{)', src, re.DOTALL)
if m:
    raw = extract_dict(src, m.start(1))
    schemas["browser_cdp"] = measure_schema("browser_cdp", raw)

# 12. browser_dialog_tool.py
src = (tools_dir / "browser_dialog_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'BROWSER_DIALOG_SCHEMA.*?=\s*(\{)', src, re.DOTALL)
if m:
    raw = extract_dict(src, m.start(1))
    schemas["browser_dialog"] = measure_schema("browser_dialog", raw)

# 13. tts_tool.py
src = (tools_dir / "tts_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'TTS_SCHEMA\s*=\s*(\{)', src)
raw = extract_dict(src, m.start(1))
schemas["text_to_speech"] = measure_schema("text_to_speech", raw)

# 14. todo_tool.py
src = (tools_dir / "todo_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'TODO_SCHEMA\s*=\s*(\{)', src)
raw = extract_dict(src, m.start(1))
schemas["todo"] = measure_schema("todo", raw)

# 15. memory_tool.py
src = (tools_dir / "memory_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'MEMORY_SCHEMA\s*=\s*(\{)', src)
raw = extract_dict(src, m.start(1))
schemas["memory"] = measure_schema("memory", raw)

# 16. session_search_tool.py
src = (tools_dir / "session_search_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'SESSION_SEARCH_SCHEMA\s*=\s*(\{)', src)
raw = extract_dict(src, m.start(1))
schemas["session_search"] = measure_schema("session_search", raw)

# 17. clarify_tool.py
src = (tools_dir / "clarify_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'CLARIFY_SCHEMA\s*=\s*(\{)', src)
raw = extract_dict(src, m.start(1))
schemas["clarify"] = measure_schema("clarify", raw)

# 18. code_execution_tool.py
src = (tools_dir / "code_execution_tool.py").read_text(encoding="utf-8-sig")
# execute_code schema is built dynamically by build_execute_code_schema()
# Find the build function and estimate it
m = re.search(r'def build_execute_code_schema', src)
if m:
    # Read the function body
    fn_start = m.start()
    depth = 0
    fn_end = fn_start
    for i in range(fn_start, len(src)):
        c = src[i]
        if c == ':':
            # Find the first { after the colon to get the returned dict
            dict_pos = src.index('{', i)
            raw = extract_dict(src, dict_pos)
            schemas["execute_code"] = measure_schema("execute_code", raw)
            break

# 19. delegate_tool.py
src = (tools_dir / "delegate_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'DELEGATE_TASK_SCHEMA\s*=\s*(\{)', src)
if m:
    raw = extract_dict(src, m.start(1))
    schemas["delegate_task"] = measure_schema("delegate_task", raw)

# 20. cronjob_tools.py
src = (tools_dir / "cronjob_tools.py").read_text(encoding="utf-8-sig")
m = re.search(r'CRONJOB_SCHEMA\s*=\s*(\{)', src)
raw = extract_dict(src, m.start(1))
schemas["cronjob"] = measure_schema("cronjob", raw)

# 21. homeassistant_tool.py
src = (tools_dir / "homeassistant_tool.py").read_text(encoding="utf-8-sig")
for var_name, tool_name in [
    ("HA_LIST_ENTITIES_SCHEMA", "ha_list_entities"),
    ("HA_GET_STATE_SCHEMA", "ha_get_state"),
    ("HA_LIST_SERVICES_SCHEMA", "ha_list_services"),
    ("HA_CALL_SERVICE_SCHEMA", "ha_call_service"),
]:
    m = re.search(r'\b' + var_name + r'\s*=\s*(\{)', src)
    raw = extract_dict(src, m.start(1))
    schemas[tool_name] = measure_schema(tool_name, raw)

# 22. kanban_tools.py
src = (tools_dir / "kanban_tools.py").read_text(encoding="utf-8-sig")
for var_name, tool_name in [
    ("KANBAN_SHOW_SCHEMA", "kanban_show"),
    ("KANBAN_LIST_SCHEMA", "kanban_list"),
    ("KANBAN_COMPLETE_SCHEMA", "kanban_complete"),
    ("KANBAN_BLOCK_SCHEMA", "kanban_block"),
    ("KANBAN_HEARTBEAT_SCHEMA", "kanban_heartbeat"),
    ("KANBAN_COMMENT_SCHEMA", "kanban_comment"),
    ("KANBAN_CREATE_SCHEMA", "kanban_create"),
    ("KANBAN_LINK_SCHEMA", "kanban_link"),
    ("KANBAN_UNBLOCK_SCHEMA", "kanban_unblock"),
]:
    m = re.search(r'\b' + var_name + r'\s*=\s*(\{)', src)
    raw = extract_dict(src, m.start(1))
    schemas[tool_name] = measure_schema(tool_name, raw)

# 23. computer_use/schema.py
src = (tools_dir / "computer_use" / "schema.py").read_text(encoding="utf-8-sig")
m = re.search(r'COMPUTER_USE_SCHEMA.*?=\s*(\{)', src, re.DOTALL)
if m:
    raw = extract_dict(src, m.start(1))
    schemas["computer_use"] = measure_schema("computer_use", raw)

# For Google tools (gmail_*, drive_*) - they're in zed_pro/tools.py
try:
    zed_pro_src = (Path("zed_pro") / "tools.py").read_text(encoding="utf-8-sig")
    for tool_name in ["gmail_list", "gmail_read", "gmail_send", "drive_list", "drive_search", "drive_read"]:
        # Find schema dicts for these tools
        pattern = r'\{\s*"name"\s*:\s*"' + re.escape(tool_name) + r'".*?\}'
        for m in re.finditer(pattern, zed_pro_src, re.DOTALL):
            raw = m.group(0)
            # Make sure it's a complete dict (balanced braces)
            open_count = raw.count('{')
            close_count = raw.count('}')
            if open_count == close_count:
                schemas[tool_name] = measure_schema(tool_name, raw)
except Exception as e:
    print(f"  Google tools error: {e}", file=sys.stderr)

# Print results
print(f"{'Tool':35s} {'Raw':>8s} {'JSON':>8s} {'Desc':>8s}")
print("="*65)

for name in core_tools_names:
    if name in schemas:
        raw, json_chars, desc, parsed = schemas[name]
        json_str = f"{json_chars}" if json_chars else "N/A"
        desc_str = f"{desc}" if desc else "?"
        print(f"{name:35s} {raw:>8d} {json_str:>8s} {desc_str:>8s}")
    else:
        print(f"{name:35s} {'MISSING':>8s}")

# Categories
browser_tools = ["browser_navigate", "browser_snapshot", "browser_click",
    "browser_type", "browser_scroll", "browser_back", "browser_press",
    "browser_get_images", "browser_vision", "browser_console", "browser_cdp", "browser_dialog"]
google_tools = ["gmail_list", "gmail_read", "gmail_send", "drive_list", "drive_search", "drive_read"]
all_other = [t for t in core_tools_names if t not in browser_tools and t not in google_tools]

print("\n\n=== SUMMARY ===")
print(f"Total tools expected: {len(core_tools_names)}")
print(f"Tools found: {len(schemas)}")
print(f"Tools missing: {[t for t in core_tools_names if t not in schemas]}")

# Total character counts
tools_found = [t for t in core_tools_names if t in schemas]
raw_totals = sum(schemas[t][0] for t in tools_found if schemas[t][0])
json_totals = sum(schemas[t][1] for t in tools_found if schemas[t][1])
desc_totals = sum(schemas[t][2] for t in tools_found if schemas[t][2])

# For missing tools in json/desc, use raw as fallback
for t in tools_found:
    if schemas[t][1] is None:
        json_totals += schemas[t][0]
    if schemas[t][2] is None:
        desc_totals += 0

print(f"\nTotal RAW chars (all {len(tools_found)} tools): {raw_totals:,}")
print(f"Total JSON chars: {json_totals:,}")
print(f"Total Description-only chars: {desc_totals:,}")
print(f"Average tool size (raw chars): {raw_totals/len(tools_found):,.0f}")
print(f"Average tool size (json chars): {json_totals/len(tools_found):,.0f}")

# Top 10 largest
sorted_tools = sorted(tools_found, key=lambda t: schemas[t][0], reverse=True)
print(f"\n=== TOP 10 LARGEST TOOLS (raw chars) ===")
for name in sorted_tools[:10]:
    raw, json_chars, desc, parsed = schemas[name]
    print(f"  {name:35s} raw={raw:>6,} json={json_chars:>6,} desc={desc:>5,}")

# Category breakdowns
for cat_name, cat_tools in [
    ("Browser (12 tools)", browser_tools),
    ("Google OAuth (6 tools)", google_tools),
    ("Other core (58 tools)", all_other),
]:
    found = [t for t in cat_tools if t in schemas]
    raw_sum = sum(schemas[t][0] for t in found)
    desc_sum = sum((schemas[t][2] or 0) for t in found)
    json_sum = sum((schemas[t][1] or schemas[t][0]) for t in found)
    print(f"\n{cat_name}:")
    print(f"  Total raw: {raw_sum:,} chars")
    print(f"  Total json: {json_sum:,} chars")
    print(f"  Total desc: {desc_sum:,} chars")
    print(f"  Avg raw: {raw_sum/len(found):,.0f} chars")

# Print all tool sizes for debug
print("\n\n=== ALL TOOL SIZES (sorted) ===")
for name in sorted_tools:
    raw, json_chars, desc, parsed = schemas[name]
    print(f"  {name:35s} raw={raw:>6,} json={str(json_chars or 'N/A'):>8s} desc={str(desc or '?'):>5s}")
