# timo-review

## 트리거

- "리뷰해줘 / 코드 리뷰"
- PR 올리기 전 또는 구현 완료 후 검토 요청

## 참조

- `docs/conventions.md` → 코드 스타일 규칙
- `docs/architecture.md` → 컴포넌트 계층, 모듈 경계

## 워크플로우

### Phase 1 — 변경 파일 파악
`git diff develop...HEAD --name-only` 로 변경된 파일 목록 확인한다.

### Phase 2 — 타입 안전성
- `any` 사용 여부
- Props 타입 누락 여부
- 외부 데이터를 `unknown` 없이 직접 사용 여부
- exported 함수 반환 타입 명시 여부

### Phase 3 — 코드 스타일
- Arrow function + Named export 준수
- 이벤트 핸들러 `handle` 접두사
- 함수 50줄 이하, 파일 800줄 이하
- 절대 경로 import

### Phase 4 — 접근성
- 시맨틱 태그 사용 여부
- 텍스트 없는 버튼에 `aria-label` 여부
- `<input>` ↔ `<label>` 연결 여부
- 포커스 스타일 제거 여부

### Phase 5 — 아키텍처
- 컴포넌트 계층 위반 여부
- 서버 상태를 Zustand에 복사하는 패턴 여부
- `packages/ui` → `apps` 참조 등 모듈 경계 위반 여부

### Phase 6 — 결과 출력

| 레벨 | 의미 |
|------|------|
| **BLOCK** | 머지 전 반드시 수정 |
| **SUGGEST** | 권장 개선 사항 |
| **NOTE** | 참고용 |
