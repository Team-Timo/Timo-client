# Conventions

## 이슈 & PR 제목 컨벤션

### 형식

```
[TYPE] 제목을 한 문장으로 작성
```

### TYPE

작업 성격에 맞게 자유롭게 지정한다. 대문자로 작성.

```
[FEAT], [FIX], [REFACTOR], [DOCS], [CHORE], [CI], [INIT] 등
```

### 예시

```
[FEAT] 소셜 로그인 기능 구현
[FIX] 로그인 후 리다이렉트 오류 수정
[INIT] 프로젝트 초기 설정
[CI] GitHub Actions 워크플로우 추가
```

### 규칙

- `[TYPE]` 뒤에 한 칸 띄우고 제목 작성
- 제목 끝에 `.` 금지
- 제목은 명사형 또는 동사원형으로 종결

---

## 커밋 컨벤션

### 커밋 타입

| 타입       | 설명                                                   |
| ---------- | ------------------------------------------------------ |
| `feat`     | 새로운 기능 추가                                       |
| `fix`      | 버그 수정                                              |
| `refactor` | 코드 리팩토링 (기능 변경 없음)                         |
| `style`    | 코드 포맷팅, 세미콜론 누락 등 코드 자체 변경 없는 경우 |
| `name`     | 파일/폴더명 변경                                       |
| `file`     | 파일/폴더 이동                                         |
| `remove`   | 파일 삭제만 수행                                       |
| `comment`  | 주석 추가 및 변경                                      |
| `docs`     | 문서 수정                                              |
| `chore`    | 패키지 매니저 수정, .gitignore 등 기타                 |

### 커밋 형식

```
prefix: 작업내용 (#이슈번호)

ex) feat: 검색 결과 필터링 기능 추가 (#1)
```

### 커밋 규칙

1. 제목과 본문은 빈 행으로 분리
2. 본문에는 **무엇을, 왜** 변경했는지 작성 (어떻게 X)
3. 제목 첫 글자 대문자, 끝에 `.` 금지
4. 제목은 영문 기준 50자 이내
5. 마지막에 이슈 번호 추가 `(#이슈번호)`
6. 여러 변경 사항은 글머리 기호로 나열

```
feat: 소셜 로그인 기능 구현 (#5)

- 카카오 OAuth 연동
- 로그인 후 메인 페이지로 리다이렉트
- 토큰 저장 로직 추가
```

---

## 브랜치 컨벤션

### 브랜치 구조

```
main ── develop ──────────────── feat
 └── !HOTFIX    └── release/x.x.x  └── fix
                                    └── refactor
```

### 브랜치 타입

| 브랜치     | 설명                                |
| ---------- | ----------------------------------- |
| `main`     | 실제 서비스 브랜치                  |
| `develop`  | 배포 전 작업 기준 브랜치 (default)  |
| `feat`     | 기능 단위 개발                      |
| `fix`      | 버그/에러 수정                      |
| `refactor` | 코드 구조 개선                      |
| `release`  | 릴리즈 준비                         |
| `!HOTFIX`  | 서비스 중 긴급 수정 (main에서 분기) |

### 브랜치 형식

```
prefix/scope/이슈번호-작업내용
(띄어쓰기는 -로 대체, kebab-case)

scope: web / package-ui (앱·패키지 단위)

ex) feat/web/1-add-searching-result
    fix/web/8-login-error
    refactor/web/12-remove-duplication
    release/0.1.0
```

---

## 파일/폴더 네이밍

| 대상               | 컨벤션       | 예시                                           |
| ------------------ | ------------ | ---------------------------------------------- |
| 폴더               | `kebab-case` | `user-profile/`                                |
| 컴포넌트 파일      | `PascalCase` | `UserCard.tsx`                                 |
| Hook / API / Utils | `kebab-case` | `use-auth.ts`, `auth-api.ts`, `format-date.ts` |
| TanStack Query     | `kebab-case` | `use-user-query.ts`, `use-user-mutation.ts`    |

---

## 코드 스타일

### 핵심 규칙

- TypeScript `any` **절대 사용 금지** → `unknown` 후 타입 narrowing
- 절대 경로 import 사용
- ESLint 룰 임의 수정 금지

### 컴포넌트

- Arrow function으로 선언: `export const Component = () => {}`
- Named export 사용 (default export 지양)
- 자식 없으면 self-closing: `<Component />`
- 최상단 래퍼는 Fragment: `<>…</>`

### 변수/상수

- `const` → `let` 순서로 선언 (`var` 금지)
- 상수: `UPPER_SNAKE_CASE` (ex. `API_KEY`)
- Boolean: `is` 접두사 (ex. `isActive`)
- 복수 데이터: 끝에 `s` (ex. `userLists`)
- 문자열 조합: 템플릿 리터럴 사용
- 줄임말 지양, 의미 있는 명칭 사용

### 함수

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

### 타입/인터페이스

- `PascalCase` 네이밍
- `interface` 우선 사용 (`type`은 유니언·튜플·리터럴에만)
- Props 타입: 접미사 `Props` (ex. `HeaderProps`)
- type alias: 접미사 `Types`

### 접근성 (A11y)

- `div` 남발 금지 → 시맨틱 태그 사용 (`main`, `article`, `section`, `nav`, `header`, `footer`)
- 헤딩 레벨 점프 금지, 페이지당 `<h1>` 하나
- 텍스트 없는 버튼에 `aria-label` 필수
- `outline: none`으로 포커스 테두리 제거 금지
- 버튼은 `<button>` 태그 사용
- `<input>`에 `id` 부여 후 `<label for>` 연결
