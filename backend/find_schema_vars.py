#!/usr/bin/env python3
"""Read all schemas and identify which use variable references in description."""
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

# Find all schemas and check description field
for fn in sorted(tools_dir.glob("*.py")):
    if fn.name in ("__init__.py", "registry.py", "mcp_tool.py", "schema_sanitizer.py"):
        continue
    try:
        src = fn.read_text(encoding="utf-8-sig")
    except:
        continue
    
    for m in re.finditer(r'\b([A-Z_]+SCHEMA)\s*=\s*(\{)', src):
        var_name = m.group(1)
        raw = extract_dict(src, m.start(2) - 1)  # include opening brace
        
        # Check if "description" is followed by a variable name (not a string)
        has_var = bool(re.search('"description"\\s*:\\s*[A-Z_]', raw))
        
        # Try JSON parsing
        json_text = py_dict_to_json(raw)
        parse_ok = True
        try:
            json.loads(json_text)
        except json.JSONDecodeError:
            parse_ok = False
        
        # Get description - try to find what it references
        desc_match = re.search('"description"\\s*:\\s*(.+?)[,}]', raw, re.DOTALL)
        desc_ref = desc_match.group(1).strip()[:50] if desc_match else "NOT FOUND"
        
        status = "OK" if parse_ok else "FAIL"
        print(f"  {fn.name:35s} {var_name:30s} {status:5s} desc_ref={desc_ref}")
