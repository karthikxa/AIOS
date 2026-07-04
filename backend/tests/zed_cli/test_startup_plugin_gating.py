"""Guards for CLI startup performance regression.

``zed_cli.main`` skips eager plugin discovery at argparse-setup time
when the invocation is clearly targeting a known built-in subcommand.
This saves 500-650ms on ``zed --help``, ``zed version``,
``zed logs``, etc., by not importing ``google.cloud.pubsub_v1``,
``aiohttp``, ``grpc``, and friends.

Two invariants:

1. ``_BUILTIN_SUBCOMMANDS`` must contain every subcommand that is actually
   registered by ``main()``.  If an entry is missing, plugin discovery
   runs unnecessarily for that command (correctness-safe, just slow).
   If an entry is PRESENT but the subcommand doesn't exist, a plugin
   could shadow the name â€” also bad.

2. ``_plugin_cli_discovery_needed()`` returns the right answer for the
   flag/positional parsing cases it's meant to handle.
"""

from __future__ import annotations

import io
import re
import sys
from contextlib import redirect_stdout
from unittest.mock import patch

import pytest

from zed_cli.main import (
    _BUILTIN_SUBCOMMANDS,
    _first_positional_argv,
    _plugin_cli_discovery_needed,
)


# â”€â”€ helper: grab the live set of top-level subcommands from argparse â”€â”€â”€â”€â”€â”€â”€


def _live_subcommand_names() -> set[str]:
    """Run ``zed --help`` in-process and parse the subcommand block.

    We patch ``_plugin_cli_discovery_needed`` to always return False so
    plugin-registered commands aren't included â€” we're validating the
    built-in-only set.
    """
    from zed_cli import main as _main

    argv_backup = sys.argv[:]
    sys.argv = ["zed", "--help"]
    buf = io.StringIO()
    try:
        with patch.object(_main, "_plugin_cli_discovery_needed", return_value=False):
            with redirect_stdout(buf):
                with pytest.raises(SystemExit):
                    _main.main()
    finally:
        sys.argv = argv_backup

    text = buf.getvalue()
    # argparse prints "{chat,model,...}" somewhere in the help output
    m = re.search(r"\{([a-zA-Z0-9_,\-]+)\}", text)
    assert m, f"Could not find subcommand group in --help output:\n{text[:500]}"
    return set(m.group(1).split(","))


# â”€â”€ _first_positional_argv â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€


@pytest.mark.parametrize(
    "argv,expected",
    [
        (["zed"], None),
        (["zed", "--help"], None),
        (["zed", "-h"], None),
        (["zed", "--version"], None),
        (["zed", "-w"], None),
        # -p / --profile is stripped from sys.argv by
        # _apply_profile_override() at import time, so it never reaches
        # _first_positional_argv. We test with just -w / --tui here.
        (["zed", "-w", "--tui"], None),
        (["zed", "version"], "version"),
        (["zed", "--tui", "chat"], "chat"),
        (["zed", "-w", "logs"], "logs"),
        (["zed", "chat", "hello world"], "chat"),
        (["zed", "gateway", "run"], "gateway"),
        # Top-level value-taking flags: the value should be skipped.
        (["zed", "-m", "gpt5", "chat"], "chat"),
        (["zed", "--model", "gpt5", "chat", "hi"], "chat"),
        (["zed", "-m", "gpt5", "--provider", "openai", "chat"], "chat"),
        (["zed", "-z", "hello world"], None),
        (["zed", "-z", "hello", "chat"], "chat"),
        (["zed", "--model=gpt5", "chat"], "chat"),     # inline form
        (["zed", "--", "chat"], "chat"),               # -- terminator
        (["zed", "-w", "--"], None),
        # Unknown positional after skipped flags â†’ plugin-cmd candidate.
        (["zed", "some-plugin-cmd"], "some-plugin-cmd"),
        (["zed", "-m", "gpt5", "some-plugin-cmd"], "some-plugin-cmd"),
    ],
)
def test_first_positional_argv(argv, expected):
    with patch.object(sys, "argv", argv):
        assert _first_positional_argv() == expected


# â”€â”€ _plugin_cli_discovery_needed â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€


@pytest.mark.parametrize(
    "argv",
    [
        ["zed"],                          # bare â†’ chat
        ["zed", "--help"],                # top-level help
        ["zed", "-h"],
        ["zed", "version"],               # known built-in
        ["zed", "logs"],
        ["zed", "gateway", "run"],
        ["zed", "--tui"],
        ["zed", "-w", "--tui"],
        ["zed", "chat", "hi"],
        ["zed", "help"],                  # accepted built-in-ish
        ["zed", "-m", "gpt5", "chat"],    # flag-value-skipping
    ],
)
def test_discovery_skipped_for_builtins(argv):
    with patch.object(sys, "argv", argv):
        assert _plugin_cli_discovery_needed() is False


@pytest.mark.parametrize(
    "argv",
    [
        ["zed", "meet", "join"],          # potential google_meet plugin
        ["zed", "honcho", "status"],      # potential memory plugin
        ["zed", "unknown-subcmd"],
    ],
)
def test_discovery_runs_for_unknown_positional(argv):
    with patch.object(sys, "argv", argv):
        assert _plugin_cli_discovery_needed() is True


# â”€â”€ _BUILTIN_SUBCOMMANDS â†” argparse registration parity â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€


def test_builtin_set_covers_every_registered_subcommand():
    """Every subcommand registered in main() must appear in the set.

    Missing entries cause a slow-path regression (correctness stays
    fine â€” discovery just runs unnecessarily).
    """
    live = _live_subcommand_names()
    # "help" is synthetic â€” an argparse-implicit convenience we include
    # in the set so ``zed help <cmd>`` skips discovery; it won't show
    # up as a subparser in the --help output.
    declared = _BUILTIN_SUBCOMMANDS - {"help"}
    missing_from_declaration = live - declared
    assert not missing_from_declaration, (
        f"_BUILTIN_SUBCOMMANDS is missing these live subcommands: "
        f"{sorted(missing_from_declaration)}. Add them to "
        f"zed_cli/main.py::_BUILTIN_SUBCOMMANDS so plugin discovery "
        f"can be skipped when the user targets them."
    )


def test_builtin_set_has_no_phantom_entries():
    """No entry in the set should refer to a subcommand that no longer exists.

    A phantom entry means plugin discovery gets incorrectly skipped for
    a name that â€” if a plugin actually registered it â€” would fail to
    parse. Keeps the set honest.
    """
    live = _live_subcommand_names()
    allowed_synthetic = {"help"}
    phantom = _BUILTIN_SUBCOMMANDS - live - allowed_synthetic
    assert not phantom, (
        f"_BUILTIN_SUBCOMMANDS has entries that are not registered as "
        f"top-level subparsers: {sorted(phantom)}"
    )
