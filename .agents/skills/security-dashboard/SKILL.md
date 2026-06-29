---
name: security-dashboard
description: Use to launch the guardrail SOC dashboard — a live view of every guardrail decision (BLOCK/WARN/ALLOW), threat-category breakdown, and the actual command evaluated for each event. Invoke when the user wants to see, monitor, or demo guardrail activity.
---

# Security Dashboard

## When invoked
1. Run: `npm run dashboard` (serves `dashboard/index.html` and opens the browser).
2. Defaults to http://localhost:8765 — override with `PORT=9000 npm run dashboard`.
3. The dashboard reads the live `logs/guardrail.log` written by `pre-tool-use.js`, so it reflects real decisions, not samples.

## What it shows
- KST timestamps, totals (BLOCK / WARN / ALLOW), cumulative-block trend, decision donut.
- Recent runs table — hover any row to see `severity · reason · evaluated command`.
- Threat-category bars mapped to `CONTEXT.md`.

## Generate activity
No log yet? Pipe scenarios through the hook: `npm run demo` then run a few commands through `node .agents/scripts/pre-tool-use.js`, or load any `.log` via the file picker.
