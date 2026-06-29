# CONTEXT — Security Vocabulary

Shared language for all skills. Mirrors Microsoft Defender real-time agent protection.

## Threat classes
- **credential-leakage** — keys, tokens, private keys, passwords exposed in code/output.
- **untrusted-routing** — exfil/data sent to raw IPs or untrusted hosts.
- **destructive-action** — irreversible filesystem/disk operations.
- **tool-misuse** — force-push to main, clearing history, internal-only tool abuse.
- **obfuscated-content** — base64/eval execution chains hiding intent.

## Severity
- **high** ⇒ BLOCK. **medium/low** ⇒ NEEDS REVIEW.

## Verdicts
PASS · NEEDS REVIEW · BLOCK.

## Decisions (ADR)
- Detection rules live in `.agents/scripts/ruleset.json` (data, not code) so security teams extend without engineering.
- Guardrail fails secure: high-severity blocks; engine is secret-less, logs to `logs/`.
