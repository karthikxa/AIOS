"""Tests for hermes_cli.model_normalize â€” provider-aware model name normalization.

Covers issue #5211: opencode-go model names with dots (e.g. minimax-m2.7)
must NOT be mangled to hyphens (minimax-m2-7).
"""
import pytest

from hermes_cli.model_normalize import (
    normalize_model_for_provider,
    _DOT_TO_HYPHEN_PROVIDERS,
    _normalize_for_deepseek,
    detect_vendor,
)


# â”€â”€ Regression: issue #5211 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

class TestIssue5211OpenCodeGoDotPreservation:
    """OpenCode Go model names with dots must pass through unchanged."""

    @pytest.mark.parametrize("model,expected", [
        ("minimax-m2.7", "minimax-m2.7"),
        ("minimax-m2.5", "minimax-m2.5"),
        ("glm-4.5", "glm-4.5"),
        ("kimi-k2.5", "kimi-k2.5"),
        ("some-model-1.0.3", "some-model-1.0.3"),
    ])
    def test_opencode_go_preserves_dots(self, model, expected):
        result = normalize_model_for_provider(model, "opencode-go")
        assert result == expected, f"Expected {expected!r}, got {result!r}"

    def test_opencode_go_not_in_dot_to_hyphen_set(self):
        """opencode-go must NOT be in the dot-to-hyphen provider set."""
        assert "opencode-go" not in _DOT_TO_HYPHEN_PROVIDERS


# â”€â”€ Anthropic dot-to-hyphen conversion (regression) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

class TestAnthropicDotToHyphen:
    """Anthropic API still needs dotsâ†’hyphens."""

    @pytest.mark.parametrize("model,expected", [
        ("claude-sonnet-4.6", "claude-sonnet-4-6"),
        ("claude-opus-4.5", "claude-opus-4-5"),
    ])
    def test_anthropic_converts_dots(self, model, expected):
        result = normalize_model_for_provider(model, "anthropic")
        assert result == expected

    def test_anthropic_strips_vendor_prefix(self):
        result = normalize_model_for_provider("anthropic/claude-sonnet-4.6", "anthropic")
        assert result == "claude-sonnet-4-6"


# â”€â”€ OpenCode Zen regression â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

class TestOpenCodeZenModelNormalization:
    """OpenCode Zen preserves dots for most models, but Claude stays hyphenated."""

    @pytest.mark.parametrize("model,expected", [
        ("claude-sonnet-4.6", "claude-sonnet-4-6"),
        ("opencode-zen/claude-opus-4.5", "claude-opus-4-5"),
        ("glm-4.5", "glm-4.5"),
        ("glm-5.1", "glm-5.1"),
        ("gpt-5.4", "gpt-5.4"),
        ("minimax-m2.5-free", "minimax-m2.5-free"),
        ("kimi-k2.5", "kimi-k2.5"),
    ])
    def test_zen_normalizes_models(self, model, expected):
        result = normalize_model_for_provider(model, "opencode-zen")
        assert result == expected

    def test_zen_strips_vendor_prefix(self):
        result = normalize_model_for_provider("opencode-zen/claude-sonnet-4.6", "opencode-zen")
        assert result == "claude-sonnet-4-6"

    def test_zen_strips_vendor_prefix_for_non_claude(self):
        result = normalize_model_for_provider("opencode-zen/glm-5.1", "opencode-zen")
        assert result == "glm-5.1"


# â”€â”€ Copilot dot preservation (regression) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

class TestCopilotDotPreservation:
    """Copilot preserves dots in model names."""

    @pytest.mark.parametrize("model,expected", [
        ("claude-sonnet-4.6", "claude-sonnet-4.6"),
        ("gpt-5.4", "gpt-5.4"),
    ])
    def test_copilot_preserves_dots(self, model, expected):
        result = normalize_model_for_provider(model, "copilot")
        assert result == expected


# â”€â”€ Copilot model-name normalization (issue #6879 regression) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

