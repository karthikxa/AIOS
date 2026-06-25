#!/usr/bin/env python3
"""Debug schema conversion issues."""
import re, json
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

def py_dict_to_json(text):
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
            # Check if next char needs escaping in JSON
            if i+1 < len(text) and text[i+1] == "'":
                result.append("'")
                i += 2
                continue
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

# Test with terminal schema
src = (tools_dir / "terminal_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'TERMINAL_SCHEMA\s*=\s*(\{)', src)
raw = extract_dict(src, m.start(1))

# Check for problematic patterns
single_count = raw.count("'")
double_count = raw.count('"')
print(f"Terminal schema: {len(raw)} raw chars")
print(f"Single quotes: {single_count}, Double quotes: {double_count}")

# Try conversion
json_text = py_dict_to_json(raw)
try:
    parsed = json.loads(json_text)
    print(f"JSON serialized: {len(json.dumps(parsed))} chars")
    print(f"Description: {len(parsed.get('description',''))} chars")
    print("SUCCESS")
except json.JSONDecodeError as e:
    print(f"FAILED: {e}")
    # Show area around error
    print(f"Context around error: ...{json_text[max(0,e.pos-40):e.pos+40]}...")

# Test session_search
print("\n\n=== SESSION SEARCH ===")
src = (tools_dir / "session_search_tool.py").read_text(encoding="utf-8-sig")
m = re.search(r'SESSION_SEARCH_SCHEMA\s*=\s*(\{)', src)
if m:
    raw = extract_dict(src, m.start(1))
    print(f"Raw: {len(raw)} chars")
    json_text = py_dict_to_json(raw)
    try:
        parsed = json.loads(json_text)
        print(f"JSON: {len(json.dumps(parsed))} chars")
        print(f"Desc: {len(parsed.get('description',''))} chars")
        print("SUCCESS")
    except json.JSONDecodeError as e:
        print(f"FAILED: {e}")

# Test browser_snapshot
print("\n\n=== BROWSER SNAPSHOT ===")
src = (tools_dir / "browser_tool.py").read_text(encoding="utf-8-sig")
# Find the BROWSER_TOOL_SCHEMAS list
pos = src.index("BROWSER_TOOL_SCHEMAS = [")
list_start = src.index("[", pos)
# Find balanced list
depth = 0
in_str = False
str_char = None
escape = False
for i in range(list_start, len(src)):
    c = src[i]
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
    if c == '[':
        depth += 1
    elif c == ']':
        depth -= 1
        if depth == 0:
            list_text = src[list_start:i+1]
            break

# Extract dicts from list
dicts = []
depth = 0
in_str = False
str_char = None
escape = False
dict_start = None
for i, c in enumerate(list_text):
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
            dict_start = i
        depth += 1
    elif c == '}':
        depth -= 1
        if depth == 0 and dict_start is not None:
            dicts.append(list_text[dict_start:i+1])
            dict_start = None

print(f"Found {len(dicts)} browser tool schemas")
for d in dicts:
    json_text = py_dict_to_json(d)
    try:
        parsed = json.loads(json_text)
        name = parsed["name"]
        json_chars = len(json.dumps(parsed))
        desc = parsed.get("description", "")
        print(f"  {name:25s} raw={len(d):>6} json={json_chars:>6} desc={len(desc):>5}")
    except json.JSONDecodeError as e:
        print(f"  FAILED parsing: {e}")
