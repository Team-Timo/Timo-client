# 기술 스택

| 분류         | 도구                       | 비고                          |
| ------------ | -------------------------- | ----------------------------- |
| Monorepo     | Turborepo + pnpm workspace | 빌드 캐싱, 파이프라인 최적화  |
| Framework    | Next.js 16 (App Router)    | SSR/SSG, Server Components    |
| Language     | TypeScript 5.9             | strict 모드                   |
| Styling      | Tailwind CSS               | 유틸리티 클래스 기반          |
| State — 전역 | Zustand                    | 클라이언트 전역 상태          |
| State — 서버 | TanStack React Query       | API 캐싱, 동기화              |
| API Client   | swagger-typescript-api     | OpenAPI 스펙 → 타입 자동 생성 |
| Monitoring   | Sentry                     | 런타임 에러 및 성능 추적      |
| Formatter    | Prettier                   | 팀 컨벤션 자동 적용           |
| Linter       | ESLint 9 (flat config)     | `--max-warnings 0`            |
| Git Hooks    | Husky                      | 커밋 전 lint/format           |
| Code Review  | CodeRabbit                 | PR마다 AI 리뷰                |
| Assets       | SVG sprite                 | SVG → React 컴포넌트          |
| Deployment   | Vercel                     | Turborepo Remote Cache 연동   |
