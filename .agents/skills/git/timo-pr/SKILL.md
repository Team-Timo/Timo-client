# timo-pr

## 트리거

- "PR 만들어줘", "PR 올려줘", "pull request"
- 브랜치 작업이 완료되고 `develop`으로 머지 준비가 된 시점

## 참조

- 템플릿: `.github/PULL_REQUEST_TEPLATE.md`
- 제목 컨벤션: `docs/conventions.md` → 이슈 & PR 제목 컨벤션

## 핵심 원칙

1. **전체 커밋 히스토리 기준**: `develop` 브랜치에서 갈라진 전체 변경을 분석한다. 최신 커밋 하나만 보지 않는다.
2. **제목은 `[TYPE] 한국어 요약` 형식**
3. **근거 기반으로 쓴다**: screenshot, route, network, CI처럼 실제로 확인한 자료만 적는다. 확인하지 않은 증거를 만들지 않는다.
4. **구현 의도 설명**: 무엇을 바꿨는지는 diff가 대신한다. 왜 이 구조를 택했는지, 어떤 불일치를 줄였는지를 적는다.
5. **실제 검증과 계획된 검증을 분리**: 실행하지 않은 명령은 체크하거나 성공처럼 쓰지 않는다.
6. **base 브랜치 확인**: 기본값은 `develop`. 다르면 사용자에게 먼저 물어본다.

---

## Phase 1 — 커밋 계획

PR 생성 전, 실제 diff를 기능/작업 단위로 분해한다.

```bash
git log develop...HEAD --oneline --reverse
git diff develop...HEAD --stat
git diff develop...HEAD --name-only
```

### 별도 커밋 판단 기준

아래 중 하나라도 다르면 별도 커밋을 우선 고려한다:

- 변경 surface가 다름 (UI / API / config / docs)
- reviewer가 확인할 관점이 다름
- revert 단위가 다름
- 검증 방식이 다름
- 순수 refactor와 기능 변경이 섞임

커밋 계획 형식:

```
- Commit 1: `[TYPE] scope: 요약`
  - files: 해당 파일 목록
  - reason: 이 단위로 나눈 이유
- Commit 2: `[TYPE] scope: 요약`
  - files:
  - reason:
```

---

## Phase 2 — 컨텍스트 수집

브랜치 이름에서 `{type}`과 `{scope}` 추출 (`feat/web/5-social-login` → `FEAT`, `web`, `#5`)

```bash
git branch --show-current
```

브랜치 push 여부 확인 → 없으면 `git push -u origin <branch>` 수행.

### PR 본문 근거 수집

PR 본문 작성 전에 아래 항목을 먼저 정리한다:

- 기존 동작과 문제 원인
- 구현 선택지와 실제 선택한 접근
- 실행한 검증 명령
- 관찰 가능한 증거 (browser route, screenshot, network, CI)
- 남은 리스크와 reviewer가 집중해서 봐야 할 지점

---

## Phase 3 — PR 생성

```bash
gh pr create \
  --title "[FEAT] 소셜 로그인 기능 구현" \
  --base develop \
  --body "$(cat <<'EOF'
## ISSUE 🔗

close #5

<br><br>

## What is this PR? 🔍

...

<br><br>

## To Reviewers

...

## Screenshot 📷

<!-- 구현된 기능/디자인 gif -->

<br><br>

## Test Checklist ✔

- [ ] 기능 동작 확인
- [ ] 엣지 케이스 확인
EOF
)"
```

---

## PR 제목 형식

```
[TYPE] <전체 변경사항을 아우르는 한국어 요약>
```

TYPE은 작업 성격에 맞게 대문자로 자유롭게 지정한다.  
(`[FEAT]`, `[FIX]`, `[REFACTOR]`, `[CI]`, `[INIT]` 등)

---

## 본문 작성 규칙

`.github/PULL_REQUEST_TEPLATE.md`의 모든 섹션을 빠짐없이 채운다.

### ISSUE 🔗

브랜치명에서 추출한 이슈 번호를 적는다.

```markdown
close #5
```

---

### What is this PR? 🔍

**변경 파일 목록으로 끝내지 않는다.** 아래 흐름으로 서술한다.

#### 1. 첫 문단 — 전체 요약

이번 PR에서 무엇을 했는지 전체를 한두 문장으로 요약한다.

#### 2. 배경 — 기존 동작과 문제

기존에 어떤 구조였는지, 그 구조에서 어떤 문제가 발생했는지를 먼저 설명한다.

좋은 예:
```
기존에는 클라이언트에서 로그인 상태를 확인한 뒤 query가 실행되는 구조라
첫 진입 시 서버에서 목록 데이터를 준비하기 어려웠습니다.
```

