# timo-commit

## 트리거

- "커밋해줘", "커밋 만들어줘", "commit"
- "staged 변경 정리해줘", "변경사항 나눠줘"

## 참조

- `docs/conventions/commit.md` → 커밋 타입·스코프·형식·규칙

## 핵심 원칙

1. **secret guard 먼저**: `.env`, 비밀번호, API 키, 토큰이 스테이징되어 있으면 즉시 멈추고 알린다.
2. **atomic 단위 분리**: 논리적으로 무관한 변경은 별도 커밋으로 나눈다.
3. **2단계 진행**: Phase 1(계획표 출력 → 승인) → Phase 2(실행). 승인 없이 커밋하지 않는다.
4. **push는 명시적 요청 시에만**: 커밋까지만 하고, push는 사용자가 동의하면 수행한다.

---

## Phase 1 — 분석 및 계획 수립

1. `git status`와 `git diff --cached`로 스테이징된 변경 확인.
2. **secret guard**: `.env`, `password`, `api_key`, `secret`, `token` 패턴 검색 — 발견 시 즉시 중단.
3. 변경된 파일들을 도메인/기능/계층 단위로 커밋 그룹 분류.
4. 아래 형식의 계획표를 출력하고 **사용자 승인 대기**.

### 계획표 출력 형식

```
## 커밋 계획

### 커밋 1: feat(web): 소셜 로그인 컴포넌트 추가 (#5)
- apps/timo-web/src/components/SocialLogin/index.tsx
- 소셜 로그인 UI 컴포넌트를 추가했습니다

### 커밋 2: chore(root): turbo filter 스크립트 추가
- package.json
- dev:web, build:web 등 필터 스크립트를 추가했습니다

계속 진행할까요?
```

---

## Phase 2 — 커밋 실행

승인 후 각 그룹별 `git add <파일>` → `git commit -m` 순으로 실행한다.  
완료 후 `git log --oneline -n <커밋 수>`로 결과 요약 출력.

---

## 계층별 분리 원칙

같은 기능이라도 계층이 다르면 **별도 커밋**으로 분리한다:

1. **의존성 변경**: `package.json`, `pnpm-lock.yaml` → `chore`
2. **핵심 구현**: 컴포넌트, 훅, 유틸리티 → `feat` / `fix` / `refactor`
3. **설정/라우팅**: 라우트 등록, 설정 파일 → `chore` / `feat`

---

## 커밋 메시지 형식

→ `docs/conventions/commit.md` 참조 (타입 목록·스코프 기준·형식·규칙)

핵심 요약:

- 형식: `타입(스코프): 한국어 제목 (#이슈번호)`
- 본문: 반드시 `~했습니다` 체로 종결
- 대괄호 스코프 금지: `feat: [web] …` ❌
- 이슈 번호 모르면 사용자에게 확인

---

## 금지

- `--no-verify` 플래그 사용 금지 (사용자가 요청해도 이유를 먼저 묻는다)
- 스테이징되지 않은 파일을 임의로 `git add` 하지 않는다
- `.env`, 인증서, 토큰 파일을 커밋에 포함하지 않는다
- 승인 없이 커밋을 실행하지 않는다
