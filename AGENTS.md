# Agent Operating Instructions — Security Harness for GitHub Copilot

This repository is the **Security Harness for GitHub Copilot** — a guardrail harness for AI coding agents. Treat these documents as active operating context, not passive reference.

## Required context loading
Before reviewing, implementing, or running shell/tool actions:
1. `README.md` — harness intent and skill map.
2. `CONTEXT.md` — canonical security vocabulary (threat classes, severities, verdicts).
3. `.agents/scripts/ruleset.json` — active detection rules.

## Operating rules
- **Run the guardrail before risky actions.** Any shell/tool action passes through `.agents/scripts/pre-tool-use.js` (exit 2 = block). Do not work around a block.
- **Human is the gate.** Auto blocks/scans are *proposals*. High-severity findings require human confirmation before proceeding.
- **Pick the right skill** via `using-security-harness`: guardrail-review, secret-scan, threat-model, secure-code-review, incident-triage.
- **Never echo secrets.** Mask values; tell user to rotate.
- **Extend, don't hardcode.** New threat patterns go in `ruleset.json`, not in code.

## Threat classes (Microsoft Defender aligned)
credential-leakage · untrusted-routing · destructive-action · tool-misuse · obfuscated-content. Every report maps findings to a class and ends with PASS / NEEDS REVIEW / BLOCK.
