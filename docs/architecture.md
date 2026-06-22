# Architecture

## 기술 스택

| 분류 | 도구 | 비고 |
|------|------|------|
| Monorepo | Turborepo + pnpm workspace | 빌드 캐싱, 파이프라인 최적화 |
| Framework | Next.js 16 (App Router) | SSR/SSG, Server Components |
| Language | TypeScript 5.9 | strict 모드 |
| Styling | Tailwind CSS | 유틸리티 클래스 기반 |
| State — 전역 | Zustand | 클라이언트 전역 상태 |
| State — 서버 | TanStack React Query | API 캐싱, 동기화 |
| API Client | swagger-typescript-api | OpenAPI 스펙 → 타입 자동 생성 |
| Monitoring | Sentry | 런타임 에러 및 성능 추적 |
| Formatter | Prettier | 팀 컨벤션 자동 적용 |
| Linter | ESLint 9 (flat config) | `--max-warnings 0` |
| Git Hooks | Husky | 커밋 전 lint/format |
| Code Review | CodeRabbit | PR마다 AI 리뷰 |
| Assets | SVG sprite | SVG → React 컴포넌트 |
| Deployment | Vercel | Turborepo Remote Cache 연동 |

---

## 모노레포 구조

```
timo-client/
├── apps/
│   └── timo-web/          # Next.js 앱 (port 3000)
│       ├── app/           # App Router 페이지·레이아웃
│       │   └── (domain)/  # 도메인 라우트 (예: auth, onboarding)
│       │       ├── _components/  # 해당 도메인 전용 컴포넌트
│       │       ├── _hooks/       # 해당 도메인 전용 커스텀 훅
│       │       ├── _utils/       # 해당 도메인 전용 유틸
│       │       └── page.tsx
│       ├── components/    # 앱 전역 공유 컴포넌트
│       ├── hooks/         # 앱 전역 공유 커스텀 훅
│       ├── stores/        # Zustand 스토어
│       ├── queries/       # React Query 훅
│       └── lib/           # API 클라이언트, 유틸
├── packages/
│   ├── timo-design-system/ # 공유 UI 컴포넌트 (@repo/timo-design-system)
│   ├── eslint-config/     # 공유 ESLint 설정 (@repo/eslint-config)
│   └── typescript-config/ # 공유 tsconfig (@repo/typescript-config)
└── docs/
```

---

## 컴포넌트 계층

```
app/(domain)/page.tsx                          ← 라우팅·레이아웃 조합
  └── app/(domain)/_components/               ← 해당 도메인에만 종속
        └── components/ 또는 @repo/timo-design-system  ← 앱 전역 또는 패키지 공유 UI
```

- **pages** (`app/.../page.tsx`): 라우팅 단위. 데이터 페칭(React Query) 및 레이아웃만 담당
- **도메인 종속** (`_components/`, `_containers/`, `_queries/`, `_hooks/`, `_utils/`): 해당 도메인 라우트 내부에서만 사용. `_` 접두사로 Next.js 라우팅에서 제외됨
  - `_components/` — props만 받는 순수 UI. `'use client'` 없이도 동작 가능
  - `_containers/` — `'use client'` 필수. useQuery·zustand 등 외부 상태와 결합된 클라이언트 컨테이너
  - `_queries/` — 해당 도메인 전용 React Query hooks (useQuery · useMutation · queryKey 정의)
- **앱 전역** (`components/`, `hooks/`): 여러 도메인에서 공유하는 presentational 컴포넌트·훅
- **@repo/timo-design-system**: 앱 간 공유되는 범용 UI (Button, Card 등)

### 예시 — auth 도메인

```
app/
  auth/
    _components/    # LoginForm, SocialLoginButton 등 순수 UI
    _containers/    # LoginFormContainer (useQuery·zustand 결합)
    _queries/       # useLoginMutation, useUserProfileQuery 등
    _hooks/         # useLoginForm 등 auth 전용 커스텀 훅
    _utils/         # validatePassword 등 auth 전용 유틸
    page.tsx        # 레이아웃 조합만 (Server Component)
    layout.tsx
```

앱 전역 `queries/`는 여러 도메인에서 공유하는 쿼리(예: 유저 프로필)에 사용하고, 특정 도메인에만 쓰이는 쿼리는 `_queries/`로 해당 도메인에 코로케이션한다.

---

## 상태 관리 전략

| 상태 종류 | 도구 | 위치 |
|----------|------|------|
| 서버 데이터 (API) | TanStack React Query | `queries/` |
| 클라이언트 전역 | Zustand | `stores/` |
| URL / 필터 / 페이지네이션 | Next.js searchParams | `app/` 라우트 |
| 폼 | React Hook Form (로컬) | 각 feature 컴포넌트 |
| 컴포넌트 로컬 | useState / useReducer | 컴포넌트 내부 |

**규칙:**
- 서버 상태를 Zustand에 복사하지 않는다 — React Query가 단일 출처
- 파생 값은 store에 저장하지 않고 selector로 계산
- URL로 공유 가능한 상태(필터, 탭)는 searchParams에 먼저 고려

---

## 코드 스캐폴딩

`@turbo/gen` 기반 generator로 보일러플레이트를 자동 생성한다.

```bash
pnpm gen react-component   # packages/timo-design-system에 컴포넌트 추가
pnpm gen page              # apps/timo-web에 App Router 페이지 추가
```

| Generator | 출력 경로 | 템플릿 위치 |
|-----------|-----------|------------|
| `react-component` | `packages/timo-design-system/src/<name>.tsx` | `turbo/generators/templates/component/` |
| `page` | `apps/timo-web/app/<route>/page.tsx` | `turbo/generators/templates/page/` |

생성되는 파일 형식은 `docs/conventions.md` 코드 스타일 규칙을 따른다.
- **컴포넌트**: arrow function, named export (`export const`)
- **페이지**: `export default function` (Next.js App Router 라우팅 규칙)

---

## 모듈 경계

- `apps/timo-web` → `packages/timo-design-system` 참조 가능
- `packages/timo-design-system` → `apps/*` 참조 금지
- 패키지 간 참조는 반드시 `workspace:*`로 선언
- 앱 내부 도메인 간 직접 import 금지 — 공유 로직은 `lib/` 또는 `packages/`로 추출