피해야 할 예:
```
- 탐색 SSR 적용
- query 파일 분리
- build 성공
```

#### 3. 변경 도메인별 섹션

변경된 도메인·컴포넌트·기능 단위로 `## 섹션명` 헤더를 나눠 서술한다.  
각 섹션 안에 **왜 그렇게 했는지 이유**를 자연스럽게 녹인다.

구조 변경이 있으면 "왜"를 반드시 적는다:
- server/client 런타임 경계를 나눈 이유
- 모듈 분리 기준 (shared/base/options/server 등)
- 중복을 허용하거나 공통화를 미룬 이유

#### 4. 구현 선택

선택한 접근과 고려한 대안을 적는다. interface나 경계를 짧은 코드 블록으로 보여줄 수 있다. 긴 구현 전체를 붙이지 않는다.

예시:
```markdown
## What is this PR? 🔍

로그인 페이지의 반응형 레이아웃을 수정하고, 토큰 갱신 로직에서 발생하던 경쟁 조건을 해결했습니다.

## 로그인 페이지

모바일에서 폼 너비가 뷰포트를 넘어가는 문제가 있어 max-w 기준을 lg로 통일했습니다.

## 토큰 갱신

리프레시 요청이 동시에 여러 번 발생하던 문제를 큐 방식으로 해결했습니다.
서버와 클라이언트가 같은 query key를 사용하도록 options/server/shared 단위로 분리했습니다.
이로써 초기 화면은 서버에서 준비한 데이터를 기반으로 렌더링되고,
클라이언트에서는 추가 요청 없이 같은 cache를 이어받을 수 있습니다.
```

---

### To Reviewers

reviewer가 중점적으로 봐야 할 지점을 좁혀 준다. 별도 항목 구조 없이 본문 안에 자연스럽게 녹여 쓴다.

적을 내용:
- 판단이 필요한 구조 선택
- 서버/클라이언트 import boundary가 올바른지
- 현재 구현이 기대는 정책 또는 전제
- 남은 리스크, 의도적으로 제외한 범위
- 임시 fixture, mock, TODO

예시:
```markdown
## To Reviewers

interceptor 내부 로직이 조금 복잡해졌는데 한번 봐주세요.
AccessToken을 browser에서 읽는 전제가 현재 인증 정책과 맞는지 확인 부탁드립니다.
리프레시 실패 시 fallback 처리는 이번 PR 범위에서 제외했으며 후속 작업으로 남깁니다.
```

---

### Screenshot 📷

UI 변경이 있으면 `| 컴포넌트 | 화면 |` 표로 정리한다.  
UI 변경이 없으면 주석(`<!-- UI 변경 없음 -->`)만 유지한다.

```markdown
| 컴포넌트        | Before     | After      |
| --------------- | ---------- | ---------- |
| `LoginForm.tsx` | (스크린샷) | (스크린샷) |
```

---

### Test Checklist ✔

**실제 실행한 명령만 체크**한다. 실행하지 못한 항목은 unchecked로 두거나 "미실행: 이유"를 적는다.

```markdown
## Test Checklist ✔

- [x] `pnpm lint` 통과
- [x] `pnpm check-types` 통과
- [x] 로그인 페이지 모바일(375px) 레이아웃 확인
- [ ] `pnpm build` — 미실행: CI에서 확인 예정
- [ ] 토큰 갱신 경쟁 조건 재현 테스트 — 후속 작업
```

---

## 작성 스타일

- **서술형**: "~했습니다", "~되었습니다" 체 사용. 명사형·축약형 금지.
  - 나쁜 예: "토큰 갱신 로직 수정" → 좋은 예: "토큰 갱신 로직을 수정했습니다"
- **불필요한 수식어 제거**: "~를 진행했습니다", "~에 대해서" 금지.
- **없는 증거를 만들지 않는다**: screenshot, trace, network log가 없으면 있다고 쓰지 않는다.
- **local production 측정과 dev server 확인을 구분**한다.

---

## 사전 검증

PR 본문 완성 전, 아래가 통과됐는지 확인한다. 미통과 시 먼저 수정을 권고한다:

```bash
pnpm check-types
pnpm lint
```

---

## 금지

- PR을 merge하지 않는다.
- force-push로 base 브랜치를 덮어쓰지 않는다.
- `[TYPE]` 형식을 반드시 대괄호로 감싸 사용한다.
- reviewer, milestone은 사용자가 명시한 경우에만 추가한다.
- 실행하지 않은 명령을 체크하거나 성공처럼 기록하지 않는다.
- 없는 증거(screenshot, CI 결과, metric)를 있는 것처럼 쓰지 않는다.
