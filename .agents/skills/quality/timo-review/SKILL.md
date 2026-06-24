# timo-review

## 트리거

- "리뷰해줘 / 코드 리뷰"
- PR 올리기 전 또는 구현 완료 후 검토 요청

## 참조

- `docs/conventions/code-style.md` → 코드 스타일 규칙
- `docs/architecture/components.md` → 컴포넌트 계층
- `docs/architecture/structure.md` → 모듈 경계

---

## Phase 1 — 변경 범위 파악

```bash
git diff develop...HEAD --name-only
git diff develop...HEAD --stat
```

파일 분류 후 각 카테고리별로 집중 체크한다:
- `app/` 하위 → 라우트·컴포넌트 계층
- `stores/`, `queries/` → 상태 관리 패턴
- `packages/timo-design-system/` → 모듈 경계

---

## Phase 2 — 타입 안전성

- `any` 사용 여부
- Props 타입 누락 여부 (`interface XxxProps` 확인)
- 외부 API 응답을 `unknown` 없이 직접 사용하는 경우
- exported 함수에 반환 타입 누락

---

## Phase 3 — 스택별 패턴 체크

### Next.js / 컴포넌트 계층
- `page.tsx`에 비즈니스 로직이 들어가 있는가
- `_components/`에 `'use client'`, useQuery, zustand가 섞인 컴포넌트가 있는가 → `_containers/`로 분리 대상
- Server Component에서 클라이언트 전용 API 호출 여부

### React Query
- 서버 데이터를 Zustand store에 복사하는 패턴 (`set(state => { state.users = data })` 등)
- 동일한 queryKey를 서버/클라이언트에서 다르게 정의하는 경우
- `useQuery` 결과를 useState에 재저장하는 패턴

### Zustand
- 파생 값을 store에 저장 (selector로 계산해야 할 값)
- store 내부에서 직접 fetch 호출

### 모듈 경계
- `packages/timo-design-system` → `apps/timo-web` import 여부 (역방향 참조 금지)
- 도메인 간 `_components` 직접 import 여부

---

## Phase 4 — 코드 스타일

- Arrow function + Named export 준수 여부
- 이벤트 핸들러에 `handle` 접두사 외 다른 네이밍
- 함수 50줄 초과 / 파일 800줄 초과
- 절대 경로 import 미사용

---

## Phase 5 — 접근성

- 시맨틱 태그 대신 `div`만 쓰는 구조
- 텍스트 없는 버튼에 `aria-label` 누락
- `<input>` ↔ `<label>` 연결 누락
- `outline: none` 포커스 제거

---

## Phase 6 — 결과 출력

```
## 리뷰 결과

### BLOCK (머지 전 수정 필수)
- ...

### SUGGEST (권장 개선)
- ...

### NOTE (참고)
- ...
```

BLOCK 이슈가 있으면 `timo-refactor`로 연결할지 확인한다.  
BLOCK 없으면 `timo-verify` → `timo-commit`으로 진행 가능하다고 알린다.