class TestCopilotModelNormalization:
    """Copilot requires bare dot-notation model IDs.

    Regression coverage for issue #6879 and the broken Copilot branch
    that previously left vendor-prefixed Anthropic IDs (e.g.
    ``anthropic/claude-sonnet-4.6``) and dash-notation Claude IDs (e.g.
    ``claude-sonnet-4-6``) unchanged, causing the Copilot API to reject
    the request with HTTP 400 "model_not_supported".
    """

    @pytest.mark.parametrize("model,expected", [
        # Vendor-prefixed Anthropic IDs â€” prefix must be stripped.
        ("anthropic/claude-opus-4.6",   "claude-opus-4.6"),
        ("anthropic/claude-sonnet-4.6", "claude-sonnet-4.6"),
        ("anthropic/claude-sonnet-4.5", "claude-sonnet-4.5"),
        ("anthropic/claude-haiku-4.5",  "claude-haiku-4.5"),
        # Vendor-prefixed OpenAI IDs â€” prefix must be stripped.
        ("openai/gpt-5.4",              "gpt-5.4"),
        ("openai/gpt-4o",               "gpt-4o"),
        ("openai/gpt-4o-mini",          "gpt-4o-mini"),
        # Dash-notation Claude IDs â€” must be converted to dot-notation.
        ("claude-opus-4-6",             "claude-opus-4.6"),
        ("claude-sonnet-4-6",           "claude-sonnet-4.6"),
        ("claude-sonnet-4-5",           "claude-sonnet-4.5"),
        ("claude-haiku-4-5",            "claude-haiku-4.5"),
        # Combined: vendor-prefixed + dash-notation.
        ("anthropic/claude-opus-4-6",   "claude-opus-4.6"),
        ("anthropic/claude-sonnet-4-6", "claude-sonnet-4.6"),
        # Already-canonical inputs pass through unchanged.
        ("claude-sonnet-4.6",           "claude-sonnet-4.6"),
        ("gpt-5.4",                     "gpt-5.4"),
        ("gpt-5-mini",                  "gpt-5-mini"),
    ])
    def test_copilot_normalization(self, model, expected):
        assert normalize_model_for_provider(model, "copilot") == expected

    @pytest.mark.parametrize("model,expected", [
        ("anthropic/claude-sonnet-4.6", "claude-sonnet-4.6"),
        ("claude-sonnet-4-6",           "claude-sonnet-4.6"),
        ("claude-opus-4-6",             "claude-opus-4.6"),
        ("openai/gpt-5.4",              "gpt-5.4"),
    ])
    def test_copilot_acp_normalization(self, model, expected):
        """Copilot ACP shares the same API expectations as HTTP Copilot."""
        assert normalize_model_for_provider(model, "copilot-acp") == expected

    def test_openai_codex_still_strips_openai_prefix(self):
        """Regression: openai-codex must still strip the openai/ prefix."""
        assert normalize_model_for_provider("openai/gpt-5.4", "openai-codex") == "gpt-5.4"


# â”€â”€ Aggregator providers (regression) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

class TestAggregatorProviders:
    """Aggregators need vendor/model slugs."""

    def test_openrouter_prepends_vendor(self):
        result = normalize_model_for_provider("claude-sonnet-4.6", "openrouter")
        assert result == "anthropic/claude-sonnet-4.6"

    def test_nous_prepends_vendor(self):
        result = normalize_model_for_provider("gpt-5.4", "nous")
        assert result == "openai/gpt-5.4"

    def test_vendor_already_present(self):
        result = normalize_model_for_provider("anthropic/claude-sonnet-4.6", "openrouter")
        assert result == "anthropic/claude-sonnet-4.6"


class TestIssue6211NativeProviderPrefixNormalization:
    @pytest.mark.parametrize("model,target_provider,expected", [
        ("zai/glm-5.1", "zai", "glm-5.1"),
        ("google/gemini-2.5-pro", "gemini", "gemini-2.5-pro"),
        ("gemini/gemini-2.5-pro", "gemini", "gemini-2.5-pro"),
        ("moonshot/kimi-k2.5", "kimi-coding", "kimi-k2.5"),
        ("anthropic/claude-sonnet-4.6", "openrouter", "anthropic/claude-sonnet-4.6"),
        ("x-ai/grok-4-fast-reasoning", "xai", "grok-4-fast-reasoning"),
        ("Qwen/Qwen3.5-397B-A17B", "huggingface", "Qwen/Qwen3.5-397B-A17B"),
        ("openai/gpt-5.4", "xai", "openai/gpt-5.4"),
        ("modal/zai-org/GLM-5-FP8", "custom", "modal/zai-org/GLM-5-FP8"),
    ])
    def test_native_provider_prefixes_are_only_stripped_on_matching_provider(
        self, model, target_provider, expected
    ):
        assert normalize_model_for_provider(model, target_provider) == expected


