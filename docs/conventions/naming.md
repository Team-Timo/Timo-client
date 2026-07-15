# 파일/폴더 네이밍

| 대상               | 컨벤션       | 예시                                           |
| ------------------ | ------------ | ---------------------------------------------- |
| 폴더               | `kebab-case` | `user-profile/`                                |
| 컴포넌트 파일      | `PascalCase` | `UserCard.tsx`                                 |
| Hook / API / Utils | `kebab-case` | `use-auth.ts`, `auth-api.ts`, `format-date.ts` |
| TanStack Query     | `kebab-case` | `use-user-query.ts`, `use-user-mutation.ts`    |

## TanStack Query 훅 네이밍

- 파일명: 조회(`useQuery`/`useSuspenseQuery`)는 `-query.ts`, 변경(`useMutation`)은 `-mutation.ts`로 끝난다.
  - 예: `use-my-profile-query.ts`, `use-create-tag-mutation.ts`
- 함수명: 파일명과 대응해 `~Query`, `~Mutation` 접미사를 붙인다.
  - 예: `useMyProfileQuery`, `useCreateTagMutation`
- 파일당 훅 1개가 기본이다. 같은 도메인의 조회/변경 훅을 한 파일에 묶지 않는다.
- 이 규칙은 react-query를 직접 감싸는 순수 조회/변경 훅에 적용한다. 조회 결과에 추가 상태·로직을 합성한 훅(예: 타이머 tick 로직이 섞인 훅)은 대상이 아니다 — 이런 훅은 역할을 드러내는 이름을 그대로 쓴다.
- 위치는 `docs/architecture/structure.md`의 `_queries/`(도메인 전용) / `queries/`(전역 공유) 규칙을 따른다.
