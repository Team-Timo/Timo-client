# 모노레포 구조

```text
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

## 모듈 경계

- `apps/timo-web` → `packages/timo-design-system` 참조 가능
- `packages/timo-design-system` → `apps/*` 참조 금지
- 패키지 간 참조는 반드시 `workspace:*`로 선언
- 앱 내부 도메인 간 직접 import 금지 — 공유 로직은 `lib/` 또는 `packages/`로 추출
