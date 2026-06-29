---
name: guardrail-review
description: Use before running a shell command or tool invocation to check whether it is a risky action (destructive, exfil, credential leak, misuse, obfuscation). Evaluates against the guardrail ruleset and blocks high-severity actions.
---

# Guardrail Review

## When invoked
`$HARNESS` = `.agents/scripts` in this repo, else `~/.copilot/harness` (global). Windows global: `$env:USERPROFILE\.copilot\harness`.
1. Take the candidate command/tool input.
2. Run: `echo '<command>' | node "$HARNESS/pre-tool-use.js"` (exit 2 = block).
   Or scan text/files: `node "$HARNESS/scan.js" <path>`.
3. Map hits to categories; cite `CONTEXT.md`.
4. Verdict: PASS / NEEDS REVIEW / BLOCK. High ⇒ BLOCK, never auto-fix secrets — rotate.

## Wiring as a real hook
Point your agent's pre-tool-use hook at `$HARNESS/pre-tool-use.js`. exit 0 = allow, exit 2 = block. All decisions append to `logs/guardrail.log`.

Extend rules in `$HARNESS/ruleset.json` — tenant patterns need no code.
