#!/usr/bin/env python3
"""Extract schema dict literals from tool files and measure sizes."""
import re, json, sys, os
from pathlib import Path

os.chdir(Path(__file__).parent)
tools_dir = Path("tools")

def extract_dict(text, start_pos):
    """Given a position where a dict starts ({), extract the full dict including nested braces."""
    depth = 0
    in_str = False
    str_char = None
    escape = False
    for i in range(start_pos, len(text)):
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
                return i + 1
    return len(text)

def get_schema_text(source, var_name=None, tool_name=None):
    """Extract schema dict text from source code."""
    results = []
    
    if var_name:
        # Find variable assignment
        pattern = re.compile(r'\b' + re.escape(var_name) + r'\s*=\s*(\{)', re.DOTALL)
        for m in pattern.finditer(source):
            start = m.start(1)
            end = extract_dict(source, start)
            results.append((var_name, source[start:end], m.start()))
    
    # Also find inline schema dicts (where schema= is followed by a dict)
    for m in re.finditer(r'\bschema\s*=\s*(\{)', source):
        start = m.start(1)
        end = extract_dict(source, start)
        # Include context to identify which tool
        context = source[max(0,m.start()-200):m.start()]
        results.append((f"inline:{context[-50:].strip()[:20]}", source[start:end], m.start()))
    
    return results

# Process files with specific schema variables
file_schema_vars = {
    "web_tools.py": [("web_search", "WEB_SEARCH_SCHEMA"), ("web_extract", "WEB_EXTRACT_SCHEMA")],
    "terminal_tool.py": [("terminal", "TERMINAL_SCHEMA")],
    "process_registry.py": [("process", "PROCESS_SCHEMA")],
    "read_terminal_tool.py": [("read_terminal", "READ_TERMINAL_SCHEMA")],
    "file_tools.py": [("read_file", "READ_FILE_SCHEMA"), ("write_file", "WRITE_FILE_SCHEMA"), ("patch", "PATCH_SCHEMA"), ("search_files", "SEARCH_FILES_SCHEMA")],
    "vision_tools.py": [("vision_analyze", "VISION_ANALYZE_SCHEMA")],
    "image_generation_tool.py": [("image_generate", "IMAGE_GENERATE_SCHEMA")],
    "skills_tool.py": [("skills_list", "LIST_SCHEMA?")]
}

# Let's read some key schema files manually
key_files = [
    "web_tools.py", "terminal_tool.py", "process_registry.py", "read_terminal_tool.py",
    "file_tools.py", "vision_tools.py", "image_generation_tool.py",
    "skills_tool.py", "skill_manager_tool.py",
    "browser_tool.py", "browser_cdp_tool.py", "browser_dialog_tool.py",
    "tts_tool.py", "todo_tool.py", "memory_tool.py",
    "session_search_tool.py", "clarify_tool.py", "code_execution_tool.py",
    "delegate_tool.py", "cronjob_tools.py",
    "homeassistant_tool.py", "kanban_tools.py",
    "computer_use/schema.py",
    "send_message_tool.py", "mixture_of_agents_tool.py",
    "discord_tool.py", "x_search_tool.py",
    "feishu_doc_tool.py", "feishu_drive_tool.py",
    "video_generation_tool.py",
]

all_schemas = {}

for fn in key_files:
    fp = tools_dir / fn
    if not fp.exists():
        print(f"SKIP: {fn} not found")
        continue
    source = fp.read_text(encoding="utf-8-sig")
    
    # Try to find schemas with var names or inline
    # Pattern 1: VAR_NAME = { ... }
    for m in re.finditer(r'\b([A-Z_]+SCHEMA)\s*=\s*(\{)', source):
        var_name = m.group(1)
        start = m.start(2)
        end = extract_dict(source, start)
        raw = source[start-1:end]  # include the opening brace
        all_schemas.setdefault(fn, {})[var_name] = raw
    
    # Pattern 2: inline schema= followed by {
    for m in re.finditer(r'schema\s*=\s*(\{)', source):
        start = m.start(1)
        end = extract_dict(source, start)
        raw = source[start:end]
        
        # Find the tool name from nearby context
        ctx = source[:m.start()]
        nm = re.search(r'name\s*=\s*["\']([^"\']+)["\']', ctx[::-1])  # search backwards
        if nm:
            tool_name = nm.group(1)[::-1]
            # Check if tool_name is already a key
            found_var = False
            for fn2, vars_dict in all_schemas.items():
                if tool_name in vars_dict.values():
                    found_var = True
                    break
            if not found_var:
                all_schemas.setdefault(fn, {})[f"inline:{tool_name}"] = raw

# Print what we found
for fn, vars_dict in sorted(all_schemas.items()):
    print(f"\n=== {fn} ===")
    for var_name, raw in sorted(vars_dict.items()):
        total = len(raw)
        # Count description chars only
        desc_matches = list(re.finditer(r'["\']description["\']\s*:\s*["\'](.+?)["\']\s*[,}]', raw, re.DOTALL))
        desc_chars = sum(len(m.group(1)) for m in desc_matches)
        print(f"  {var_name}: total={total} desc={desc_chars}")

# Now let's figure out the browser tool schemas
print("\n\n=== BROWSER TOOL INLINE SCHEMAS ===")
bt_source = (tools_dir / "browser_tool.py").read_text(encoding="utf-8-sig")
# Find all schema={ occurrences and their context
for i, m in enumerate(re.finditer(r'schema\s*=\s*(\{)', bt_source)):
    start = m.start(1)
    end = extract_dict(bt_source, start)
    raw = bt_source[start:end]
    
    # Get surrounding context to identify tool name
    ctx_start = max(0, m.start() - 100)
    ctx = bt_source[ctx_start:m.start()]
    print(f"\nSchema #{i+1} at pos {m.start()}:")
    print(f"  Context: ...{ctx[-80:].strip()}")
    print(f"  Raw size: {len(raw)} chars")
    print(f"  Preview: {raw[:120]}...")

# Check browser_cdp_tool.py 
print("\n\n=== BROWSER CDP TOOL ===")
bcdp_source = (tools_dir / "browser_cdp_tool.py").read_text(encoding="utf-8-sig")
for m in re.finditer(r'schema\s*=\s*(\{)', bcdp_source):
    start = m.start(1)
    end = extract_dict(bcdp_source, start)
    raw = bcdp_source[start:end]
    ctx = bcdp_source[max(0,m.start()-100):m.start()]
    print(f"  Context: ...{ctx[-80:].strip()}")
    print(f"  Raw size: {len(raw)} chars")
    print(f"  Preview: {raw[:120]}...")

# Check browser_dialog_tool.py
print("\n\n=== BROWSER DIALOG TOOL ===")
bd_source = (tools_dir / "browser_dialog_tool.py").read_text(encoding="utf-8-sig")
for m in re.finditer(r'schema\s*=\s*(\{)', bd_source):
    start = m.start(1)
    end = extract_dict(bd_source, start)
    raw = bd_source[start:end]
    ctx = bd_source[max(0,m.start()-100):m.start()]
    print(f"  Context: ...{ctx[-80:].strip()}")
    print(f"  Raw size: {len(raw)} chars")
    print(f"  Preview: {raw[:120]}...")
