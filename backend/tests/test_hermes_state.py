"""Tests for hermes_state.py — SessionDB SQLite CRUD, FTS5 search, export."""

import sqlite3
import time
import json
import pytest

import hermes_state
from hermes_state import SCHEMA_SQL, SCHEMA_VERSION, SessionDB


class _NoFtsCursor(sqlite3.Cursor):
    """Simulate a SQLite build without the fts5 module."""

    def execute(self, sql, parameters=()):
        probe = sql.strip()
        if "USING fts5" in probe:
            raise sqlite3.OperationalError("no such module: fts5")
        if probe in (
            "SELECT * FROM messages_fts LIMIT 0",
            "SELECT * FROM messages_fts_trigram LIMIT 0",
        ):
            raise sqlite3.OperationalError("no such table: " + probe.split()[-3])
        return super().execute(sql, parameters)

    def executescript(self, sql_script):
        if "USING fts5" in sql_script:
            raise sqlite3.OperationalError("no such module: fts5")
        return super().executescript(sql_script)


class _NoFtsConnection(sqlite3.Connection):
    def cursor(self, factory=None):
        return super().cursor(factory or _NoFtsCursor)


class _NoFtsExistingTableCursor(_NoFtsCursor):
    """Simulate existing FTS virtual tables under a runtime without FTS5."""

    def execute(self, sql, parameters=()):
        probe = sql.strip()
        if probe in (
            "SELECT * FROM messages_fts LIMIT 0",
            "SELECT * FROM messages_fts_trigram LIMIT 0",
        ):
            raise sqlite3.OperationalError("no such module: fts5")
        return super().execute(sql, parameters)


class _NoFtsExistingTableConnection(sqlite3.Connection):
    def cursor(self, factory=None):
        return super().cursor(factory or _NoFtsExistingTableCursor)


class _NoTrigramCursor(sqlite3.Cursor):
    """Simulate a SQLite build with FTS5 but without the trigram tokenizer."""

    def executescript(self, sql_script):
        if "tokenize='trigram'" in sql_script:
            raise sqlite3.OperationalError("no such tokenizer: trigram")
        return super().executescript(sql_script)


class _NoTrigramConnection(sqlite3.Connection):
    def cursor(self, factory=None):
        return super().cursor(factory or _NoTrigramCursor)


@pytest.fixture()
def db(tmp_path):
    """Create a SessionDB with a temp database file."""
    db_path = tmp_path / "test_state.db"
    session_db = SessionDB(db_path=db_path)
    yield session_db
    session_db.close()


# =========================================================================
# Session lifecycle
# =========================================================================

