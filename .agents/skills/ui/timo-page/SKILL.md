# timo-page

## 트리거

- "페이지 만들어줘 / 라우트 구현해줘"
- 여러 컴포넌트와 데이터 페칭이 결합된 페이지 단위 기능 요청

## 참조

- `docs/architecture.md` → 컴포넌트 계층, 상태 관리 전략
- `docs/conventions.md` → 파일 네이밍, 코드 스타일

## 워크플로우

### Phase 1 — 라우트 설계
- `app/` 디렉토리 구조 결정 (`app/[route]/page.tsx`)
- 레이아웃 공유 범위 파악 (`layout.tsx` 위치)
- 동적 라우트 여부 확인 (`[id]`, `[...slug]`)

### Phase 2 — 데이터 페칭 전략 결정

| 상황 | 전략 |
|------|------|
| SEO 필요 / 초기 데이터 필수 | Server Component + fetch |
| 실시간 갱신 / 사용자 인터랙션 | Client Component + React Query |
| URL 기반 필터·검색 | searchParams → React Query queryKey |

### Phase 3 — 상태 관리 결정
- URL로 공유 가능한 상태(필터, 탭, 페이지) → searchParams 우선
- 사용자 세션·전역 UI 상태 → Zustand
- 서버 데이터는 Zustand에 복사하지 않음

### Phase 4 — 컴포넌트 조합
- `page.tsx`는 데이터 페칭 + 레이아웃 조합만 담당
- 도메인 로직은 feature 컴포넌트로 분리
- 재사용 가능한 UI는 ui 컴포넌트 또는 `@repo/ui` 활용

### Phase 5 — 자가 검토
- [ ] `page.tsx` 50줄 이하 (비대해지면 컴포넌트 분리)
- [ ] 서버/클라이언트 컴포넌트 경계 명확
- [ ] 로딩·에러 상태 처리 (`loading.tsx`, `error.tsx`)
