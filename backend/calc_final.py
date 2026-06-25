#!/usr/bin/env python3
"""Final comprehensive schema measurement - handles Python string concatenation in parens."""
import re, json, sys
from pathlib import Path

tools_dir = Path("tools")

def extract_dict(text, pos):
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

def resolve_description(raw_value):
    """Resolve a description expression to its string value.
    raw_value is the text after "description": up to the next , or }
    """
    raw_value = raw_value.strip()
    
    # Case 1: Direct string literal (single or double quoted)
    if raw_value.startswith('"') or raw_value.startswith("'"):
        # Extract string content
        quote = raw_value[0]
        content = []
        i = 1
        escape = False
        while i < len(raw_value):
            c = raw_value[i]
            if escape:
                content.append(c)
                escape = False
                i += 1
                continue
            if c == '\\':
                escape = True
                content.append(c)
                i += 1
                continue
            if c == quote:
                return ''.join(content)
            content.append(c)
            i += 1
        return ''.join(content)
    
    # Case 2: Parenthesized string (multi-line string concatenation)
    if raw_value.startswith('('):
        depth = 1
        content = []
        i = 1
        in_str = False
        str_char = None
        escape = False
        while i < len(raw_value) and depth > 0:
            c = raw_value[i]
            if escape:
                if in_str:
                    content.append(c)
                escape = False
                i += 1
                continue
            if c == '\\':
                escape = True
                if in_str:
                    content.append('\\')
                i += 1
                continue
            if c in ('"', "'") and not in_str:
                in_str = True
                str_char = c
                i += 1
                continue
            if in_str:
                if c == str_char:
                    in_str = False
                    i += 1
                    continue
                content.append(c)
                i += 1
                continue
            if c == '(':
                depth += 1
                i += 1
                continue
            if c == ')':
                depth -= 1
                i += 1
                continue
            i += 1
        return ''.join(content)
    
    # Case 3: Variable reference like TERMINAL_TOOL_DESCRIPTION
    # We need to resolve this from the source
    return None  # Can't resolve without source context

def extract_description_from_full_dict(raw):
    """Extract the description string from a full schema dict literal."""
    # Find "description": value
    m = re.search('"description"\\s*:\\s*', raw)
    if not m:
        return None
    
    after_key = raw[m.end():]
    
    # Try parenthesized string first
    if after_key.startswith('('):
        depth = 1
        i = 1
        in_str = False
        str_char = None
        escape = False
        content = []
        while i < len(after_key) and depth > 0:
            c = after_key[i]
            if escape:
                if in_str:
                    content.append(c)
                escape = False
                i += 1
                continue
            if c == '\\':
                escape = True
                if in_str:
                    content.append('\\')
                i += 1
                continue
            if c in ('"', "'") and not in_str:
                in_str = True
                str_char = c
                i += 1
                continue
            if in_str:
                if c == str_char:
                    in_str = False
                    i += 1
                    continue
                content.append(c)
                i += 1
                continue
            if c == '(':
                depth += 1
                i += 1
                continue
            if c == ')':
                depth -= 1
                i += 1
                continue
            i += 1
        return ''.join(content).strip()
    
    # Try string literal
    if after_key.startswith('"') or after_key.startswith("'"):
        quote = after_key[0]
        content = []
        i = 1
        escape = False
        while i < len(after_key):
            c = after_key[i]
            if escape:
                content.append(c)
                escape = False
                i += 1
                continue
            if c == '\\':
                escape = True
                content.append(c)
                i += 1
                continue
            if c == quote:
                return ''.join(content)
            content.append(c)
            i += 1
    
    # Variable reference
    var_match = re.match(r'([A-Z_][A-Z_0-9]+)', after_key)
    if var_match:
        return var_match.group(1)  # Return variable name as placeholder
    
    return None

# Manual measurement based on reading actual source files
# We'll measure raw Python dict size and extract description text

schemas = {}  # name -> (raw_size, json_approx, desc_chars)

