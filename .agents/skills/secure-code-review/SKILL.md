---
name: secure-code-review
description: Use to review a PR or code change for security vulnerabilities — injection, authz, unsafe deserialization, SSRF, secrets. Korean report for security teams with severity and fix.
---

# Secure Code Review

1. Read the diff. Run `secret-scan` first.
2. Check: input validation, authz, SSRF/exfil, deserialization, command/SQL injection, dependency risk.
3. Report 발견(High/Med/Low) · 파일:라인 · 권고. Verdict: PASS / NEEDS REVIEW / BLOCK.
4. Only flag real, evidenced issues. No style nits.
