# Security Harness for GitHub Copilot — 보안 아우터 하네스

> AI 코딩 에이전트(GitHub Copilot)를 **보안팀의 방법론으로 운영**하는 하네스 에셋. 위험행위 탐지·차단·조사 + 보안 워크플로 스킬 모음. (Track 02 · 직접 개발)

유명 OSS 하네스(Superpowers)가 *개발 생산성* 패턴을 이식했다면, 이 하네스는 **보안 거버넌스** 도메인을 GHCP `.agents/skills/` 포맷으로 직접 설계했다. 위협 분류는 **Microsoft Defender 실시간 에이전트 보호**와 정렬.

## 설치된 스킬 (`./.agents/skills`)
| 스킬 | 역할 |
|------|------|
| `using-security-harness` | 진입점 — 작업→스킬 라우팅 |
| `guardrail-review` | 셸/도구 호출 위험 판단·차단 (hook 연동) |
| `secret-scan` | 키·토큰 하드코딩 탐지 (값 비노출) |
| `threat-model` | STRIDE+Defender 분류 위협 모델 |
| `secure-code-review` | PR 취약점 보안 리뷰(한국어) |
| `incident-triage` | 차단/알림 후 원인·blast radius 조사 |

## 핵심: hook으로 실제 차단
`.agents/scripts/pre-tool-use.js` — exit 0 허용 / exit 2 차단, 감사로그. 룰은 `.agents/scripts/ruleset.json`(코드 X) 으로 보안팀이 확장.

## 사용
```bash
echo '{"command":"rm -rf /"}' | node .agents/scripts/pre-tool-use.js  # exit 2 BLOCK
node .agents/scripts/scan.js .                                        # 디렉터리 스캔
node demo/test.js                                                     # 6/6
```

## 임팩트·확장성
secret-less, JSON 룰셋, 모든 결정 감사로그. 어떤 에이전트든 hook 1줄 연결. 위협 분류가 Defender와 정렬돼 SOC 워크플로로 자연 확장. MIT.
