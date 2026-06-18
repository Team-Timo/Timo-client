# timo-manage

## 트리거

- "스킬 추가해줘 / 수정해줘 / 없애줘"
- 새 작업 패턴이 반복되어 스킬화가 필요한 경우

## 참조

- `docs/agent/how-to-add-skill.md` → SKILL.md 작성 형식
- `docs/agent/skill-index.md` → 전체 스킬 목록
- `AGENTS.md` → 스킬 라우팅 테이블

## 워크플로우

### 스킬 추가
1. `.agents/skills/{category}/{timo-name}/SKILL.md` 생성
2. 트리거·참조·워크플로우 섹션 작성 (`how-to-add-skill.md` 형식 준수)
3. `docs/agent/skill-index.md` 에 한 줄 요약 추가
4. `AGENTS.md` 라우팅 테이블에 행 추가

### 스킬 수정
1. 해당 `SKILL.md` 수정
2. 라우팅에 영향 있으면 `AGENTS.md` 도 함께 수정

### 스킬 폐기
1. `SKILL.md` 상단에 `> ⚠️ DEPRECATED — {대체 스킬명} 사용` 표시
2. `docs/agent/skill-index.md` 에서 제거
3. `AGENTS.md` 라우팅 테이블에서 제거
