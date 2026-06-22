# timo-figma

> 피그마 MCP 연동 후 활성화되는 스킬입니다.

## 트리거

- "피그마에서 컴포넌트 뽑아줘"
- 피그마 링크 또는 노드 ID를 제공받은 경우

## 참조

- `docs/design.md` → 디자인 토큰, 피그마 MCP 연동 방식
- `docs/conventions.md` → 컴포넌트 규칙

## 워크플로우

### Phase 1 — 피그마 노드 읽기
피그마 MCP를 통해 대상 프레임/컴포넌트 스펙을 읽는다.
- 크기, 패딩, 색상, 타이포그래피, 간격

### Phase 2 — 디자인 토큰 매핑
읽어온 값을 `docs/design.md` 의 토큰에 매핑한다.  
토큰에 없는 값이 있으면 사용자에게 토큰 추가 여부 확인한다.

### Phase 3 — 컴포넌트 생성
`timo-component` 워크플로우를 따라 컴포넌트 생성.  
피그마 스펙을 Tailwind 클래스로 변환한다.

### Phase 4 — Story 생성
`timo-storybook` 워크플로우를 따라 Story 파일을 함께 생성한다.
