---
name: guardrail-review
description: Use before running a shell command or tool invocation to check whether it is a risky action (destructive, exfil, credential leak, misuse, obfuscation). Evaluates against the guardrail ruleset and blocks high-severity actions.
---

# Guardrail Review

## When invoked
1. Take the candidate command/tool input.
2. Run: `echo '<command>' | node .agents/scripts/pre-tool-use.js` (exit 2 = block).
   Or scan text/files: `node .agents/scripts/scan.js <path>`.
3. Map hits to categories; cite `CONTEXT.md`.
4. Verdict: PASS / NEEDS REVIEW / BLOCK. High ⇒ BLOCK, never auto-fix secrets — rotate.

## Wiring as a real hook
Point your agent's pre-tool-use hook at `.agents/scripts/pre-tool-use.js`. exit 0 = allow, exit 2 = block. All decisions append to `logs/guardrail.log`.

Extend rules in `.agents/scripts/ruleset.json` — tenant patterns need no code.
