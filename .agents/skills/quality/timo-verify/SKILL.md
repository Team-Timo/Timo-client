# timo-verify

## 트리거

- "PR 올리기 전에 확인해줘 / 검증해줘"
- `timo-pr` 스킬 실행 직전에 자동 선행 실행

## 참조

- `.github/PULL_REQUEST_TEPLATE.md` → Test Checklist 섹션
- `docs/conventions.md` → 브랜치·커밋 규칙

## 워크플로우

### Phase 1 — 자동화 검증

순서대로 실행하고 실패 시 즉시 중단하여 원인을 리포트한다.

```bash
pnpm check-types   # 타입 에러 없음
pnpm lint          # ESLint (--max-warnings 0)
pnpm build         # 빌드 성공
```

### Phase 2 — 수동 체크리스트

자동화로 잡히지 않는 항목을 확인한다:

- [ ] `any` 타입 미사용
- [ ] `console.log` 제거
- [ ] 커밋 메시지에 이슈 번호 포함
- [ ] 브랜치명 컨벤션 준수 (`prefix/scope/이슈번호-작업내용`)
- [ ] 접근성 속성 누락 없음

### Phase 3 — 결과 리포트

전체 통과 → `timo-pr` 스킬로 진행한다.  
실패 항목 있으면 수정 후 재실행을 요청한다.
