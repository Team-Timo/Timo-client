# 모노레포 구조

```text
timo-client/
├── apps/
│   └── timo-web/          # Next.js 앱 (port 3000)
│       ├── app/           # App Router 페이지·레이아웃
│       │   └── [locale]/(그룹)/(domain)/  # 도메인 라우트 (예: home, focus, settings, onboarding)
│       │       ├── _components/  # 해당 도메인 전용 순수 UI
│       │       ├── _containers/  # 해당 도메인 전용 클라이언트 컨테이너 ('use client')
│       │       ├── _hooks/       # 해당 도메인 전용 커스텀 훅
│       │       ├── _queries/     # 해당 도메인 전용 React Query 훅
│       │       ├── _types/       # 해당 도메인 전용 타입
│       │       ├── _utils/       # 해당 도메인 전용 유틸
│       │       └── page.tsx
│       ├── api/            # Orval 생성 API 클라이언트·타입 + 커스텀 axios 인스턴스
│       ├── components/     # 앱 전역 공유 컴포넌트
│       ├── constants/      # 앱 전역 상수 (라우트, 시간 단위 등)
│       ├── containers/     # 여러 도메인에서 공유하는 클라이언트 컨테이너
│       ├── hooks/          # 앱 전역 공유 커스텀 훅
│       ├── i18n/           # next-intl 라우팅·요청·네비게이션 설정
│       ├── messages/       # 로케일별 번역 리소스
│       ├── providers/      # 전역 Provider (auth, query, overlay, locale 등)
│       ├── queries/        # 여러 도메인에서 공유하는 React Query 훅
│       ├── stores/         # Zustand 스토어
│       ├── types/          # 앱 전역 공유 타입
│       └── utils/          # 앱 전역 공유 유틸
├── packages/
│   ├── timo-design-system/ # 공유 UI 컴포넌트 (@repo/timo-design-system)
│   ├── eslint-config/      # 공유 ESLint 설정 (@repo/eslint-config)
│   ├── tailwind-config/    # 공유 Tailwind 설정 (@repo/tailwind-config)
│   └── typescript-config/  # 공유 tsconfig (@repo/typescript-config)
└── docs/
```

## 모듈 경계

- `apps/timo-web` → `packages/timo-design-system` 참조 가능
- `packages/timo-design-system` → `apps/*` 참조 금지
- 패키지 간 참조는 반드시 `workspace:*`로 선언
- 앱 내부 도메인 간 직접 import 금지 — 공유 로직은 앱 전역 디렉터리(`components/`, `hooks/`, `queries/`, `utils/`, `api/` 등) 또는 `packages/`로 추출
