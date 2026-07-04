"""Contract tests for the Docker image's immutable /opt/zed install tree."""
from __future__ import annotations

import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
DOCKERFILE = REPO_ROOT / "Dockerfile"


def _dockerfile_text() -> str:
    return DOCKERFILE.read_text()


def test_dockerfile_makes_opt_zed_root_owned_and_non_writable() -> None:
    text = _dockerfile_text()

    assert "COPY --chown=zed:zed . ." not in text
    assert "COPY . ." in text
    assert "chown -R root:root /opt/zed" in text
    assert "chmod -R a+rX /opt/zed" in text
    assert "chmod -R a-w /opt/zed" in text

    immutable_block = re.search(
        r"RUN mkdir -p /opt/zed/bin && \\\n"
        r"(?:.*\\\n)+?"
        r"\s+chmod -R a-w /opt/zed",
        text,
    )
    assert immutable_block, "Dockerfile must lock /opt/zed after installing code/deps"


def test_dockerfile_keeps_mutable_state_under_opt_data() -> None:
    text = _dockerfile_text()

    assert "ENV ZED_HOME=/opt/data" in text
    assert "ENV ZED_WRITE_SAFE_ROOT=/opt/data" in text
    assert 'VOLUME [ "/opt/data" ]' in text


def test_dockerfile_disables_runtime_install_mutations() -> None:
    text = _dockerfile_text()

    assert "ENV PYTHONDONTWRITEBYTECODE=1" in text
    assert "ENV ZED_DISABLE_LAZY_INSTALLS=1" in text
    assert "ZED_TUI_DIR=/opt/zed/ui-tui" in text


def test_dockerfile_does_not_chown_install_trees_to_zed() -> None:
    text = _dockerfile_text()
    forbidden_patterns = (
        r"chown\s+-R\s+zed:zed\s+/opt/zed/\.venv",
        r"chown\s+-R\s+zed:zed\s+/opt/zed/ui-tui",
        r"chown\s+-R\s+zed:zed\s+/opt/zed/gateway",
        r"chown\s+-R\s+zed:zed\s+/opt/zed/node_modules",
    )
    for pattern in forbidden_patterns:
        assert not re.search(pattern, text), (
            "runtime install trees under /opt/zed must stay immutable; "
            f"found forbidden pattern {pattern!r}"
        )


def test_dockerfile_bakes_code_scoped_install_method_stamp() -> None:
    """The 'docker' install-method stamp is baked next to the code.

    detect_install_method() reads the code-scoped stamp
    (/opt/zed/.install_method) first; baking it at build time keeps the
    published image self-identifying as 'docker' WITHOUT writing into the
    shared $ZED_HOME data volume (which a host install may also use).
    It must live inside the immutable block so the runtime user can't alter it.
    """
    text = _dockerfile_text()
    assert "printf 'docker\\n' > /opt/zed/.install_method" in text

    immutable_block = re.search(
        r"RUN mkdir -p /opt/zed/bin && \\\n"
        r"(?:.*\\\n)+?"
        r"\s+chmod -R a-w /opt/zed",
        text,
    )
    assert immutable_block, "immutable block must exist"
    assert ".install_method" in immutable_block.group(0), (
        "the code-scoped install-method stamp must be baked inside the "
        "immutable /opt/zed block"
    )