class TestSessionLifecycle:
    def test_create_and_get_session(self, db):
        sid = db.create_session(
            session_id="s1",
            source="cli",
            model="test-model",
        )
        assert sid == "s1"

        session = db.get_session("s1")
        assert session is not None
        assert session["source"] == "cli"
        assert session["model"] == "test-model"
        assert session["ended_at"] is None


    def test_get_nonexistent_session(self, db):
        assert db.get_session("nonexistent") is None

    def test_create_session_enriches_null_metadata_on_conflict(self, db):
        """Gateway creates a bare row first; the agent's later create_session
        must backfill model/model_config/system_prompt without clobbering the
        gateway's source/user_id/chat_id. Regression for NULL gateway metadata
        (sessions with NULL billing_provider/model)."""
        # Gateway bare row (source + user_id only), before the agent exists.
        db.create_session("s1", source="telegram", user_id="u1", chat_id="c1")
        bare = db.get_session("s1")
        assert bare["model"] is None
        # Agent enriches — passes source="cli" but real metadata.
        db.create_session(
            "s1", source="cli", model="claude-opus-4-6",
            model_config={"max_iterations": 90}, system_prompt="SYS",
        )
        enriched = db.get_session("s1")
        assert enriched["model"] == "claude-opus-4-6"
        assert enriched["system_prompt"] == "SYS"
        # Gateway-owned fields preserved (NOT clobbered by source="cli").
        assert enriched["source"] == "telegram"
        assert enriched["user_id"] == "u1"
        assert enriched["chat_id"] == "c1"

    def test_create_session_does_not_overwrite_existing_metadata(self, db):
        """A later bare write (source='unknown', model=...) must not overwrite
        a model/source an earlier writer already set."""
        db.create_session("s1", source="cli", model="real-model")
        db.create_session("s1", source="unknown", model="should-not-win")
        session = db.get_session("s1")
        assert session["model"] == "real-model"
        assert session["source"] == "cli"

    def test_update_session_cwd_persists_git_branch(self, db):
        db.create_session(session_id="s1", source="cli")
        db.update_session_cwd("s1", "/work/repo", git_branch="pets-feature")

        session = db.get_session("s1")
        assert session["cwd"] == "/work/repo"
        assert session["git_branch"] == "pets-feature"

    def test_update_session_cwd_empty_branch_does_not_clobber(self, db):
        """A failed branch probe (empty string) must not wipe a branch we
        already captured — only the cwd updates."""
        db.create_session(session_id="s1", source="cli")
        db.update_session_cwd("s1", "/work/repo", git_branch="main")
        db.update_session_cwd("s1", "/work/repo", git_branch="")

        session = db.get_session("s1")
        assert session["git_branch"] == "main"

    def test_update_session_cwd_without_branch_arg(self, db):
        """Back-compat: callers that pass only (id, cwd) still work."""
        db.create_session(session_id="s1", source="cli")
        db.update_session_cwd("s1", "/work/repo")

        session = db.get_session("s1")
        assert session["cwd"] == "/work/repo"
        assert session["git_branch"] is None

    def test_update_session_cwd_persists_git_repo_root(self, db):
        db.create_session(session_id="s1", source="cli")
        db.update_session_cwd("s1", "/work/repo/src", git_repo_root="/work/repo")

        assert db.get_session("s1")["git_repo_root"] == "/work/repo"

    def test_update_session_cwd_empty_repo_root_does_not_clobber(self, db):
        db.create_session(session_id="s1", source="cli")
        db.update_session_cwd("s1", "/work/repo", git_repo_root="/work/repo")
        db.update_session_cwd("s1", "/work/repo", git_repo_root="")

        assert db.get_session("s1")["git_repo_root"] == "/work/repo"

    def test_distinct_session_cwds_aggregates_history(self, db):
        db.create_session("s1", "cli", cwd="/repo")
        db.create_session("s2", "cli", cwd="/repo")
        db.create_session("s3", "cli", cwd="/other")
        db.create_session("s4", "cli")  # no cwd — excluded

        rows = {r["cwd"]: r["sessions"] for r in db.distinct_session_cwds()}
        assert rows == {"/repo": 2, "/other": 1}

    def test_backfill_repo_roots_fills_only_empty(self, db):
        db.create_session("s1", "cli", cwd="/repo/a")
        db.create_session("s2", "cli", cwd="/repo/b")
        db.update_session_cwd("s2", "/repo/b", git_repo_root="/already")

        db.backfill_repo_roots({"/repo/a": "/repo", "/repo/b": "/repo"})

        assert db.get_session("s1")["git_repo_root"] == "/repo"
        # Pre-existing root is preserved, not clobbered.
        assert db.get_session("s2")["git_repo_root"] == "/already"

    def test_end_session(self, db):
        db.create_session(session_id="s1", source="cli")
        db.end_session("s1", end_reason="user_exit")

        session = db.get_session("s1")
        assert isinstance(session["ended_at"], float)
        assert session["end_reason"] == "user_exit"

    def test_end_session_preserves_original_end_reason(self, db):
        """The first end_reason wins — compression splits must not be
        overwritten when a later stale ``end_session()`` call lands on the
        same row (e.g. from a CLI session_id that desynced after compression
        and then tried to /resume another session).
        """
        db.create_session(session_id="s1", source="cli")
        db.end_session("s1", end_reason="compression")
        first_ended_at = db.get_session("s1")["ended_at"]

        # Simulate a stale CLI holding the old session_id and calling
        # end_session() again with a different reason.
        time.sleep(0.01)
        db.end_session("s1", end_reason="resumed_other")

        session = db.get_session("s1")
        assert session["end_reason"] == "compression"
        assert session["ended_at"] == first_ended_at

    def test_end_session_after_reopen_allows_re_end(self, db):
        """reopen_session() is the explicit escape hatch for re-ending a
        closed session. After reopen, end_session() takes effect again.
        """
        db.create_session(session_id="s1", source="cli")
        db.end_session("s1", end_reason="compression")
        db.reopen_session("s1")
        db.end_session("s1", end_reason="user_exit")

        session = db.get_session("s1")
        assert session["end_reason"] == "user_exit"

    def test_update_system_prompt(self, db):
        db.create_session(session_id="s1", source="cli")
        db.update_system_prompt("s1", "You are a helpful assistant.")

        session = db.get_session("s1")
        assert session["system_prompt"] == "You are a helpful assistant."

    def test_update_token_counts(self, db):
        db.create_session(session_id="s1", source="cli")
        db.update_token_counts("s1", input_tokens=200, output_tokens=100)
        db.update_token_counts("s1", input_tokens=100, output_tokens=50)

        session = db.get_session("s1")
        assert session["input_tokens"] == 300
        assert session["output_tokens"] == 150

    def test_update_token_counts_tracks_api_call_count(self, db):
        """api_call_count increments with each update_token_counts call."""
        db.create_session(session_id="s1", source="cli")
        db.update_token_counts("s1", input_tokens=100, output_tokens=50, api_call_count=1)
        db.update_token_counts("s1", input_tokens=100, output_tokens=50, api_call_count=1)
        db.update_token_counts("s1", input_tokens=100, output_tokens=50, api_call_count=1)

        session = db.get_session("s1")
        assert session["api_call_count"] == 3

    def test_update_token_counts_api_call_count_absolute(self, db):
        """absolute mode sets api_call_count directly."""
        db.create_session(session_id="s1", source="cli")
        db.update_token_counts("s1", input_tokens=100, output_tokens=50, api_call_count=1)
        db.update_token_counts("s1", input_tokens=300, output_tokens=150,
                               api_call_count=5, absolute=True)

        session = db.get_session("s1")
        assert session["api_call_count"] == 5
        assert session["input_tokens"] == 300

    def test_update_token_counts_backfills_model_when_null(self, db):
        db.create_session(session_id="s1", source="telegram")
        db.update_token_counts("s1", input_tokens=10, output_tokens=5, model="openai/gpt-5.4")

        session = db.get_session("s1")
        assert session["model"] == "openai/gpt-5.4"

    def test_update_token_counts_preserves_existing_model(self, db):
        db.create_session(session_id="s1", source="cli", model="anthropic/claude-opus-4.6")
        db.update_token_counts("s1", input_tokens=10, output_tokens=5, model="openai/gpt-5.4")

        session = db.get_session("s1")
        assert session["model"] == "anthropic/claude-opus-4.6"

    def test_update_session_model_overwrites_existing(self, db):
        """A mid-session /model switch must overwrite the stored model.

        update_token_counts uses COALESCE(model, ?) (first-writer-wins), so
        the dashboard kept showing the original model after a switch (#34850).
        update_session_model sets the column unconditionally.
        """
        db.create_session(session_id="s1", source="telegram",
                          model="xiaomi/mimo-v2.5-pro")
        # Token updates never change the model once set.
        db.update_token_counts("s1", input_tokens=10, output_tokens=5,
                               model="xiaomi/mimo-v2.5-pro")
        assert db.get_session("s1")["model"] == "xiaomi/mimo-v2.5-pro"

        # Explicit switch overwrites it.
        db.update_session_model("s1", "xiaomi/mimo-v2.5")
        assert db.get_session("s1")["model"] == "xiaomi/mimo-v2.5"

        # And a subsequent token update does NOT revert it (COALESCE no-ops
        # because the column is now non-NULL).
        db.update_token_counts("s1", input_tokens=10, output_tokens=5,
                               model="xiaomi/mimo-v2.5-pro")
        assert db.get_session("s1")["model"] == "xiaomi/mimo-v2.5"

    def test_update_session_billing_route_overwrites_after_switch(self, db):
        """A mid-session provider switch must overwrite the billing route.

        update_token_counts writes billing fields with
        COALESCE(billing_provider, ?) (first-writer-wins), so after a
        provider switch the dashboard kept attributing cost to the original
        provider (#48248). update_session_billing_route sets them
        unconditionally and nulls system_prompt so the next turn rebuilds
        the Model:/Provider: header (#48173).
        """
        db.create_session(session_id="s1", source="telegram")
        # First token update seeds the billing route.
        db.update_token_counts("s1", input_tokens=10, output_tokens=5,
                               billing_provider="openrouter",
                               billing_base_url="https://openrouter.ai/api/v1",
                               billing_mode="api_key")
        sess = db.get_session("s1")
        assert sess["billing_provider"] == "openrouter"
        # A later token update never changes it (COALESCE first-writer-wins).
        db.update_token_counts("s1", input_tokens=10, output_tokens=5,
                               billing_provider="ollama",
                               billing_base_url="http://localhost:11434/v1",
                               billing_mode="local")
        assert db.get_session("s1")["billing_provider"] == "openrouter"

        # Seed a stale prompt snapshot, then switch the billing route.
        db.update_system_prompt("s1", "Model: x/old\nProvider: openrouter")
        assert db.get_session("s1")["system_prompt"] is not None
        db.update_session_billing_route(
            "s1", provider="ollama",
            base_url="http://localhost:11434/v1", billing_mode="local",
        )
        sess = db.get_session("s1")
        assert sess["billing_provider"] == "ollama"
        assert sess["billing_base_url"] == "http://localhost:11434/v1"
        assert sess["billing_mode"] == "local"
        assert sess["system_prompt"] is None, \
            "system_prompt must be nulled so the next turn rebuilds Model:/Provider:"

        # billing_mode defaults to COALESCE — omitting it preserves the value.
        db.update_session_billing_route(
            "s1", provider="openai",
            base_url="https://api.openai.com/v1",
        )
        sess = db.get_session("s1")
        assert sess["billing_provider"] == "openai"
        assert sess["billing_mode"] == "local"  # preserved (COALESCE on None)

    def test_parent_session(self, db):
        db.create_session(session_id="parent", source="cli")
        db.create_session(session_id="child", source="cli", parent_session_id="parent")

        child = db.get_session("child")
        assert child["parent_session_id"] == "parent"

    def test_db_initializes_without_fts5_module(self, tmp_path, monkeypatch):
        real_connect = sqlite3.connect

        def connect_without_fts(*args, **kwargs):
            kwargs["factory"] = _NoFtsConnection
            return real_connect(*args, **kwargs)

        monkeypatch.setattr("hermes_state.sqlite3.connect", connect_without_fts)

        db = SessionDB(db_path=tmp_path / "state.db")
        try:
            assert db._fts_enabled is False
            # Neither FTS5 virtual table should have been created on a build
            # that lacks the fts5 module — both init paths must degrade.
            assert db._fts_table_exists("messages_fts") is False
            assert db._fts_table_exists("messages_fts_trigram") is False

            db.create_session(session_id="s1", source="cli")
            db.append_message("s1", role="user", content="hello from sqlite without fts")

            messages = db.get_messages("s1")
            assert len(messages) == 1
            assert messages[0]["content"] == "hello from sqlite without fts"
            assert db.search_messages("hello") == []
        finally:
            db.close()

    def test_existing_fts_tables_do_not_break_without_fts5(
        self, tmp_path, monkeypatch
    ):
        db_path = tmp_path / "state.db"
        seeded = SessionDB(db_path=db_path)
        try:
            seeded.create_session(session_id="s1", source="cli")
            seeded.append_message("s1", role="user", content="before runtime change")
        finally:
            seeded.close()

        real_connect = sqlite3.connect

        def connect_without_fts(*args, **kwargs):
            kwargs["factory"] = _NoFtsExistingTableConnection
            return real_connect(*args, **kwargs)

        monkeypatch.setattr("hermes_state.sqlite3.connect", connect_without_fts)

        db = SessionDB(db_path=db_path)
        try:
            assert db._fts_enabled is False
            assert db.get_session("s1") is not None
            assert len(db.get_messages("s1")) == 1

            # Existing FTS triggers must be disabled too; otherwise this write
            # would try to insert into an unusable FTS virtual table.
            db.append_message("s1", role="assistant", content="after runtime change")
            messages = db.get_messages("s1")
            assert len(messages) == 2
            assert messages[1]["content"] == "after runtime change"
        finally:
            db.close()

    def test_old_schema_without_fts5_does_not_crash(self, tmp_path, monkeypatch):
        db_path = tmp_path / "legacy.db"
        conn = sqlite3.connect(str(db_path))
        conn.executescript(SCHEMA_SQL)
        conn.execute("DELETE FROM schema_version")
        conn.execute("INSERT INTO schema_version (version) VALUES (?)", (9,))
        conn.commit()
        conn.close()

        real_connect = sqlite3.connect

        def connect_without_fts(*args, **kwargs):
            kwargs["factory"] = _NoFtsConnection
            return real_connect(*args, **kwargs)

        monkeypatch.setattr("hermes_state.sqlite3.connect", connect_without_fts)

        db = SessionDB(db_path=db_path)
        try:
            assert db._fts_enabled is False
            db.create_session(session_id="s1", source="cli")
            db.append_message("s1", role="user", content="legacy no fts")
            assert db.get_messages("s1")[0]["content"] == "legacy no fts"
            assert db.search_messages("legacy") == []

            # Leave the FTS migration version in place so a future FTS-capable
            # runtime can still rebuild and backfill the indexes.
            row = db._conn.execute("SELECT version FROM schema_version").fetchone()
            assert row["version"] == 9
        finally:
            db.close()

    def test_fts_runtime_restores_triggers_after_no_fts_open(
        self, tmp_path, monkeypatch
    ):
        db_path = tmp_path / "state.db"
        seeded = SessionDB(db_path=db_path)
        try:
            seeded.create_session(session_id="s1", source="cli")
            seeded.append_message("s1", role="user", content="first searchable")
        finally:
            seeded.close()

        real_connect = sqlite3.connect

        def connect_without_fts(*args, **kwargs):
            kwargs["factory"] = _NoFtsExistingTableConnection
            return real_connect(*args, **kwargs)

        monkeypatch.setattr("hermes_state.sqlite3.connect", connect_without_fts)
        no_fts = SessionDB(db_path=db_path)
        try:
            no_fts.append_message("s1", role="assistant", content="not indexed yet")
        finally:
            no_fts.close()

        monkeypatch.setattr("hermes_state.sqlite3.connect", real_connect)
        restored = SessionDB(db_path=db_path)
        try:
            assert restored._fts_enabled is True
            restored.append_message("s1", role="assistant", content="indexed again")
            assert len(restored.search_messages("not indexed yet")) == 1
            assert len(restored.search_messages("indexed")) == 2
        finally:
            restored.close()

    def test_base_fts_rebuilds_after_trigger_repair_without_trigram(
        self, tmp_path, monkeypatch
    ):
        """Trigger repair must rebuild base FTS even when trigram is unavailable."""
        db_path = tmp_path / "state.db"
        seeded = SessionDB(db_path=db_path)
        try:
            seeded.create_session(session_id="s1", source="cli")
            seeded.append_message("s1", role="user", content="already indexed")
            for trigger in (
                "messages_fts_insert",
                "messages_fts_delete",
                "messages_fts_update",
                "messages_fts_trigram_insert",
                "messages_fts_trigram_delete",
                "messages_fts_trigram_update",
            ):
                seeded._conn.execute(f"DROP TRIGGER IF EXISTS {trigger}")
            seeded._conn.commit()
            seeded.append_message("s1", role="assistant", content="repair only base needle")
        finally:
            seeded.close()

        real_connect = sqlite3.connect

        def connect_without_trigram(*args, **kwargs):
            kwargs["factory"] = _NoTrigramConnection
            return real_connect(*args, **kwargs)

        monkeypatch.setattr("hermes_state.sqlite3.connect", connect_without_trigram)
        restored = SessionDB(db_path=db_path)
        try:
            assert restored._fts_enabled is True
            assert restored._trigram_available is False
            assert restored._fts_table_exists("messages_fts") is True
            assert len(restored.search_messages("needle")) == 1
        finally:
            restored.close()

    def test_is_fts5_unavailable_error_catches_trigram_tokenizer(self):
        """Unit test: _is_fts5_unavailable_error matches 'no such tokenizer: trigram'."""
        fts5_err = sqlite3.OperationalError("no such module: fts5")
        trigram_err = sqlite3.OperationalError("no such tokenizer: trigram")
        generic_tokenizer_err = sqlite3.OperationalError("no such tokenizer: foo")
        unrelated_err = sqlite3.OperationalError("no such table: foo")

        assert SessionDB._is_fts5_unavailable_error(fts5_err) is True
        assert SessionDB._is_fts5_unavailable_error(trigram_err) is True
        # Generic tokenizer errors should NOT match — only trigram.
        assert SessionDB._is_fts5_unavailable_error(generic_tokenizer_err) is False
        assert SessionDB._is_fts5_unavailable_error(unrelated_err) is False

    def test_is_trigram_unavailable_error(self):
        """Unit test: _is_trigram_unavailable_error is scoped to trigram."""
        trigram_err = sqlite3.OperationalError("no such tokenizer: trigram")
        generic_err = sqlite3.OperationalError("no such tokenizer: foo")
        fts5_err = sqlite3.OperationalError("no such module: fts5")

        assert SessionDB._is_trigram_unavailable_error(trigram_err) is True
        assert SessionDB._is_trigram_unavailable_error(generic_err) is False
        assert SessionDB._is_trigram_unavailable_error(fts5_err) is False

    def test_db_initializes_without_trigram_tokenizer(self, tmp_path, monkeypatch):
        """SessionDB must not crash when FTS5 exists but trigram tokenizer is missing."""
        real_connect = sqlite3.connect

        def connect_without_trigram(*args, **kwargs):
            kwargs["factory"] = _NoTrigramConnection
            return real_connect(*args, **kwargs)

        monkeypatch.setattr("hermes_state.sqlite3.connect", connect_without_trigram)

        db = SessionDB(db_path=tmp_path / "state.db")
        try:
            # Base FTS5 should still work (trigram is optional).
            assert db._fts_enabled is True
            assert db._fts_table_exists("messages_fts") is True
            # Trigram table should NOT have been created.
            assert db._fts_table_exists("messages_fts_trigram") is False

            db.create_session(session_id="s1", source="cli")
            db.append_message("s1", role="user", content="hello without trigram")

            messages = db.get_messages("s1")
            assert len(messages) == 1
            assert messages[0]["content"] == "hello without trigram"

            # FTS5 keyword search should still work.
            assert len(db.search_messages("hello")) == 1
        finally:
            db.close()

    def test_v11_migration_backfills_base_fts_when_trigram_unavailable(
        self, tmp_path, monkeypatch
    ):
        """Regression: v11 migration must backfill base FTS even when trigram is unavailable."""
        real_connect = sqlite3.connect
        db_path = tmp_path / "state.db"

        # Phase 1: create a DB at schema v10 with messages.
        db = SessionDB(db_path=db_path)
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="user", content="legacy message alpha")
        db.append_message("s1", role="assistant", content="legacy reply beta")
        # Force schema version to v10 so migration runs on next open.
        db._conn.execute(
            "UPDATE schema_version SET version = 10"
        )
        db._conn.commit()
        db.close()

        # Phase 2: reopen with trigram disabled — migration should still
        # backfill base FTS and make existing messages searchable.
        def connect_without_trigram(*args, **kwargs):
            kwargs["factory"] = _NoTrigramConnection
            return real_connect(*args, **kwargs)

        monkeypatch.setattr("hermes_state.sqlite3.connect", connect_without_trigram)
        migrated_db = SessionDB(db_path=db_path)
        try:
            assert migrated_db._fts_enabled is True
            assert migrated_db._trigram_available is False
            assert migrated_db._fts_table_exists("messages_fts") is True
            assert migrated_db._fts_table_exists("messages_fts_trigram") is False

            # Existing messages must be searchable via base FTS.
            results = migrated_db.search_messages("legacy message")
            assert len(results) == 1
            # snippet has FTS5 highlight markers (>>>...<<<); check raw content via get_messages
            msgs = migrated_db.get_messages("s1")
            assert any("legacy message" in m["content"] for m in msgs)
        finally:
            migrated_db.close()

    def test_cjk_search_falls_back_to_like_when_trigram_unavailable(
        self, tmp_path, monkeypatch
    ):
        """Regression: long CJK queries must fall back to LIKE when trigram is missing."""
        real_connect = sqlite3.connect
        db_path = tmp_path / "state.db"

        def connect_without_trigram(*args, **kwargs):
            kwargs["factory"] = _NoTrigramConnection
            return real_connect(*args, **kwargs)

        monkeypatch.setattr("hermes_state.sqlite3.connect", connect_without_trigram)
        db = SessionDB(db_path=db_path)
        try:
            db.create_session(session_id="s1", source="cli")
            db.append_message("s1", role="user", content="大别山项目计划书")
            db.append_message("s1", role="user", content="长江大桥设计方案")

            # 3+ CJK chars would normally use trigram, but it's unavailable.
            # Must fall back to LIKE and still return results.
            results = db.search_messages("大别山")
            assert len(results) == 1
            # Note: search_messages strips 'content' from results; use 'snippet'.
            assert "大别山" in results[0]["snippet"]
        finally:
            db.close()


