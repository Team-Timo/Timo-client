# timo-manage

## 트리거

- "스킬 추가해줘 / 수정해줘 / 없애줘"
- 새 작업 패턴이 반복되어 스킬화가 필요한 경우

## 참조

- `docs/agent/how-to-add-skill.md` → SKILL.md 작성 형식
- `docs/agent/skill-index.md` → 전체 스킬 목록
- `AGENTS.md` → 스킬 라우팅 테이블

## 워크플로우

### Phase 1 — 작업 유형 파악
사용자 요청에서 작업 유형(추가 / 수정 / 폐기)을 판단하고, 대상 스킬명과 카테고리를 확인한다.

### Phase 2 — SKILL.md 작업

**추가**
1. `.agents/skills/{category}/{timo-name}/SKILL.md` 생성
2. 트리거·참조·워크플로우 섹션 작성 (`how-to-add-skill.md` 형식 준수)

**수정**
1. 해당 `SKILL.md` 를 읽고 변경 내용을 반영한다

**폐기**
1. `SKILL.md` 상단에 `> ⚠️ DEPRECATED — {대체 스킬명} 사용` 표시

### Phase 3 — 연관 문서 반영

| 작업 | `docs/agent/skill-index.md` | `AGENTS.md` |
|------|----------------------------|-------------|
| 추가 | 한 줄 요약 추가 | 트리거 → 파일 행 추가 |
| 수정 | 라우팅 변경 시 갱신 | 라우팅 변경 시 갱신 |
| 폐기 | 항목 제거 | 트리거 행 제거 |

### Phase 4 — 완료 확인
변경된 파일 목록을 요약하고 `timo-commit` 스킬로 커밋할지 사용자에게 확인한다.
