#!/usr/bin/env python3
"""Extract and measure each tool schema by reading actual Python dict literals."""
import re, json, sys
from pathlib import Path

tools_dir = Path(r"C:\Users\balur\Downloads\AVDE\Dashboard\zed-agent\tools")

# Custom JSON encoder to convert Python literals to JSON
def py_to_json_compat(text):
    """Convert Python dict literal to JSON by replacing single quotes, True/False/None, etc."""
    # Remove comments
    text = re.sub(r'#.*?$', '', text, flags=re.MULTILINE)
    # Replace single-quoted strings with double-quoted
    # This is tricky - we need to handle escaped quotes
    result = []
    i = 0
    in_single = False
    in_double = False
    while i < len(text):
        c = text[i]
        if c == '\\' and i + 1 < len(text):
            result.append(text[i:i+2])
            i += 2
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

# Read and measure each schema from its file
schemas = {}

# browser_tool.py has inline schema dicts in registry.register calls
files_to_check = [
    ("browser_tool.py", [
        ("browser_navigate", 1492),
        ("browser_snapshot", 1506),
        ("browser_click", 1521),
        ("browser_type", 1535),
        ("browser_scroll", 1553),
        ("browser_back", 1568),
        ("browser_press", 1577),
        ("browser_get_images", 1591),
        ("browser_vision", 1600),
        ("browser_console", 1619),
    ]),
    ("browser_cdp_tool.py", [("browser_cdp", 428)]),
    ("browser_dialog_tool.py", [("browser_dialog", 29)]),
]

for fn, tools in files_to_check:
    source = (tools_dir / fn).read_text(encoding="utf-8-sig")
    lines = source.split('\n')
    for tool_name, start_line in tools:
        # Read from start_line - find the schema= or the dict
        # For browser_tool.py: schemas are inline in registry.register
        # Find the schema dict text
        line_idx = start_line - 1  # 0-indexed
        # We need to find the full schema dict
        start_text = lines[line_idx]
        # schema is after "schema=" 
        if 'schema=' in start_text:
            schema_start = start_text.index('schema=') + len('schema=')
            # Find the opening {
            remaining = start_text[schema_start:]
            brace_pos = remaining.index('{')
            full_text = remaining[brace_pos:]
            
            # Count braces to find closing
            depth = 0
            in_str = False
            str_char = None
            escape = False
            for j, c in enumerate(full_text):
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
                    if c == str_char and (j == 0 or full_text[j-1] != '\\'):
                        in_str = False
                    continue
                if c == '{':
                    depth += 1
                elif c == '}':
                    depth -= 1
                    if depth == 0:
                        schema_text = full_text[:j+1]
                        break
            
            try:
                js = py_to_json_compat(schema_text)
                parsed = json.loads(js)
                schemas[tool_name] = parsed
            except Exception as e:
                print(f"  {tool_name}: FAILED parse: {e}", file=sys.stderr)
                schemas[tool_name] = None
            print(f"  {tool_name}: {len(schema_text)} chars raw, desc={len(parsed.get('description','')) if parsed else -1}")
        else:
            print(f"  {tool_name}: no schema= on line {start_line}")

