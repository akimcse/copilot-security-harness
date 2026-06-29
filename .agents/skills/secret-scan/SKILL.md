---
name: secret-scan
description: Use when reviewing code, a diff, or a directory for hardcoded secrets — API keys, tokens, private keys, passwords. Reports findings and never echoes the secret value.
---

# Secret Scan

1. Run the scanner: `node "$HARNESS/scan.js" <path>` and filter for `credential-leakage`. `$HARNESS` is `.agents/scripts` when in this repo, else `~/.copilot/harness` (global install). On Windows: `node "$env:USERPROFILE\.copilot\harness\scan.js" <path>`.
2. Report file:line + secret type. **Never print the full secret.** Mask all but last 4 chars.
3. For each: tell user to rotate the credential and remove from git history.
4. Verdict: BLOCK if any high-severity secret found.
