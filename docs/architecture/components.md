# 컴포넌트 계층

```text
app/(domain)/page.tsx                          ← 라우팅·레이아웃 조합
  └── app/(domain)/_components/               ← 해당 도메인에만 종속
        └── components/ 또는 @repo/timo-design-system  ← 앱 전역 또는 패키지 공유 UI
```

- **pages** (`app/.../page.tsx`): 라우팅 단위. 데이터 페칭(React Query) 및 레이아웃만 담당
- **도메인 종속** (`_components/`, `_containers/`, `_hooks/`, `_queries/`, `_types/`, `_utils/`): 해당 도메인 라우트 내부에서만 사용. `_` 접두사로 Next.js 라우팅에서 제외됨
  - `_components/` — props만 받는 순수 UI. `'use client'` 없이도 동작 가능
  - `_containers/` — `'use client'` 필수. useQuery·zustand 등 외부 상태와 결합된 클라이언트 컨테이너
  - `_hooks/` — 해당 도메인 전용 커스텀 훅 (React Query가 아닌 로컬 상태·이펙트 로직)
  - `_queries/` — 해당 도메인 전용 React Query hooks (useQuery · useMutation · queryKey 정의)
  - `_types/` — 해당 도메인 전용 타입
  - `_utils/` — 해당 도메인 전용 순수 함수
- **앱 전역** (`components/`, `containers/`, `hooks/`, `queries/`): 여러 도메인에서 공유하는 presentational 컴포넌트·클라이언트 컨테이너·훅·쿼리
- **@repo/timo-design-system**: 앱 간 공유되는 범용 UI (Button, Card 등)

## 예시 — focus 도메인

```text
app/[locale]/(main)/focus/
  _components/
    FocusTaskItem.tsx        # 순수 UI
    FocusEmptyTaskItem.tsx
  _containers/
    FocusHeaderContainer.tsx   # 'use client', useQuery·zustand 결합
    FocusSessionContainer.tsx
  _hooks/
    use-focus-session.ts       # 세션 타이머 등 로컬 로직
  _queries/
    use-focus-todo.ts          # useQuery·useMutation 정의
  _types/
    task-type.ts
  _utils/
    date.ts
  page.tsx                     # 레이아웃 조합만 (Server Component)
```

앱 전역 `queries/`는 여러 도메인에서 공유하는 쿼리(예: 유저 프로필 — `queries/use-my-profile.ts`)에 사용하고, 특정 도메인에만 쓰이는 쿼리는 `_queries/`로 해당 도메인에 코로케이션한다. 동일한 원칙이 컨테이너에도 적용되어, 여러 도메인이 공유하는 컨테이너는 앱 전역 `containers/`에 둔다.
