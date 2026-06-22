# How to Add a Skill

## 폴더 위치

```
.agents/skills/{category}/{timo-name}/SKILL.md
```

카테고리: `git` / `ui` / `quality` / `meta`

## SKILL.md 작성 형식

```markdown
# timo-{name}

## 트리거
언제 이 스킬이 실행되는지 — 사용자 발화 예시 또는 자동 선행 조건

## 참조
이 스킬이 반드시 읽어야 할 문서나 파일 목록

## 워크플로우

### Phase 1 — {단계명}
이 단계에서 에이전트가 해야 할 일

### Phase 2 — {단계명}
...
```

## 추가 후 동기화 체크리스트

- [ ] `docs/agent/skill-index.md` 에 한 줄 요약 추가
- [ ] `AGENTS.md` 라우팅 테이블에 행 추가
- [ ] `timo-manage` 스킬로 동기화 처리 가능
