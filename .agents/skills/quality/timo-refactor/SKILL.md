# timo-refactor

## 트리거

- "리팩터링 필요해? / 이 코드 개선해줘"
- `timo-review` 결과에서 BLOCK 이슈가 구조 문제일 때
- 기능 추가 없이 코드 구조 개선이 목적인 경우

## 참조

- `docs/conventions/code-style.md` → 함수·파일 크기 기준
- `docs/architecture/components.md` → 컴포넌트 계층
- `docs/architecture/structure.md` → 모듈 경계

---

## Phase 1 — 필요성 판단

아래 중 하나라도 해당하면 리팩터링을 권고한다:

| 기준 | 판단 방법 |
|------|----------|
| 함수 50줄 초과 | 파일 직접 확인 |
| 파일 800줄 초과 | `wc -l` 또는 에디터 라인 수 확인 |
| 동일 로직 3곳 이상 중복 | `git grep` 으로 패턴 검색 |
| `_components`에 클라이언트 로직 혼재 | `'use client'`, useQuery, zustand 임포트 여부 |
| 컴포넌트 계층 위반 | `packages/timo-design-system` → `apps` 참조 여부 |

---

## Phase 2 — 범위 정의

리팩터링 전, 아래를 명확히 한다:
- 기능 동작은 변경하지 않는다
- 테스트가 있다면 리팩터링 후에도 통과해야 한다
- 커밋 단위: 리팩터링 커밋에 기능 변경을 섞지 않는다

---

## Phase 3 — 추출 패턴 선택

### 컴포넌트 분리

`_components` → `_containers` 분리가 필요한 경우:
```
Before: _components/LoginForm.tsx (useQuery, zustand 혼재)
After:  _components/LoginForm.tsx (props만 받는 순수 UI)
        _containers/LoginFormContainer.tsx ('use client', useQuery 담당)
```

### 쿼리 코로케이션

여러 도메인에서 쓰이지 않는 쿼리는 도메인 내부로:
```
Before: queries/useLoginMutation.ts
After:  app/auth/_queries/useLoginMutation.ts
```

### 훅 추출

컴포넌트 내 로직이 복잡할 때:
```
Before: 컴포넌트 안에 useEffect, 상태, 파생 계산이 뒤섞임
After:  _hooks/useLoginForm.ts 로 분리, 컴포넌트는 JSX만 반환
```

### 공통 유틸 추출

같은 변환·포맷 로직이 3곳 이상이면:
```
Before: 각 컴포넌트 안에 동일한 날짜 포맷 함수
After:  lib/format.ts 로 추출 후 임포트
```

---

## Phase 4 — 실행 계획 제안

변경할 파일, 추출할 단위, 커밋 분리 계획을 제안하고 승인 후 실행한다.

```
## 리팩터링 계획

대상: apps/timo-web/app/auth/_components/LoginForm.tsx
이유: 'use client' + useQuery + 순수 UI가 혼재 (75줄)

변경:
1. LoginForm.tsx → props 전용 순수 컴포넌트로 축소
2. LoginFormContainer.tsx 신규 생성 (클라이언트 로직 이전)

커밋 단위:
- refactor(web): LoginForm 컴포넌트·컨테이너 분리 (#이슈번호)

진행할까요?
```

---

## Phase 5 — 안전 체크

실행 후:
- [ ] 화면 동작이 리팩터링 전과 동일한가
- [ ] `pnpm check-types` 통과
- [ ] `pnpm lint` 통과
- [ ] 의도치 않게 변경된 파일이 없는가 (`git diff`)
