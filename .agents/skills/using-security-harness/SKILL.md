---
name: using-security-harness
description: Entry point/router for the Security Harness. Use at the start of any security task to pick the right skill — secret scanning, guardrail review of risky actions, threat modeling, secure code review, or incident triage. Maps each task to a Microsoft Defender real-time agent protection threat class.
---

# Using the Security Harness

Router for security work on AI-generated code and agent actions. Pick the skill, then run it. All skills report in Korean for security teams and cite `CONTEXT.md` for shared vocabulary.

## Pick a skill
| 상황 | 스킬 |
|------|------|
| 셸 명령/도구 호출이 위험한지 판단·차단 | `/guardrail-review` |
| 코드·diff에 비밀(키·토큰) 있는지 | `/secret-scan` |
| 새 기능·에이전트 설계의 위협 분석 | `/threat-model` |
| PR 보안 리뷰 (취약점·로직) | `/secure-code-review` |
| 차단/알림 발생 후 원인·범위 조사 | `/incident-triage` |

## Threat classes (Defender 정렬)
credential-leakage · untrusted-routing · destructive-action · tool-misuse · obfuscated-content. 모든 스킬 결과는 이 분류로 매핑하고 PASS / NEEDS REVIEW / BLOCK 판정으로 마무리한다.

## Rule
사람이 게이트의 주인. 자동 차단·스캔은 *제안*이며, High 발견은 사람 확인 후 진행. 룰은 `.agents/scripts/ruleset.json`에서 코드 없이 확장.
