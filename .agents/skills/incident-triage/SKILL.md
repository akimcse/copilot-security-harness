---
name: incident-triage
description: Use after a guardrail block or alert to investigate. Reads logs/guardrail.log, correlates blocked actions, assesses blast radius, and recommends response — mirrors Defender investigation flow.
---

# Incident Triage

1. Read `logs/guardrail.log`; group by category and time.
2. Reconstruct what was attempted, which agent/tool, and whether it was blocked.
3. Assess blast radius: what data/systems were reachable.
4. Korean report: 타임라인 · 분류 · 영향범위 · 권고 (rotate/contain/rule-update). Verdict on residual risk.
