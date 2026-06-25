# 코드 스타일

## 핵심 규칙

- TypeScript `any` **절대 사용 금지** → `unknown` 후 타입 narrowing
- 절대 경로 import 사용
- ESLint 룰 임의 수정 금지

## 컴포넌트

- Arrow function으로 선언: `export const Component = () => {}`
- Named export 사용 (default export 지양)
- 자식 없으면 self-closing: `<Component />`
- 최상단 래퍼는 Fragment: `<>…</>`

## 변수/상수

- `const` → `let` 순서로 선언 (`var` 금지)
- 상수: `UPPER_SNAKE_CASE` (ex. `API_KEY`)
- Boolean: `is` 접두사 (ex. `isActive`)
- 복수 데이터: 끝에 `s` (ex. `userLists`)
- 문자열 조합: 템플릿 리터럴 사용
- 줄임말 지양, 의미 있는 명칭 사용

## 함수

동사+명사 형식, 화살표 함수 사용:

| 접두사          | 용도                                        |
| --------------- | ------------------------------------------- |
| `get`           | 값을 가져와 반환                            |
| `create`        | 새로운 값/변수 생성                         |
| `check`         | 내부 로직 확인                              |
| `convert`       | 특정 형태로 변환                            |
| `add` / `minus` | 더하거나 빼는 연산                          |
| `filter`        | 배열 필터링 후 반환                         |
| `handle`        | 이벤트 핸들러 전용 (ex. `handleResetClick`) |
| `has`           | boolean 반환 유틸 (ex. `hasEmail`)          |

- `handle` 접두사는 이벤트 핸들러에만 사용
- `key` prop: 정적 리스트 → `index` 허용 / 동적 리스트 → 반드시 고유 `id`

## 타입/인터페이스

- `PascalCase` 네이밍
- `interface` 우선 사용 (`type`은 유니언·튜플·리터럴에만)
- Props 타입: 접미사 `Props` (ex. `HeaderProps`)
- type alias: 접미사 `Types`

## 접근성 (A11y)

- `div` 남발 금지 → 시맨틱 태그 사용 (`main`, `article`, `section`, `nav`, `header`, `footer`)
- 헤딩 레벨 점프 금지, 페이지당 `<h1>` 하나
- 텍스트 없는 버튼에 `aria-label` 필수
- `outline: none`으로 포커스 테두리 제거 금지
- 버튼은 `<button>` 태그 사용
- `<input>`에 `id` 부여 후 `<label htmlFor>` 연결 (JSX 속성명)