# === web_tools.py ===
src = (tools_dir / "web_tools.py").read_text(encoding="utf-8-sig")
for var,tool in [("WEB_SEARCH_SCHEMA","web_search"),("WEB_EXTRACT_SCHEMA","web_extract")]:
    m = re.search(var + r'\s*=\s*\{', src)
    raw = extract_dict(src, m.start() + len(var) + 3)
    desc = extract_description_from_full_dict(raw)
    schemas[tool] = (len(raw), len(raw), len(desc or ""))

# === terminal_tool.py ===
src = (tools_dir / "terminal_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'TERMINAL_SCHEMA\s*=\s*\{', src)
raw = extract_dict(src, m.end())
desc = extract_description_from_full_dict(raw)
# Resolve TERMINAL_TOOL_DESCRIPTION
if desc == "TERMINAL_TOOL_DESCRIPTION":
    ttd_m = re.search(r'TERMINAL_TOOL_DESCRIPTION\s*=\s*"""(.+?)"""', src, re.DOTALL)
    if ttd_m:
        desc = ttd_m.group(1).strip()
schemas["terminal"] = (len(raw), len(raw), len(desc or ""))

# === process_registry.py ===
src = (tools_dir / "process_registry.py").read_text(encoding="utf-8-sig")
m = re.search(r'PROCESS_SCHEMA\s*=\s*\{', src)
raw = extract_dict(src, m.end())
desc = extract_description_from_full_dict(raw)
schemas["process"] = (len(raw), len(raw), len(desc or ""))

# === read_terminal_tool.py ===
src = (tools_dir / "read_terminal_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'READ_TERMINAL_SCHEMA\s*=\s*\{', src)
raw = extract_dict(src, m.end())
desc = extract_description_from_full_dict(raw)
schemas["read_terminal"] = (len(raw), len(raw), len(desc or ""))

# === file_tools.py ===
src = (tools_dir / "file_tools.py").read_text(encoding="utf-8-sig")
for var,tool in [("READ_FILE_SCHEMA","read_file"),("WRITE_FILE_SCHEMA","write_file"),("PATCH_SCHEMA","patch"),("SEARCH_FILES_SCHEMA","search_files")]:
    m = re.search(var + r'\s*=\s*\{', src)
    raw = extract_dict(src, m.end())
    desc = extract_description_from_full_dict(raw)
    schemas[tool] = (len(raw), len(raw), len(desc or ""))

# === vision_tools.py ===
src = (tools_dir / "vision_tools.py").read_text(encoding="utf-8-sig")
m = re.search(r'VISION_ANALYZE_SCHEMA\s*=\s*\{', src)
raw = extract_dict(src, m.end())
desc = extract_description_from_full_dict(raw)
schemas["vision_analyze"] = (len(raw), len(raw), len(desc or ""))

# === image_generation_tool.py ===
src = (tools_dir / "image_generation_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'IMAGE_GENERATE_SCHEMA\s*=\s*\{', src)
raw = extract_dict(src, m.end())
desc = extract_description_from_full_dict(raw)
schemas["image_generate"] = (len(raw), len(raw), len(desc or ""))

# === skills_tool.py ===
src = (tools_dir / "skills_tool.py").read_text(encoding="utf-8-sig")
for var,tool in [("SKILLS_LIST_SCHEMA","skills_list"),("SKILL_VIEW_SCHEMA","skill_view")]:
    m = re.search(var + r'\s*=\s*\{', src)
    raw = extract_dict(src, m.end())
    desc = extract_description_from_full_dict(raw)
    schemas[tool] = (len(raw), len(raw), len(desc or ""))

# === skill_manager_tool.py ===
src = (tools_dir / "skill_manager_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'SKILL_MANAGE_SCHEMA\s*=\s*\{', src)
raw = extract_dict(src, m.end())
desc = extract_description_from_full_dict(raw)
schemas["skill_manage"] = (len(raw), len(raw), len(desc or ""))

# === browser_tool.py (BROWSER_TOOL_SCHEMAS list) ===
src = (tools_dir / "browser_tool.py").read_text(encoding="utf-8-sig")
pos = src.index("BROWSER_TOOL_SCHEMAS = [")
list_start = src.index("[", pos)
depth = 0
in_str = False
str_char = None
escape = False
for i in range(list_start, len(src)):
    c = src[i]
    if escape: escape = False; continue
    if c == '\\': escape = True; continue
    if c in ('"', "'") and not in_str: in_str = True; str_char = c; continue
    if in_str:
        if c == str_char and not escape: in_str = False
        continue
    if c == '[': depth += 1
    elif c == ']':
        depth -= 1
        if depth == 0: list_text = src[list_start:i+1]; break

dicts = []
depth = 0
in_str = False
str_char = None
escape = False
dict_start = None
for i in range(len(list_text)):
    c = list_text[i]
    if escape: escape = False; continue
    if c == '\\': escape = True; continue
    if c in ('"', "'") and not in_str: in_str = True; str_char = c; continue
    if in_str:
        if c == str_char and not escape: in_str = False; continue
        continue
    if c == '{':
        if depth == 0: dict_start = i
        depth += 1
    elif c == '}':
        depth -= 1
        if depth == 0 and dict_start is not None:
            dicts.append(list_text[dict_start:i+1])
            dict_start = None

for d in dicts:
    name_m = re.search('"name"\\s*:\\s*"([^"]+)"', d)
    if name_m:
        tn = name_m.group(1)
        desc = extract_description_from_full_dict(d)
        schemas[tn] = (len(d), len(d), len(desc or ""))

# === browser_cdp_tool.py ===
src = (tools_dir / "browser_cdp_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'BROWSER_CDP_SCHEMA.*?=\s*\{', src, re.DOTALL)
if m:
    raw = extract_dict(src, m.end())
    desc = extract_description_from_full_dict(raw)
    schemas["browser_cdp"] = (len(raw), len(raw), len(desc or ""))

# === browser_dialog_tool.py ===
src = (tools_dir / "browser_dialog_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'BROWSER_DIALOG_SCHEMA.*?=\s*\{', src, re.DOTALL)
if m:
    raw = extract_dict(src, m.end())
    desc = extract_description_from_full_dict(raw)
    schemas["browser_dialog"] = (len(raw), len(raw), len(desc or ""))

# === tts_tool.py ===
src = (tools_dir / "tts_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'TTS_SCHEMA\s*=\s*\{', src)
raw = extract_dict(src, m.end())
desc = extract_description_from_full_dict(raw)
schemas["text_to_speech"] = (len(raw), len(raw), len(desc or ""))

# === todo_tool.py ===
src = (tools_dir / "todo_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'TODO_SCHEMA\s*=\s*\{', src)
raw = extract_dict(src, m.end())
desc = extract_description_from_full_dict(raw)
schemas["todo"] = (len(raw), len(raw), len(desc or ""))

# === memory_tool.py ===
src = (tools_dir / "memory_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'MEMORY_SCHEMA\s*=\s*\{', src)
raw = extract_dict(src, m.end())
desc = extract_description_from_full_dict(raw)
schemas["memory"] = (len(raw), len(raw), len(desc or ""))

# === session_search_tool.py ===
src = (tools_dir / "session_search_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'SESSION_SEARCH_SCHEMA\s*=\s*\{', src)
raw = extract_dict(src, m.end())
desc = extract_description_from_full_dict(raw)
schemas["session_search"] = (len(raw), len(raw), len(desc or ""))

# === clarify_tool.py ===
src = (tools_dir / "clarify_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'CLARIFY_SCHEMA\s*=\s*\{', src)
raw = extract_dict(src, m.end())
desc = extract_description_from_full_dict(raw)
schemas["clarify"] = (len(raw), len(raw), len(desc or ""))

# === delegate_tool.py ===
src = (tools_dir / "delegate_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'DELEGATE_TASK_SCHEMA\s*=\s*\{', src)
raw = extract_dict(src, m.end())
desc = extract_description_from_full_dict(raw)
schemas["delegate_task"] = (len(raw), len(raw), len(desc or ""))

# === cronjob_tools.py ===
src = (tools_dir / "cronjob_tools.py").read_text(encoding="utf-8-sig")
m = re.search(r'CRONJOB_SCHEMA\s*=\s*\{', src)
raw = extract_dict(src, m.end())
desc = extract_description_from_full_dict(raw)
schemas["cronjob"] = (len(raw), len(raw), len(desc or ""))

# === homeassistant_tool.py ===
src = (tools_dir / "homeassistant_tool.py").read_text(encoding="utf-8-sig")
for var,tool in [("HA_LIST_ENTITIES_SCHEMA","ha_list_entities"),("HA_GET_STATE_SCHEMA","ha_get_state"),("HA_LIST_SERVICES_SCHEMA","ha_list_services"),("HA_CALL_SERVICE_SCHEMA","ha_call_service")]:
    m = re.search(var + r'\s*=\s*\{', src)
    raw = extract_dict(src, m.end())
    desc = extract_description_from_full_dict(raw)
    schemas[tool] = (len(raw), len(raw), len(desc or ""))

# === kanban_tools.py ===
src = (tools_dir / "kanban_tools.py").read_text(encoding="utf-8-sig")
for var,tool in [("KANBAN_SHOW_SCHEMA","kanban_show"),("KANBAN_LIST_SCHEMA","kanban_list"),("KANBAN_COMPLETE_SCHEMA","kanban_complete"),("KANBAN_BLOCK_SCHEMA","kanban_block"),("KANBAN_HEARTBEAT_SCHEMA","kanban_heartbeat"),("KANBAN_COMMENT_SCHEMA","kanban_comment"),("KANBAN_CREATE_SCHEMA","kanban_create"),("KANBAN_LINK_SCHEMA","kanban_link"),("KANBAN_UNBLOCK_SCHEMA","kanban_unblock")]:
    m = re.search(var + r'\s*=\s*\{', src)
    raw = extract_dict(src, m.end())
    desc = extract_description_from_full_dict(raw)
    schemas[tool] = (len(raw), len(raw), len(desc or ""))

# === computer_use/schema.py ===
src = (tools_dir / "computer_use" / "schema.py").read_text(encoding="utf-8-sig")
m = re.search(r'COMPUTER_USE_SCHEMA.*?=\s*\{', src, re.DOTALL)
if m:
    raw = extract_dict(src, m.end())
    desc = extract_description_from_full_dict(raw)
    schemas["computer_use"] = (len(raw), len(raw), len(desc or ""))

# === execute_code - built dynamically, measure build function ===
src = (tools_dir / "code_execution_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'def build_execute_code_schema', src)
if m:
    fn_text = src[m.start():m.start()+4000]
    ret_pos = fn_text.find('return ')
    if ret_pos >= 0:
        dict_pos = fn_text.find('{', ret_pos)
        if dict_pos > 0:
            raw = extract_dict(fn_text, dict_pos)
            desc_m = re.search(r'description\s*=\s*\(', src)
            if desc_m:
                desc_end = src.find(')', desc_m.start())
                # exclude f-string prefixes and ')"' artifacts
                desc_content = src[desc_m.end():desc_end]
                desc_chars = len(desc_content.strip())
            else:
                desc_chars = 0
            schemas["execute_code"] = (len(raw), len(raw), desc_chars)

# === google tools from plugins/dashboard_auth/google/__init__.py ===
try:
    src = Path("plugins/dashboard_auth/google/__init__.py").read_text(encoding="utf-8-sig")
    var_to_tool = {
        "GMAIL_LIST_SCHEMA": "gmail_list",
        "GMAIL_READ_SCHEMA": "gmail_read",
        "GMAIL_SEND_SCHEMA": "gmail_send",
        "DRIVE_LIST_SCHEMA": "drive_list",
        "DRIVE_SEARCH_SCHEMA": "drive_search",
        "DRIVE_READ_SCHEMA": "drive_read",
    }
    for var_name, tool_name in var_to_tool.items():
        m = re.search(var_name + r'\s*=\s*\{', src)
        if m:
            raw = extract_dict(src, m.end())
            desc = extract_description_from_full_dict(raw)
            schemas[tool_name] = (len(raw), len(raw), len(desc or ""))
except Exception as e:
    print(f"Google tools error: {e}", file=sys.stderr)

# All 76 tools
core_tools_names = [
    "web_search", "web_extract",
    "terminal", "process", "read_terminal",
    "read_file", "write_file", "patch", "search_files",
    "vision_analyze", "image_generate",
    "skills_list", "skill_view", "skill_manage",
    "browser_navigate", "browser_snapshot", "browser_click",
    "browser_type", "browser_scroll", "browser_back",
    "browser_press", "browser_get_images",
    "browser_vision", "browser_console", "browser_cdp", "browser_dialog",
    "text_to_speech",
    "todo", "memory",
    "session_search",
    "clarify",
    "execute_code", "delegate_task",
    "cronjob",
    "ha_list_entities", "ha_get_state", "ha_list_services", "ha_call_service",
    "kanban_show", "kanban_list",
    "kanban_complete", "kanban_block", "kanban_heartbeat",
    "kanban_comment", "kanban_create", "kanban_link",
    "kanban_unblock",
    "computer_use",
    "gmail_list", "gmail_read", "gmail_send",
    "drive_list", "drive_search", "drive_read",
]

browser_tools = ["browser_navigate", "browser_snapshot", "browser_click",
    "browser_type", "browser_scroll", "browser_back", "browser_press",
    "browser_get_images", "browser_vision", "browser_console", "browser_cdp", "browser_dialog"]
google_tools = ["gmail_list", "gmail_read", "gmail_send", "drive_list", "drive_search", "drive_read"]
all_other = [t for t in core_tools_names if t not in browser_tools and t not in google_tools]

print(f"{'Tool':35s} {'Raw':>8s} {'Desc':>8s}")
print("="*55)
for name in core_tools_names:
    if name in schemas:
        raw, _, desc = schemas[name]
        print(f"{name:35s} {raw:>8,} {desc:>8,}")
    else:
        print(f"{name:35s} {'MISSING':>8s}")

print(f"\n\n=== SUMMARY ===")
found = [t for t in core_tools_names if t in schemas]
missing = [t for t in core_tools_names if t not in schemas]
print(f"Total tools expected: {len(core_tools_names)}")
print(f"Tools found: {len(found)}")
if missing:
    print(f"Tools missing: {missing}")

total_raw = sum(schemas[t][0] for t in found)
total_desc = sum(schemas[t][2] for t in found)
avg_raw = total_raw / len(found)
avg_desc = total_desc / len(found)

print(f"\nTotal character count for all {len(found)} tools: {total_raw:,}")
print(f"Average tool size: {avg_raw:,.0f}")
print(f"Total description-only chars: {total_desc:,}")

# Top 10
sorted_ = sorted(found, key=lambda t: schemas[t][0], reverse=True)
print(f"\n=== TOP 10 LARGEST TOOLS ===")
print(f"{'Tool':35s} {'Raw chars':>10s}")
for name in sorted_[:10]:
    print(f"  {name:35s} {schemas[name][0]:>10,}")

# Category breakdowns
for cat_name, cat_tools in [
    ("Browser tools (12)", browser_tools),
    ("Google OAuth tools (6)", google_tools),
    ("Other core tools (58)", all_other),
]:
    f = [t for t in cat_tools if t in schemas]
    r = sum(schemas[t][0] for t in f)
    d = sum(schemas[t][2] for t in f)
    print(f"\n{cat_name}:")
    print(f"  Tools found: {len(f)}/{len(cat_tools)}")
    print(f"  Total raw chars: {r:,}")
    print(f"  Total desc chars: {d:,}")
    if len(f) > 0:
        print(f"  Avg tool: {r/len(f):,.0f}")