# =========================================================================
# Message storage
# =========================================================================

class TestMessageStorage:
    def test_append_and_get_messages(self, db):
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="user", content="Hello")
        db.append_message("s1", role="assistant", content="Hi there!")

        messages = db.get_messages("s1")
        assert len(messages) == 2
        assert messages[0]["role"] == "user"
        assert messages[0]["content"] == "Hello"
        assert messages[1]["role"] == "assistant"

    def test_append_message_sets_active_for_transcript_loader(self, db):
        """Regression #51646: gateway loaders filter on active = 1."""
        db.create_session(session_id="s1", source="discord")
        mid = db.append_message("s1", role="user", content="Hello")
        active = db._conn.execute(
            "SELECT active FROM messages WHERE id = ?", (mid,)
        ).fetchone()[0]
        assert active == 1
        assert len(db.get_messages_as_conversation("s1")) == 1

    def test_append_message_active_one_when_column_has_no_default(self, tmp_path):
        """Legacy DBs may have active added without a working INSERT default."""
        db_path = tmp_path / "legacy_state.db"
        conn = sqlite3.connect(db_path)
        conn.executescript(
            """
            CREATE TABLE schema_version (version INTEGER);
            INSERT INTO schema_version VALUES (11);
            CREATE TABLE sessions (
                id TEXT PRIMARY KEY, source TEXT, started_at REAL, ended_at REAL,
                message_count INTEGER DEFAULT 0, tool_call_count INTEGER DEFAULT 0,
                title TEXT, parent_session_id TEXT, model_config TEXT
            );
            CREATE TABLE messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL, role TEXT NOT NULL, content TEXT,
                tool_call_id TEXT, tool_calls TEXT, tool_name TEXT,
                timestamp REAL NOT NULL, token_count INTEGER, finish_reason TEXT,
                reasoning TEXT, reasoning_content TEXT, reasoning_details TEXT,
                codex_reasoning_items TEXT, codex_message_items TEXT,
                platform_message_id TEXT, observed INTEGER DEFAULT 0
            );
            CREATE TABLE state_meta (key TEXT PRIMARY KEY, value TEXT);
            """
        )
        conn.execute(
            "INSERT INTO sessions (id, source, started_at) VALUES ('s1', 'discord', 1.0)"
        )
        conn.execute("ALTER TABLE messages ADD COLUMN active INTEGER")
        conn.execute("ALTER TABLE messages ADD COLUMN compacted INTEGER DEFAULT 0")
        conn.commit()
        conn.close()

        session_db = SessionDB(db_path=db_path)
        try:
            mid = session_db.append_message("s1", role="user", content="gateway turn")
            active = session_db._conn.execute(
                "SELECT active FROM messages WHERE id = ?", (mid,)
            ).fetchone()[0]
            assert active == 1
            assert len(session_db.get_messages_as_conversation("s1")) == 1
        finally:
            session_db.close()

    def test_startup_heals_null_active_rows(self, tmp_path):
        """Rows written as active=NULL before the fix are un-hidden on startup.

        The repair UPDATE used to be gated at schema_version < 12, so
        already-v12+ databases (the exact population hit by #51646) never
        healed their historical NULL rows. It now runs on every startup.
        """
        db_path = tmp_path / "legacy_state.db"
        conn = sqlite3.connect(db_path)
        conn.executescript(
            """
            CREATE TABLE schema_version (version INTEGER);
            INSERT INTO schema_version VALUES (12);
            CREATE TABLE sessions (
                id TEXT PRIMARY KEY, source TEXT, started_at REAL, ended_at REAL,
                message_count INTEGER DEFAULT 0, tool_call_count INTEGER DEFAULT 0,
                title TEXT, parent_session_id TEXT, model_config TEXT
            );
            CREATE TABLE messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL, role TEXT NOT NULL, content TEXT,
                tool_call_id TEXT, tool_calls TEXT, tool_name TEXT,
                timestamp REAL NOT NULL, token_count INTEGER, finish_reason TEXT,
                reasoning TEXT, reasoning_content TEXT, reasoning_details TEXT,
                codex_reasoning_items TEXT, codex_message_items TEXT,
                platform_message_id TEXT, observed INTEGER DEFAULT 0
            );
            CREATE TABLE state_meta (key TEXT PRIMARY KEY, value TEXT);
            """
        )
        # Default-less active column, as seen in the wild (#51646 PRAGMA).
        conn.execute("ALTER TABLE messages ADD COLUMN active INTEGER")
        conn.execute("ALTER TABLE messages ADD COLUMN compacted INTEGER DEFAULT 0")
        conn.execute(
            "INSERT INTO sessions (id, source, started_at) VALUES ('s1', 'discord', 1.0)"
        )
        # A row written by the pre-fix INSERT: active is NULL.
        conn.execute(
            "INSERT INTO messages (session_id, role, content, timestamp) "
            "VALUES ('s1', 'user', 'old hidden turn', 1.0)"
        )
        conn.commit()
        conn.close()

        session_db = SessionDB(db_path=db_path)
        try:
            active = session_db._conn.execute(
                "SELECT active FROM messages WHERE content = 'old hidden turn'"
            ).fetchone()[0]
            assert active == 1
            assert len(session_db.get_messages_as_conversation("s1")) == 1
        finally:
            session_db.close()

    def test_append_message_accepts_explicit_timestamp(self, db):
        db.create_session(session_id="s1", source="telegram")
        event_ts = 1777383653.0

        db.append_message("s1", role="user", content="Hello", timestamp=event_ts)

        messages = db.get_messages_as_conversation("s1")
        assert messages[0]["timestamp"] == event_ts

    def test_message_increments_session_count(self, db):
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="user", content="Hello")
        db.append_message("s1", role="assistant", content="Hi")

        session = db.get_session("s1")
        assert session["message_count"] == 2

    def test_observed_flag_round_trips_for_gateway_replay(self, db):
        db.create_session(session_id="s1", source="telegram:-100")
        db.append_message(
            "s1",
            role="user",
            content="[Alice|111]\nside chatter",
            observed=True,
        )
        db.append_message("s1", role="assistant", content="ack")

        messages = db.get_messages("s1")
        assert messages[0]["observed"] == 1
        assert messages[1]["observed"] == 0

        conversation = db.get_messages_as_conversation("s1")
        assert conversation[0]["role"] == "user"
        assert conversation[0]["content"] == "[Alice|111]\nside chatter"
        assert conversation[0]["observed"] is True
        assert isinstance(conversation[0].get("timestamp"), float)
        assert "observed" not in conversation[1]

    def test_tool_response_does_not_increment_tool_count(self, db):
        """Tool responses (role=tool) should not increment tool_call_count.

        Only assistant messages with tool_calls should count.
        """
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="tool", content="result", tool_name="web_search")

        session = db.get_session("s1")
        assert session["tool_call_count"] == 0

    def test_assistant_tool_calls_increment_by_count(self, db):
        """An assistant message with N tool_calls should increment by N."""
        db.create_session(session_id="s1", source="cli")
        tool_calls = [
            {"id": "call_1", "function": {"name": "web_search", "arguments": "{}"}},
        ]
        db.append_message("s1", role="assistant", content="", tool_calls=tool_calls)

        session = db.get_session("s1")
        assert session["tool_call_count"] == 1

    def test_tool_call_count_matches_actual_calls(self, db):
        """tool_call_count should equal the number of tool calls made, not messages."""
        db.create_session(session_id="s1", source="cli")

        # Assistant makes 2 parallel tool calls in one message
        tool_calls = [
            {"id": "call_1", "function": {"name": "ha_call_service", "arguments": "{}"}},
            {"id": "call_2", "function": {"name": "ha_call_service", "arguments": "{}"}},
        ]
        db.append_message("s1", role="assistant", content="", tool_calls=tool_calls)

        # Two tool responses come back
        db.append_message("s1", role="tool", content="ok", tool_name="ha_call_service")
        db.append_message("s1", role="tool", content="ok", tool_name="ha_call_service")

        session = db.get_session("s1")
        # Should be 2 (the actual number of tool calls), not 3
        assert session["tool_call_count"] == 2, (
            f"Expected 2 tool calls but got {session['tool_call_count']}. "
            "tool responses are double-counted and multi-call messages are under-counted"
        )

    def test_tool_calls_serialization(self, db):
        db.create_session(session_id="s1", source="cli")
        tool_calls = [{"id": "call_1", "function": {"name": "web_search", "arguments": "{}"}}]
        db.append_message("s1", role="assistant", tool_calls=tool_calls)

        messages = db.get_messages("s1")
        assert messages[0]["tool_calls"] == tool_calls

    def test_multimodal_list_content_round_trip(self, db):
        """Multimodal ``content`` (list of parts) must survive the SQLite
        round-trip.  sqlite3 cannot bind Python lists directly, so the DB
        layer JSON-encodes structured content on write and decodes on read.

        Regression test for the "Error binding parameter 3: type 'list' is
        not supported" crash users hit when pasting screenshots into the
        TUI (issue #17522).
        """
        db.create_session(session_id="s1", source="cli")
        content = [
            {"type": "text", "text": "describe this screenshot"},
            {
                "type": "image_url",
                "image_url": {"url": "data:image/png;base64,iVBORw0KG..."},
            },
        ]

        # Write must not raise
        db.append_message("s1", role="user", content=content)

        # get_messages decodes back to the original list
        msgs = db.get_messages("s1")
        assert len(msgs) == 1
        assert msgs[0]["content"] == content

        # get_messages_as_conversation decodes back to the original list
        conv = db.get_messages_as_conversation("s1")
        assert len(conv) == 1
        assert conv[0]["role"] == "user"
        assert conv[0]["content"] == content
        assert isinstance(conv[0].get("timestamp"), float)

    def test_dict_content_round_trip(self, db):
        """Dict-shaped content (e.g. provider wrappers) also round-trips."""
        db.create_session(session_id="s1", source="cli")
        content = {"parts": [{"text": "hi"}]}

        db.append_message("s1", role="user", content=content)
        msgs = db.get_messages("s1")
        assert msgs[0]["content"] == content

    def test_string_content_unchanged_by_encoding(self, db):
        """Plain strings must not be wrapped — FTS search and legacy
        consumers depend on raw-string storage for text content.
        """
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="user", content="plain text")

        # Peek at the raw column to confirm no encoding was applied
        with db._lock:
            row = db._conn.execute(
                "SELECT content FROM messages WHERE session_id = ?", ("s1",)
            ).fetchone()
        assert row["content"] == "plain text"

    def test_replace_messages_persists_tool_name(self, db):
        """`replace_messages` (used by /retry, /undo, /compress) must write
        tool_name to the DB for messages built by make_tool_result_message."""
        from agent.tool_dispatch_helpers import make_tool_result_message
        db.create_session(session_id="s1", source="cli")
        db.replace_messages(
            "s1",
            [
                {"role": "user", "content": "do something"},
                make_tool_result_message("web_search", "some results", "c1"),
            ],
        )

        msgs = db.get_messages("s1")
        tool_msg = next(m for m in msgs if m["role"] == "tool")
        assert tool_msg["tool_name"] == "web_search"

    def test_replace_messages_handles_multimodal_content(self, db):
        """`replace_messages` (used by /retry, /undo, /compress) must also
        handle list content without crashing."""
        db.create_session(session_id="s1", source="cli")
        content = [
            {"type": "text", "text": "look at this"},
            {"type": "image_url", "image_url": {"url": "data:image/png;base64,AAA"}},
        ]

        db.replace_messages(
            "s1",
            [
                {"role": "user", "content": content},
                {"role": "assistant", "content": "I see a screenshot."},
            ],
        )

        msgs = db.get_messages("s1")
        assert len(msgs) == 2
        assert msgs[0]["content"] == content
        assert msgs[1]["content"] == "I see a screenshot."

    def test_get_messages_as_conversation(self, db):
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="user", content="Hello")
        db.append_message("s1", role="assistant", content="Hi!")

        conv = db.get_messages_as_conversation("s1")
        assert len(conv) == 2
        assert conv[0]["role"] == "user"
        assert conv[0]["content"] == "Hello"
        assert isinstance(conv[0]["timestamp"], float)
        assert conv[1]["role"] == "assistant"
        assert conv[1]["content"] == "Hi!"
        assert isinstance(conv[1]["timestamp"], float)

    def test_get_messages_as_conversation_orders_by_id_not_timestamp(self, db):
        """Replay must follow AUTOINCREMENT id (insertion order), never the
        wall-clock timestamp.

        ``append_message`` stamps each row with ``time.time()``, which is not
        monotonic — on WSL2, after an NTP step, or when a VM/laptop resumes
        from sleep the clock can jump backwards mid-conversation. A later
        row then carries an *earlier* timestamp than the row before it. If
        ``get_messages_as_conversation`` ordered by ``timestamp`` it would
        sort an assistant ``tool_calls`` row after its ``tool`` response,
        orphaning the tool call and triggering an HTTP 400 on the next
        completion. Ordering by ``id`` keeps the real insertion order
        regardless of clock skew. See c03acca50.
        """
        db.create_session(session_id="s1", source="cli")

        # Simulate a clock regression across a single tool round-trip: the
        # assistant tool_calls row is inserted first but stamped LATER than
        # the tool response that follows it.
        tool_calls = [
            {"id": "call_1", "function": {"name": "web_search", "arguments": "{}"}},
        ]
        db.append_message(
            "s1", role="assistant", content="", tool_calls=tool_calls,
            timestamp=1000.0,
        )
        db.append_message(
            "s1", role="tool", content="result", tool_name="web_search",
            tool_call_id="call_1", timestamp=999.0,
        )
        db.append_message("s1", role="user", content="thanks", timestamp=998.0)

        conv = db.get_messages_as_conversation("s1")

        # Insertion order is preserved even though timestamps decrease.
        assert [m["role"] for m in conv] == ["assistant", "tool", "user"]
        # The tool response stays immediately after the assistant tool_calls
        # row — the adjacency invariant the model API enforces.
        assert conv[0]["tool_calls"][0]["id"] == "call_1"
        assert conv[1]["role"] == "tool"
        assert conv[1]["tool_call_id"] == "call_1"

    def test_platform_message_id_round_trips(self, db):
        """Platform-side message ids (yuanbao msg_id, telegram update_id, …)
        survive append → get_messages_as_conversation under the
        ``message_id`` key so platform recall flows can match by exact id."""
        db.create_session(session_id="s_pmi", source="yuanbao")
        db.append_message(
            "s_pmi",
            role="user",
            content="hi",
            platform_message_id="abc-123",
        )
        db.append_message("s_pmi", role="assistant", content="hello")

        conv = db.get_messages_as_conversation("s_pmi")
        user_msg = next(m for m in conv if m["role"] == "user")
        assistant_msg = next(m for m in conv if m["role"] == "assistant")
        assert user_msg.get("message_id") == "abc-123"
        # Assistant row had no platform id — must not gain one spuriously.
        assert "message_id" not in assistant_msg

    def test_replace_messages_preserves_platform_message_id(self, db):
        """``rewrite_transcript`` (which goes through replace_messages) must
        keep the platform_message_id round-trip working for /retry, /undo,
        /compress and yuanbao's recall rewrite path."""
        db.create_session(session_id="s_rep", source="yuanbao")
        db.replace_messages(
            "s_rep",
            [
                {"role": "user", "content": "x", "message_id": "ext-1"},
                {"role": "assistant", "content": "y"},
            ],
        )
        conv = db.get_messages_as_conversation("s_rep")
        assert next(m for m in conv if m["role"] == "user").get("message_id") == "ext-1"
        assert "message_id" not in next(m for m in conv if m["role"] == "assistant")

    def test_get_messages_as_conversation_includes_ancestor_chain(self, db):
        db.create_session("root", "tui")
        db.append_message("root", role="user", content="first prompt")
        db.append_message("root", role="assistant", content="first answer")
        db.create_session("child", "tui", parent_session_id="root")
        db.append_message("child", role="user", content="second prompt")
        db.append_message("child", role="assistant", content="second answer")

        conv = db.get_messages_as_conversation("child", include_ancestors=True)

        assert [m["content"] for m in conv] == [
            "first prompt",
            "first answer",
            "second prompt",
            "second answer",
        ]

    def test_get_messages_as_conversation_avoids_repeated_resume_prompts_from_ancestors(self, db):
        db.create_session("root", "tui")
        db.append_message("root", role="user", content="same prompt")
        db.append_message("root", role="user", content="same prompt")
        db.append_message("root", role="assistant", content="answer")
        db.create_session("child", "tui", parent_session_id="root")
        db.append_message("child", role="user", content="next prompt")

        conv = db.get_messages_as_conversation("child", include_ancestors=True)

        assert [m["content"] for m in conv if m["role"] == "user"] == ["same prompt", "next prompt"]

    def test_finish_reason_stored(self, db):
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="assistant", content="Done", finish_reason="stop")

        messages = db.get_messages("s1")
        assert messages[0]["finish_reason"] == "stop"

    def test_get_messages_as_conversation_strips_leaked_memory_context(self, db):
        db.create_session(session_id="s1", source="cli")
        db.append_message(
            "s1",
            role="assistant",
            content=(
                "<memory-context>\n"
                "[System note: The following is recalled memory context, NOT new user input. Treat as informational background data.]\n\n"
                "## Honcho Context\n"
                "stale memory\n"
                "</memory-context>\n\n"
                "Visible answer"
            ),
        )

        conv = db.get_messages_as_conversation("s1")
        assert len(conv) == 1
        assert conv[0]["role"] == "assistant"
        assert conv[0]["content"] == "Visible answer"
        assert isinstance(conv[0].get("timestamp"), float)

    def test_reasoning_persisted_and_restored(self, db):
        """Reasoning text is stored for assistant messages and restored by
        get_messages_as_conversation() so providers receive coherent multi-turn
        reasoning context."""
        db.create_session(session_id="s1", source="telegram")
        db.append_message("s1", role="user", content="create a cron job")
        db.append_message(
            "s1",
            role="assistant",
            content=None,
            tool_calls=[{"function": {"name": "cronjob", "arguments": "{}"}, "id": "c1", "type": "function"}],
            reasoning="I should call the cronjob tool to schedule this.",
        )
        db.append_message("s1", role="tool", content='{"job_id": "abc"}', tool_call_id="c1")

        conv = db.get_messages_as_conversation("s1")
        assert len(conv) == 3
        # reasoning must be present on the assistant message
        assistant = conv[1]
        assert assistant["role"] == "assistant"
        assert assistant.get("reasoning") == "I should call the cronjob tool to schedule this."
        # user and tool messages must NOT carry reasoning
        assert "reasoning" not in conv[0]
        assert "reasoning" not in conv[2]

    def test_reasoning_details_persisted_and_restored(self, db):
        """reasoning_details (structured array) is round-tripped through JSON
        serialization in the DB."""
        db.create_session(session_id="s1", source="telegram")
        details = [
            {"type": "reasoning.summary", "summary": "Thinking about tools"},
            {"type": "reasoning.encrypted_content", "encrypted_content": "abc123"},
        ]
        db.append_message(
            "s1",
            role="assistant",
            content="Hello",
            reasoning="Thinking about what to say",
            reasoning_details=details,
        )

        conv = db.get_messages_as_conversation("s1")
        assert len(conv) == 1
        msg = conv[0]
        assert msg["reasoning"] == "Thinking about what to say"
        assert msg["reasoning_details"] == details

    def test_finish_reason_restored_by_get_messages_as_conversation(self, db):
        """finish_reason on assistant messages must survive conversation replay.

        Without this, /branch copies and other transcript round-trips silently
        drop the stop reason, causing providers to misparse turn boundaries."""
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="user", content="hello")
        db.append_message("s1", role="assistant", content="hi", finish_reason="stop")

        conv = db.get_messages_as_conversation("s1")
        assert len(conv) == 2
        assert conv[1]["finish_reason"] == "stop"

    def test_tool_name_round_trip(self, db):
        """tool_name is stored on tool-role messages and restored by
        get_messages_as_conversation."""
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="tool", content="result", tool_name="web_search")

        conv = db.get_messages_as_conversation("s1")
        assert len(conv) == 1
        assert conv[0]["tool_name"] == "web_search"

    def test_search_messages(self, db):
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="user", content="How do I use Python asyncio?")
        db.append_message("s1", role="assistant", content="You can use asyncio with async/await syntax.")

        results = db.search_messages("asyncio")
        assert len(results) >= 1

    def test_search_messages_empty(self, db):
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="user", content="hello world")

        results = db.search_messages("nonexistent_xyz_123")
        assert len(results) == 0

    def test_delete_session(self, db):
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="user", content="hello")

        db.delete_session("s1")
        assert db.get_session("s1") is None
        assert db.get_messages("s1") == []

    def test_list_sessions(self, db):
        db.create_session(session_id="s1", source="cli")
        db.create_session(session_id="s2", source="telegram")

        sessions = db.list_sessions()
        ids = [s["id"] for s in sessions]
        assert "s1" in ids
        assert "s2" in ids

    def test_list_sessions_with_limit(self, db):
        for i in range(5):
            db.create_session(session_id=f"s{i}", source="cli")

        sessions = db.list_sessions(limit=3)
        assert len(sessions) == 3

    def test_append_message_with_tool_calls(self, db):
        db.create_session(session_id="s1", source="cli")
        tool_calls = [
            {"id": "c1", "type": "function", "function": {"name": "web_search", "arguments": "{}"}},
        ]
        db.append_message("s1", role="assistant", content="", tool_calls=tool_calls)

        messages = db.get_messages("s1")
        assert messages[0]["tool_calls"] == tool_calls

    def test_tool_response_message(self, db):
        db.create_session(session_id="s1", source="cli")
        db.append_message(
            "s1", role="tool", content="search results here",
            tool_call_id="c1", tool_name="web_search",
        )

        messages = db.get_messages("s1")
        assert messages[0]["role"] == "tool"
        assert messages[0]["tool_call_id"] == "c1"
        assert messages[0]["tool_name"] == "web_search"

    def test_session_count_increments(self, db):
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="user", content="a")
        db.append_message("s1", role="assistant", content="b")
        db.append_message("s1", role="user", content="c")

        session = db.get_session("s1")
        assert session["message_count"] == 3

    def test_tool_call_count_from_assistant_only(self, db):
        """tool_call_count is incremented only for assistant messages with tool_calls,
        not for tool-role response messages."""
        db.create_session(session_id="s1", source="cli")
        # Tool response should not increment
        db.append_message("s1", role="tool", content="result", tool_name="web_search")
        session = db.get_session("s1")
        assert session["tool_call_count"] == 0

    def test_finish_reason_stored(self, db):
        """finish_reason is persisted on assistant messages."""
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="assistant", content="Done", finish_reason="stop")
        messages = db.get_messages("s1")
        assert messages[0]["finish_reason"] == "stop"

    def test_finish_reason_none_by_default(self, db):
        """Messages without explicit finish_reason have None."""
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="user", content="hello")
        messages = db.get_messages("s1")
        assert messages[0]["finish_reason"] is None

    def test_empty_session(self, db):
        """A session with no messages has message_count 0."""
        db.create_session(session_id="empty", source="cli")
        session = db.get_session("empty")
        assert session["message_count"] == 0
        assert db.get_messages("empty") == []

    def test_concurrent_sessions(self, db):
        """Multiple sessions can coexist independently."""
        db.create_session(session_id="a", source="cli")
        db.create_session(session_id="b", source="telegram")
        db.append_message("a", role="user", content="from A")
        db.append_message("b", role="user", content="from B")

        assert len(db.get_messages("a")) == 1
        assert len(db.get_messages("b")) == 1
        assert db.get_messages("a")[0]["content"] == "from A"
        assert db.get_messages("b")[0]["content"] == "from B"

    def test_get_messages_as_conversation_strips_memory_context(self, db):
        """<memory-context> blocks in assistant content are stripped."""
        db.create_session(session_id="s1", source="cli")
        db.append_message(
            "s1", role="assistant",
            content="<memory-context>\nstale\n</memory-context>\n\nVisible answer",
        )
        conv = db.get_messages_as_conversation("s1")
        assert conv[0]["content"] == "Visible answer"

    def test_update_system_prompt(self, db):
        db.create_session(session_id="s1", source="cli")
        db.update_system_prompt("s1", "You are helpful.")
        assert db.get_session("s1")["system_prompt"] == "You are helpful."

    def test_get_messages_empty_session(self, db):
        db.create_session(session_id="empty", source="cli")
        assert db.get_messages("empty") == []

    def test_get_messages_as_conversation_empty(self, db):
        db.create_session(session_id="empty", source="cli")
        assert db.get_messages_as_conversation("empty") == []

    def test_session_exists(self, db):
        db.create_session(session_id="s1", source="cli")
        # get_session returns a dict or None
        assert db.get_session("s1") is not None
        assert db.get_session("nonexistent") is None

    def test_message_timestamp_ordering(self, db):
        """Messages are returned in insertion order (by id), not timestamp."""
        db.create_session(session_id="s1", source="cli")
        db.append_message("s1", role="user", content="first", timestamp=1000.0)
        db.append_message("s1", role="assistant", content="second", timestamp=999.0)

        conv = db.get_messages_as_conversation("s1")
        assert [m["content"] for m in conv] == ["first", "second"]
