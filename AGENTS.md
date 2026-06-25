# Timo Agent Guide

Claude Code / Codex 공통 진입점입니다.
규칙 원문은 `docs/`에 있습니다 — 이 파일에 직접 넣지 마세요.

---

## 절대 규칙

작업 요청을 받으면 아래 순서를 반드시 지킨다:

1. 아래 트리거 표에서 요청에 해당하는 스킬을 찾는다.
2. **해당 SKILL.md 파일을 Read 도구로 먼저 읽는다. 읽기 전에 어떤 작업도 시작하지 않는다.**
3. 스킬 파일의 Phase 순서를 그대로 따른다.
4. 스킬 파일에 이슈 번호가 필요하면 현재 브랜치명에서 추출한다 (`prefix/scope/이슈번호-설명` 형식).
5. 트리거가 두 스킬 이상에 걸리면 `timo-orchestrate`로 위임한다.

---

## 저장소

- Product: Timo 클라이언트
- 도구: Claude Code, Codex
- 스택: Next.js 16 (App Router) · TypeScript · Tailwind CSS · Zustand · TanStack React Query · pnpm · Turborepo

---

## 트리거 → 스킬 매핑

### Git

| 트리거 | Read 할 파일 |
|--------|-------------|
| 커밋, commit, 커밋해줘, 커밋 만들어줘 | `.agents/skills/git/timo-commit/SKILL.md` |
| PR, 풀리퀘, PR 만들어줘 | `.agents/skills/git/timo-pr/SKILL.md` |
| 이슈, issue, 이슈 만들어줘 | `.agents/skills/git/timo-issue/SKILL.md` |

### UI

| 트리거 | Read 할 파일 |
|--------|-------------|
| 컴포넌트 만들어줘, 컴포넌트 생성 | `.agents/skills/ui/timo-component/SKILL.md` |
| 페이지 만들어줘, 페이지 개발 | `.agents/skills/ui/timo-page/SKILL.md` |
| 스토리북, storybook | `.agents/skills/ui/timo-storybook/SKILL.md` |
| 피그마, figma | `.agents/skills/ui/timo-figma/SKILL.md` |

### Quality

| 트리거 | Read 할 파일 |
|--------|-------------|
| 코드 리뷰, 리뷰해줘 | `.agents/skills/quality/timo-review/SKILL.md` |
| 리팩터링, 리팩토링 | `.agents/skills/quality/timo-refactor/SKILL.md` |
| PR 전 검증, 검증해줘 | `.agents/skills/quality/timo-verify/SKILL.md` |

### Meta

| 트리거 | Read 할 파일 |
|--------|-------------|
| 피처 전체 실행, orchestrate | `.agents/skills/meta/timo-orchestrate/SKILL.md` |
| 스킬 추가, 스킬 수정 | `.agents/skills/meta/timo-manage/SKILL.md` |

---

## 문서 위치

| 내용 | 경로 |
|---|---|
| 커밋·브랜치·이슈·코드 스타일·네이밍 컨벤션 | `docs/conventions/` |
| 기술 스택·컴포넌트 계층·상태 전략·스캐폴딩 | `docs/architecture/` |
| 디자인 토큰·피그마 MCP 연동 | `docs/design/` |
