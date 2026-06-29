---
name: security-dashboard
description: Use to launch the guardrail SOC dashboard — a live view of every guardrail decision (BLOCK/WARN/ALLOW), threat-category breakdown, and the actual command evaluated for each event. Invoke when the user wants to see, monitor, or demo guardrail activity.
---

# Security Dashboard

## When invoked
1. Run exactly: `node "$env:USERPROFILE\.copilot\harness\dashboard\serve.js"` (global, PowerShell) or `npm run dashboard` (in this repo). Do NOT assume `npm`/package.json exists outside the repo.
2. Defaults to http://localhost:8765 — override with `PORT=9000`.
3. Reads the live `guardrail.log` from `logs/` (repo) or `~/.copilot/logs/` (global), so it reflects real decisions, not samples.

## What it shows
- KST timestamps, totals (BLOCK / WARN / ALLOW), cumulative-block trend, decision donut.
- Recent runs table — hover any row to see `severity · reason · evaluated command`.
- Threat-category bars mapped to `CONTEXT.md`.

## Generate activity
No log yet? Run a few commands through the hook (`node "$HARNESS/pre-tool-use.js"`), or load any `.log` via the file picker.
