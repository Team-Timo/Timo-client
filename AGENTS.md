# Timo Agent Guide

Claude Code / Codex 공통 진입점입니다.
작업 유형에 맞는 스킬을 확인하고 시작하세요.
규칙 원문은 `docs/`에 있습니다 — 이 파일에 직접 넣지 마세요.

---

## 저장소

- Product: Timo 클라이언트
- 도구: Claude Code, Codex
- 스택: Next.js 16 (App Router) · TypeScript · Tailwind CSS · Zustand · TanStack React Query · pnpm · Turborepo

---

## 라우팅

### Git
| 작업 | 스킬 |
|---|---|
| 커밋 분해 & 메시지 | `.agents/skills/git/timo-commit/SKILL.md` |
| PR 작성 | `.agents/skills/git/timo-pr/SKILL.md` |
| 이슈 작성 | `.agents/skills/git/timo-issue/SKILL.md` |

### UI
| 작업 | 스킬 |
|---|---|
| 컴포넌트 생성 | `.agents/skills/ui/timo-component/SKILL.md` |
| 페이지 기능 개발 | `.agents/skills/ui/timo-page/SKILL.md` |
| 스토리북 생성 | `.agents/skills/ui/timo-storybook/SKILL.md` |
| 피그마 → 컴포넌트 | `.agents/skills/ui/timo-figma/SKILL.md` |

### Quality
| 작업 | 스킬 |
|---|---|
| 코드 리뷰 | `.agents/skills/quality/timo-review/SKILL.md` |
| 리팩터링 판단 | `.agents/skills/quality/timo-refactor/SKILL.md` |
| PR 전 검증 | `.agents/skills/quality/timo-verify/SKILL.md` |

### Meta
| 작업 | 스킬 |
|---|---|
| 복잡한 피처 전체 실행 | `.agents/skills/meta/timo-orchestrate/SKILL.md` |
| 스킬 추가 / 수정 | `.agents/skills/meta/timo-manage/SKILL.md` |

---

## 문서 위치

| 내용 | 경로 |
|---|---|
| Git·코드 스타일·폴더 구조 규칙 | `docs/conventions.md` |
| 기술 스택·컴포넌트 계층·상태 전략 | `docs/architecture.md` |
| 디자인 토큰·피그마 MCP 연동 | `docs/design.md` |
