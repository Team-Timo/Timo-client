# timo-component

## 트리거

- "컴포넌트 만들어줘 / 구현해줘"
- UI 단위 작업 요청 (버튼, 카드, 모달 등 독립적인 UI 조각)

## 참조

- `docs/conventions.md` → 컴포넌트·타입·A11y 규칙
- `docs/architecture.md` → 컴포넌트 계층

## 워크플로우

### Phase 1 — 범위 파악
- 앱 전용인지, 여러 앱에서 공유할지 판단
- UI 컴포넌트(표현만)인지 feature 컴포넌트(로직 포함)인지 구분
- 파일 위치 결정:
  - 공유 범용 → `packages/ui/src/`
  - 앱 전용 UI → `apps/timo-web/components/ui/`
  - 도메인 로직 포함 → `apps/timo-web/components/feature/`

### Phase 2 — Props 설계
- `interface XxxProps` 로 props 타입 정의
- 필수/선택 props 구분, `any` 금지
- 콜백 props는 반환 타입까지 명시 (`onSelect: (id: string) => void`)

### Phase 3 — 마크업 구조 설계
- 시맨틱 태그 우선, 의미 없는 div 래퍼 지양
- 인터랙티브 요소는 올바른 태그 사용 (버튼 → `<button>`)
- 텍스트 없는 버튼·아이콘에 `aria-label` 부여
- Fragment `<>` 를 최상단 래퍼로 사용

### Phase 4 — 구현 및 스타일링
- Arrow function + Named export
- Tailwind 클래스로만 스타일링
- 이벤트 핸들러는 `handle` 접두사

### Phase 5 — 자가 검토
생성 후 아래를 확인한다:
- [ ] `any` 미사용
- [ ] 절대 경로 import
- [ ] 접근성 속성 누락 없음
- [ ] ESLint 오류 없음
