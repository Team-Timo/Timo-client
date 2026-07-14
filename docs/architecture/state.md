# 상태 관리 전략

| 상태 종류                 | 도구                   | 위치                |
| ------------------------- | ---------------------- | ------------------- |
| 서버 데이터 (API)         | TanStack React Query   | `queries/`          |
| 클라이언트 전역           | Zustand                | `stores/`           |
| URL / 필터 / 페이지네이션 | Next.js searchParams   | `app/` 라우트       |
| 폼                        | React Hook Form (로컬) | 각 feature 컴포넌트 |
| 컴포넌트 로컬             | useState / useReducer  | 컴포넌트 내부       |

## 규칙

- 서버 상태를 Zustand에 복사하지 않는다 — React Query가 단일 출처
- 파생 값은 store에 저장하지 않고 selector로 계산
- URL로 공유 가능한 상태(필터, 탭)는 searchParams에 먼저 고려
