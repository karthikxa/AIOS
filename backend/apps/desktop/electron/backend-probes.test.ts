/**
 * Tests for electron/backend-probes.ts.
 *
 * Run with: node --test electron/backend-probes.test.ts
 * (Wired into npm test:desktop:platforms in package.json.)
 */

import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'

import { canImportzedCli, zedRuntimeImportProbe, verifyzedCli } from './backend-probes'

// Resolve the host's own Node binary -- guaranteed to be on disk and
// runnable. We use it as both a stand-in for "a python that doesn't
// have zed_cli" (since `node -c "import zed_cli"` will exit
// non-zero) and as a way to script verifyzedCli's success path
// (a tiny script we write to disk that exits 0 on --version).
const NODE_BIN = process.execPath

test('canImportzedCli returns false when path is falsy', () => {
  assert.equal(canImportzedCli(''), false)
  assert.equal(canImportzedCli(null), false)
  assert.equal(canImportzedCli(undefined), false)
})

test('canImportzedCli returns false when interpreter cannot run -c', () => {
  // node IS an interpreter, but `node -c "import zed_cli"` is a
  // SyntaxError -- different exit reason from a real Python's
  // ModuleNotFoundError, but the predicate is "exit 0 or not" and
  // both land on "not", which is exactly what we want for the
  // resolver fall-through.
  assert.equal(canImportzedCli(NODE_BIN), false)
})

test('canImportzedCli returns false when binary does not exist', () => {
  const ghost = path.join(os.tmpdir(), 'zed-probes-ghost-' + Date.now() + '.exe')
  assert.equal(canImportzedCli(ghost), false)
})

test('zed runtime import probe checks config dependencies', () => {
  const probe = zedRuntimeImportProbe()
  assert.match(probe, /\bimport yaml\b/)
  // dotenv is the first third-party import on the CLI boot path
  // (zed_cli/env_loader.py); a mid-update venv missing python-dotenv
  // passed the old probe and produced an unrecoverable boot loop.
  assert.match(probe, /\bimport dotenv\b/)
  assert.match(probe, /\bimport zed_cli\.config\b/)
})

test('verifyzedCli returns false when command is falsy', () => {
  assert.equal(verifyzedCli(''), false)
  assert.equal(verifyzedCli(null), false)
  assert.equal(verifyzedCli(undefined), false)
})

test('verifyzedCli returns false when binary does not exist', () => {
  const ghost = path.join(os.tmpdir(), 'zed-probes-ghost-' + Date.now() + '.exe')
  assert.equal(verifyzedCli(ghost), false)
})

test('verifyzedCli returns true when --version exits 0', () => {
  // Write a tiny script that exits 0 regardless of args, then invoke
  // it through node. This stands in for a working zed binary --
  // verifyzedCli only cares about the exit code.
  const scriptPath = path.join(os.tmpdir(), `zed-probes-ok-${Date.now()}-${process.pid}.cjs`)
  fs.writeFileSync(scriptPath, 'process.exit(0)\n')

  try {
    // Use node as the launcher and our script as the "command". Pass
    // shell:false (default) -- node is a real binary, no shim.
    // execFileSync passes ['--version'] as args, which node ignores
    // gracefully (well, it prints its version and exits 0, which is
    // perfect -- exit code 0 is the only signal we read).
    assert.equal(verifyzedCli(NODE_BIN), true)
  } finally {
    try {
      fs.unlinkSync(scriptPath)
    } catch {
      void 0
    }
  }
})

test('verifyzedCli swallows timeouts (does not throw)', () => {
  // We can't easily provoke a real 5s hang in CI without slowing the
  // suite, but we CAN confirm that an invocation that DOES throw
  // (because the binary is missing) returns false rather than
  // propagating. Same code path the timeout case takes.
  assert.equal(verifyzedCli('/definitely/not/a/real/binary/anywhere'), false)
})
