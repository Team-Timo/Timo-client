# timo-storybook

## 트리거

- "스토리 만들어줘 / 스토리북 추가해줘"
- 컴포넌트 구현 완료 후 문서화 요청

## 참조

- 대상 컴포넌트의 `XxxProps` 인터페이스
- `docs/conventions.md` → 파일 네이밍

## 워크플로우

### Phase 1 — 컴포넌트 분석

대상 컴포넌트를 읽어 props 인터페이스와 사용 패턴 파악한다.

### Phase 2 — Story 구성 계획

- `Default`: 기본 상태
- 주요 props 변형마다 Story 추가 (`Primary`, `Disabled`, `WithIcon` 등)
- 인터랙티브 요소가 있으면 `play` 함수로 동작 시나리오 추가

### Phase 3 — Story 파일 생성

- 위치: 컴포넌트와 동일 폴더 (`Xxx.stories.tsx`)
- `argTypes` 로 Controls 패널 연동
- a11y addon 설정 포함

### Phase 4 — 자가 검토

- [ ] 필수 props가 Controls에 노출됨
- [ ] 빈 상태·에러 상태 등 엣지케이스 Story 포함
- [ ] 컴포넌트 description 작성