# For named schema variables, try to evaluate them
# These have pattern: SCHEMA_VAR = { ... }
schema_var_files = {
    "web_tools.py": ("WEB_SEARCH_SCHEMA", "web_search"),
    "web_tools.py": ("WEB_EXTRACT_SCHEMA", "web_extract"),
    "terminal_tool.py": ("TERMINAL_SCHEMA", "terminal"),
    "process_registry.py": ("PROCESS_SCHEMA", "process"),
    "read_terminal_tool.py": ("READ_TERMINAL_SCHEMA", "read_terminal"),
    "file_tools.py": ("READ_FILE_SCHEMA", "read_file"),
    "file_tools.py": ("WRITE_FILE_SCHEMA", "write_file"),
    "file_tools.py": ("PATCH_SCHEMA", "patch"),
    "file_tools.py": ("SEARCH_FILES_SCHEMA", "search_files"),
    "vision_tools.py": ("VISION_ANALYZE_SCHEMA", "vision_analyze"),
    "image_generation_tool.py": ("IMAGE_GENERATE_SCHEMA", "image_generate"),
    "skills_tool.py": ("LIST_SCHEMA", "skills_list"),
    "skills_tool.py": ("VIEW_SCHEMA", "skill_view"),
    "skill_manager_tool.py": ("SKILL_MANAGE_SCHEMA", "skill_manage"),
    "tts_tool.py": ("TTS_SCHEMA", "text_to_speech"),
    "todo_tool.py": ("TODO_SCHEMA", "todo"),
    "memory_tool.py": ("MEMORY_SCHEMA", "memory"),
    "session_search_tool.py": ("SESSION_SEARCH_SCHEMA", "session_search"),
    "clarify_tool.py": ("CLARIFY_SCHEMA", "clarify"),
    "code_execution_tool.py": ("EXECUTE_CODE_SCHEMA", "execute_code"),
    "delegate_tool.py": ("DELEGATE_TASK_SCHEMA", "delegate_task"),
    "cronjob_tools.py": ("CRONJOB_SCHEMA", "cronjob"),
    "homeassistant_tool.py": ("HA_LIST_ENTITIES_SCHEMA", "ha_list_entities"),
    "homeassistant_tool.py": ("HA_GET_STATE_SCHEMA", "ha_get_state"),
    "homeassistant_tool.py": ("HA_LIST_SERVICES_SCHEMA", "ha_list_services"),
    "homeassistant_tool.py": ("HA_CALL_SERVICE_SCHEMA", "ha_call_service"),
    "kanban_tools.py": ("KANBAN_SHOW_SCHEMA", "kanban_show"),
    "kanban_tools.py": ("KANBAN_LIST_SCHEMA", "kanban_list"),
    "kanban_tools.py": ("KANBAN_COMPLETE_SCHEMA", "kanban_complete"),
    "kanban_tools.py": ("KANBAN_BLOCK_SCHEMA", "kanban_block"),
    "kanban_tools.py": ("KANBAN_HEARTBEAT_SCHEMA", "kanban_heartbeat"),
    "kanban_tools.py": ("KANBAN_COMMENT_SCHEMA", "kanban_comment"),
    "kanban_tools.py": ("KANBAN_CREATE_SCHEMA", "kanban_create"),
    "kanban_tools.py": ("KANBAN_LINK_SCHEMA", "kanban_link"),
    "kanban_tools.py": ("KANBAN_UNBLOCK_SCHEMA", "kanban_unblock"),
    "computer_use_tool.py": ("COMPUTER_USE_SCHEMA", "computer_use"),
}

# For computer_use - it's in computer_use/schema.py
try:
    cu_src = (tools_dir / "computer_use" / "schema.py").read_text(encoding="utf-8-sig")
    m = re.search(r'(\{\s*"name":\s*"computer_use".*?\})\s*$', cu_src, re.DOTALL)
    if m:
        schema_text = m.group(1)
        js = py_to_json_compat(schema_text)
        parsed = json.loads(js)
        schemas["computer_use"] = parsed
        print(f"  computer_use: {len(schema_text)} chars from schema.py")
except Exception as e:
    print(f"  computer_use: FAILED: {e}")

print("\n--- Extracting named SCHEMA variables ---")
for fn in sorted(set(f[0] for f in schema_var_files)):
    source = (tools_dir / fn).read_text(encoding="utf-8-sig")
    for var_name, tool_name in [x for x in schema_var_files if x[0] == fn]:
        # Find the variable assignment
        pattern = re.compile(r'(' + re.escape(var_name) + r')\s*=')
        m = pattern.search(source)
        if not m:
            # Try alternate var name
            alt_var = f'_{var_name}' if not var_name.startswith('_') else var_name[1:]
            pattern2 = re.compile(r'(' + re.escape(alt_var) + r')\s*=')
            m = pattern2.search(source)
            if m:
                var_name = alt_var
        
        if not m:
            # For inline schemas in registry.register calls
            # find the schema dict directly
            # Look for "name": "tool_name" pattern and extract dict
            tname_pattern = re.compile(r'(\{.*?"name"\s*:\s*"' + re.escape(tool_name) + r'".*?\})', re.DOTALL)
            m2 = tname_pattern.search(source)
            if m2:
                schema_text = m2.group(1)
                js = py_to_json_compat(schema_text)
                parsed = json.loads(js)
                schemas[tool_name] = parsed
                print(f"  {tool_name} ({var_name}): {len(schema_text)} chars (inline)")
            else:
                print(f"  {tool_name}: NOT FOUND")
            continue
        
        start_brace = source.index("{", m.end())
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
        
        # Try to resolve as Python then convert to JSON
        try:
            js = py_to_json_compat(schema_text)
            parsed = json.loads(js)
            schemas[tool_name] = parsed
            desc_chars = len(parsed.get('description', ''))
            total_json = len(json.dumps(parsed))
            print(f"  {tool_name} ({var_name}): raw={len(schema_text)} json={total_json} desc={desc_chars}")
        except Exception as e:
            print(f"  {tool_name} ({var_name}): PARSE FAILED - {str(e)[:80]}")
            # Still count the raw text
            schemas[tool_name] = None
