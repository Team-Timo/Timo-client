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
│       ├── components/    # 앱 전용 컴포넌트
│       ├── hooks/         # 앱 전용 커스텀 훅
│       ├── stores/        # Zustand 스토어
│       ├── queries/       # React Query 훅
│       └── lib/           # API 클라이언트, 유틸
├── packages/
│   ├── ui/                # 공유 UI 컴포넌트 (@repo/ui)
│   ├── eslint-config/     # 공유 ESLint 설정 (@repo/eslint-config)
│   └── typescript-config/ # 공유 tsconfig (@repo/typescript-config)
└── docs/
```

---

## 컴포넌트 계층

```
pages (app/)
  └── feature 컴포넌트 (components/feature/)   ← 도메인 로직 포함
        └── ui 컴포넌트 (components/ui/ 또는 @repo/ui)  ← 순수 표현
```

- **pages**: 라우팅 단위. 데이터 페칭(React Query) 및 레이아웃만 담당
- **feature 컴포넌트**: 특정 도메인 기능 단위. 스토어·쿼리 직접 접근 가능
- **ui 컴포넌트**: props만 받는 순수 presentational. 상태·사이드이펙트 없음
- **@repo/ui**: 앱 간 공유되는 범용 UI (Button, Card 등)

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

## 모듈 경계

- `apps/timo-web` → `packages/ui` 참조 가능
- `packages/ui` → `apps/*` 참조 금지
- 패키지 간 참조는 반드시 `workspace:*`로 선언
- 앱 내부 도메인 간 직접 import 금지 — 공유 로직은 `lib/` 또는 `packages/`로 추출
