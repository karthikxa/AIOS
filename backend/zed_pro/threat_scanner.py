"""Prompt-injection scanner for context files.

Before any user-controlled file (SOUL.md, AGENTS.md, .zed.md, a SKILL.md) is
injected into the system prompt, it is run through here. Files that match a
known injection / promptware / role-play-hijack pattern are blocked: the
caller substitutes a placeholder instead of the raw content, so the model
never sees the malicious payload.

Scope is deliberately conservative for context files (a cloned repo can
legitimately contain security research, infra docs, etc.) — we only block
classic injection and promptware/C2 patterns, not the stricter signatures
that would false-positive on real repo content.
"""

from __future__ import annotations

import re
from typing import List

# ── Pattern library ───────────────────────────────────────────────────────────
# Each entry: (compiled regex, human label). All case-insensitive.
_THREAT_PATTERNS: List[tuple] = [
    # Classic "ignore previous instructions" hijack
    (re.compile(r"ignore\s+(?:all\s+)?(?:previous|prior|above)\s+instructions", re.I),
     "ignore-previous-instructions"),
    (re.compile(r"disregard\s+(?:all\s+)?(?:previous|prior|the\s+above)", re.I),
     "disregard-previous"),
    (re.compile(r"forget\s+(?:your|all)\s+(?:previous\s+)?instructions", re.I),
     "forget-instructions"),
    # Role-play / identity hijack
    (re.compile(r"you\s+are\s+now\s+(?:in\s+)?(?:developer|root|admin|jailbreak|DAN)\s+mode", re.I),
     "developer-mode-hijack"),
    (re.compile(r"(?:act|pretend|simulate)\s+as\s+(?:if\s+you\s+(?:are|have))?\s*(?:no|disabled)\s+(?:restrictions|safety|guidelines)", re.I),
     "safety-disable"),
    # Output exfiltration to an attacker URL
    (re.compile(r"(?:send|post|fetch|upload|exfiltrate)\s+(?:this|the|all)\s+(?:file|content|data|secret|key)\s+to\s+https?://", re.I),
     "exfiltrate-url"),
    (re.compile(r"(?:print|echo|output|include)\s+(?:the\s+)?(?:api|secret|access)?\s*key(?:s)?\s+(?:in\s+your\s+response|verbatim)", re.I),
     "key-exfil"),
    # Promptware / C2-style payload markers
    (re.compile(r"\bEXEC_COMMAND\b|\bRUN_PAYLOAD\b|\bC2_BEACON\b|\bINJECT_TOOL_CALL\b", re.I),
     "promptware-marker"),
    # Hidden instruction smuggling via zero-width / unicode escapes
    (re.compile(r"\\u200[0-9bcdef]|\\ufeff", re.I),
     "zero-width-steganography"),
]


def scan_for_threats(content: str, scope: str = "context") -> List[str]:
    """Return a list of matched threat labels. Empty list = clean.

    ``scope`` is reserved for future strict-vs-context filtering; today every
    caller passes "context" and all patterns above apply.
    """
    if not content:
        return []
    findings: List[str] = []
    for pattern, label in _THREAT_PATTERNS:
        if pattern.search(content):
            findings.append(label)
    return findings


def sanitize(content: str, filename: str) -> str:
    """Scan and either return the content untouched or a blocked placeholder.

    Used by ``prompt_builder`` so every injected file passes through one
    chokepoint. Logs nothing here — the caller logs the warning so the
    surrounding context (which file, which layer) is preserved.
    """
    findings = scan_for_threats(content, scope="context")
    if findings:
        return (
            f"[BLOCKED: {filename} contained potential prompt injection "
            f"({', '.join(findings)}). Content not loaded.]"
        )
    return content
