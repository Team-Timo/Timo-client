# timo-verify

## 트리거

- "PR 올리기 전에 확인해줘 / 검증해줘"
- `timo-pr` 스킬 실행 직전 자동 선행 실행

## 참조

- `docs/conventions/branch.md` → 브랜치 규칙
- `docs/conventions/commit.md` → 커밋 형식

---

## Phase 1 — 브랜치·커밋 확인

```bash
git branch --show-current          # 브랜치명 컨벤션 확인
git log develop...HEAD --oneline   # 커밋 메시지 형식 확인
```

- 브랜치명: `prefix/scope/이슈번호-작업내용` 형식인가
- 커밋 메시지: `타입(스코프): 제목 (#이슈번호)` 형식인가
- 이슈 번호가 커밋 메시지에 포함되어 있는가

---

## Phase 2 — 자동화 검증

순서대로 실행한다. 실패 시 즉시 중단하고 원인을 리포트한다.

```bash
pnpm check-types   # 타입 에러 없음
pnpm lint          # ESLint (--max-warnings 0)
pnpm build         # 빌드 성공 (TURBO_UI=false 환경에서 실행)
```

빌드 성공 시 번들 크기 이상 여부도 확인한다 (CI와 같은 기준: 200 kB gzip 경고 / 350 kB gzip 오류).

---

## Phase 3 — 수동 체크리스트

자동화로 잡히지 않는 항목을 확인한다:

- [ ] `any` 타입 미사용
- [ ] `console.log` 제거
- [ ] 불필요한 주석·TODO 정리
- [ ] 접근성 속성 누락 없음 (aria-label, label 연결)
- [ ] 개발 목적 임시 코드가 남아 있지 않음

---

## Phase 4 — 결과 리포트

**전체 통과** → "`timo-pr` 스킬로 진행합니다" 라고 알리고 바로 이어진다.

**실패 항목 있음** → 항목별로 무엇을, 어느 파일에서 수정해야 하는지 안내한다.  
수정 후 Phase 2부터 재실행한다.
