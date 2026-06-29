---
name: threat-model
description: Use when designing a new feature, agent, or tool integration. Produces a lightweight STRIDE-style threat model mapped to Microsoft Defender agent threat classes, with mitigations.
---

# Threat Model

1. Identify assets, entry points, trust boundaries (user input, tool calls, external APIs).
2. For each, enumerate threats by category: credential-leakage, untrusted-routing, destructive-action, tool-misuse, obfuscated-content.
3. Rate likelihood/impact; propose mitigation (which guardrail rule, which control).
4. Output a Korean table: 자산 · 위협 · 분류 · 완화. Record decisions in `CONTEXT.md`/ADR.