# â”€â”€ detect_vendor â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

class TestDetectVendor:
    @pytest.mark.parametrize("model,expected", [
        ("claude-sonnet-4.6", "anthropic"),
        ("gpt-5.4-mini", "openai"),
        ("minimax-m2.7", "minimax"),
        ("glm-4.5", "z-ai"),
        ("kimi-k2.5", "moonshotai"),
    ])
    def test_detects_known_vendors(self, model, expected):
        assert detect_vendor(model) == expected


# â”€â”€ DeepSeek V-series pass-through (bug: V4 models silently folded to V3) â”€â”€

class TestDeepseekVSeriesPassThrough:
    """DeepSeek's V-series IDs (``deepseek-v4-pro``, ``deepseek-v4-flash``,
    and future ``deepseek-v<N>-*`` variants) are first-class model IDs
    accepted directly by DeepSeek's Chat Completions API. Earlier code
    folded every non-reasoner name into ``deepseek-chat``, which on
    aggregators (Nous portal, OpenRouter via DeepInfra) routes to V3 â€”
    silently downgrading users who picked V4.
    """

    @pytest.mark.parametrize("model", [
        "deepseek-v4-pro",
        "deepseek-v4-flash",
        "deepseek/deepseek-v4-pro",          # vendor-prefixed
        "deepseek/deepseek-v4-flash",
        "DeepSeek-V4-Pro",                    # case-insensitive
        "deepseek-v4-flash-20260423",         # dated variant
        "deepseek-v5-pro",                    # future V-series
        "deepseek-v10-ultra",                 # double-digit future
    ])
    def test_v_series_passes_through(self, model):
        expected = model.split("/", 1)[-1].lower()
        assert _normalize_for_deepseek(model) == expected

    def test_deepseek_provider_preserves_v4_pro(self):
        """End-to-end via normalize_model_for_provider â€” user selecting
        V4 Pro must reach DeepSeek's API as V4 Pro, not V3 alias."""
        result = normalize_model_for_provider("deepseek-v4-pro", "deepseek")
        assert result == "deepseek-v4-pro"

    def test_deepseek_provider_preserves_v4_flash(self):
        result = normalize_model_for_provider("deepseek-v4-flash", "deepseek")
        assert result == "deepseek-v4-flash"


# â”€â”€ DeepSeek regressions (existing behaviour still holds) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

class TestDeepseekCanonicalAndReasonerMapping:
    """Canonical pass-through and reasoner-keyword folding stay intact."""

    @pytest.mark.parametrize("model,expected", [
        ("deepseek-chat", "deepseek-chat"),
        ("deepseek-reasoner", "deepseek-reasoner"),
        ("DEEPSEEK-CHAT", "deepseek-chat"),
    ])
    def test_canonical_models_pass_through(self, model, expected):
        assert _normalize_for_deepseek(model) == expected

    @pytest.mark.parametrize("model", [
        "deepseek-r1",
        "deepseek-r1-0528",
        "deepseek-think-v3",
        "deepseek-reasoning-preview",
        "deepseek-cot-experimental",
    ])
    def test_reasoner_keywords_map_to_reasoner(self, model):
        assert _normalize_for_deepseek(model) == "deepseek-reasoner"

    @pytest.mark.parametrize("model", [
        "deepseek-chat-v3.1",    # 'chat' prefix, not V-series pattern
        "unknown-model",
        "something-random",
        "gpt-5",                 # non-DeepSeek names still fall through
    ])
    def test_unknown_names_fall_back_to_chat(self, model):
        assert _normalize_for_deepseek(model) == "deepseek-chat"

