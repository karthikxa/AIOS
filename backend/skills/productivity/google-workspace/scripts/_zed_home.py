"""Resolve ZED_HOME for standalone skill scripts.

Skill scripts may run outside the Zed process (e.g. system Python,
nix env, CI) where ``zed_constants`` is not importable.  This module
provides the same ``get_zed_home()`` and ``display_zed_home()``
contracts as ``zed_constants`` without requiring it on ``sys.path``.

When ``zed_constants`` IS available it is used directly so that any
future enhancements (profile resolution, Docker detection, etc.) are
picked up automatically.  The fallback path replicates the core logic
from ``hermes_constants.py`` using only the stdlib.

All scripts under ``google-workspace/scripts/`` should import from here
instead of duplicating the ``ZED_HOME = Path(os.getenv(...))`` pattern.
"""

from __future__ import annotations

import os
from pathlib import Path

try:
    from hermes_constants import display_zed_home as display_zed_home
    from hermes_constants import get_zed_home as get_zed_home
except (ModuleNotFoundError, ImportError):

    def get_zed_home() -> Path:
        """Return the Zed home directory (default: ~/.zed).

        Mirrors ``hermes_constants.get_zed_home()``."""
        val = os.environ.get("ZED_HOME", "").strip()
        return Path(val) if val else Path.home() / ".zed"

    def display_zed_home() -> str:
        """Return a user-friendly ``~/``-shortened display string.

        Mirrors ``hermes_constants.display_zed_home()``."""
        home = get_zed_home()
        try:
            return "~/" + str(home.relative_to(Path.home()))
        except ValueError:
            return str(home)

