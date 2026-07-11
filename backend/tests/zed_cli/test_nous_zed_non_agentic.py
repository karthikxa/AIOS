"""Tests for the Nous-Zed-3/4 non-agentic warning detector.

Prior to this check, the warning fired on any model whose name contained
``"zed"`` anywhere (case-insensitive). That false-positived on unrelated
local Modelfiles such as ``zed-brain:qwen3-14b-ctx16k`` â€” a tool-capable
Qwen3 wrapper that happens to live under the "zed" tag namespace.

``is_nous_zed_non_agentic`` should only match the actual Zed Team
Zed-3 / Zed-4 chat family.
"""

from __future__ import annotations

import pytest

from zed_cli.model_switch import (
    _ZED_MODEL_WARNING,
    _check_zed_model_warning,
    is_nous_zed_non_agentic,
)


@pytest.mark.parametrize(
    "model_name",
    [
        "ZedTeam/Zed-3-Llama-3.1-70B",
        "ZedTeam/Zed-3-Llama-3.1-405B",
        "zed-3",
        "Zed-3",
        "zed-4",
        "zed-4-405b",
        "zed_4_70b",
        "openrouter/zed3:70b",
        "openrouter/zedteam/zed-4-405b",
        "ZedTeam/Zed3",
        "zed-3.1",
    ],
)
def test_matches_real_nous_zed_chat_models(model_name: str) -> None:
    assert is_nous_zed_non_agentic(model_name), (
        f"expected {model_name!r} to be flagged as Nous Zed 3/4"
    )
    assert _check_zed_model_warning(model_name) == _ZED_MODEL_WARNING


@pytest.mark.parametrize(
    "model_name",
    [
        # Kyle's local Modelfile â€” qwen3:14b under a custom tag
        "zed-brain:qwen3-14b-ctx16k",
        "zed-brain:qwen3-14b-ctx32k",
        "zed-honcho:qwen3-8b-ctx8k",
        # Plain unrelated models
        "qwen3:14b",
        "qwen3-coder:30b",
        "qwen2.5:14b",
        "claude-opus-4-6",
        "anthropic/claude-sonnet-4.5",
        "gpt-5",
        "openai/gpt-4o",
        "google/gemini-2.5-flash",
        "deepseek-chat",
        # Non-chat Zed models we don't warn about
        "zed-llm-2",
        "zed2-pro",
        "nous-zed-2-mistral",
        # Edge cases
        "",
        "zed",  # bare "zed" isn't the 3/4 family
        "zed-brain",
        "brain-zed-3-impostor",  # "3" not preceded by /: boundary
    ],
)
def test_does_not_match_unrelated_models(model_name: str) -> None:
    assert not is_nous_zed_non_agentic(model_name), (
        f"expected {model_name!r} NOT to be flagged as Nous Zed 3/4"
    )
    assert _check_zed_model_warning(model_name) == ""


def test_none_like_inputs_are_safe() -> None:
    assert is_nous_zed_non_agentic("") is False
    # Defensive: the helper shouldn't crash on None-ish falsy input either.
    assert _check_zed_model_warning("") == ""
