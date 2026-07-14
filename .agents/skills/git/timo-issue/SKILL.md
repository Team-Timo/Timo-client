# timo-issue

## 트리거

다음 요청이 오면 이 스킬을 사용한다:

- "이슈 만들어줘", "이슈 올려줘", "이슈 써줘"
- 새 기능 개발 또는 버그 수정 시작 전

인자 없이 실행하면 현재 대화 컨텍스트에서 작업 내용을 자동으로 추론한다.

---

## 이슈 타입

→ `docs/conventions/issue-pr.md` 참조 (TYPE 목록·형식·규칙)

PREFIX는 `[FEAT]`, `[FIX]`, `[CI]` 등 작업 성격에 따라 대문자로 자유롭게 지정한다.

---

## 이슈 본문 템플릿

### Feature Request — feat / refactor / ui / style / docs / chore / ci / perf / init

`.github/ISSUE_TEMPLATE/feature_request.md` 기반:

```markdown
### 🛠️ 만들고자 한 기능 설명

{작업 목적과 내용을 2-3문장으로 서술}

### ✅ TODO LIST

- [ ] {세부 작업 1}
- [ ] {세부 작업 2}

### ⏰ 예상 작업 기간

{컨텍스트 기반 예상 기간, 모르면 "-"}

### 📝 참고 링크(선택)

### 🗣️ ETC(선택)

### 📸 피그마 스크린샷
```

### Bug Report — fix

`.github/ISSUE_TEMPLATE/bug_report.md` 기반:

```markdown
## 어떤 버그인가요?

{버그를 간결하게 설명}

<br><br>

## 어떤 상황에서 발생한 버그인가요?

- **Given**: {사전 조건}
- **When**: {어떤 행동을 했을 때}
- **Then**: {어떤 문제가 발생했는지}

<br><br>

## 예상 결과

{정상적으로 동작했어야 할 결과}

<br><br>

## 참고자료

{관련 스크린샷, 에러 로그 등 — 없으면 생략}
```

---

## 브랜치 네이밍 컨벤션

→ `docs/conventions/branch.md` 참조 (구조·타입·형식·규칙)

```
{type}/{scope}/{이슈번호}-{kebab-case-영어설명}

feat/web/5-social-login
fix/web/7-redirect-error
refactor/ui/12-button-cleanup
chore/root/15-turbo-filter-scripts
```

---

## 워크플로우

### Phase 1 — 분석 및 계획 수립

1. 인자에서 타입과 설명 파싱. 없으면 현재 대화 컨텍스트에서 추론.
2. 타입에 맞는 템플릿 선택 후 내용 채우기.
3. `git config user.name`으로 작성자 확인.
4. 계획표 출력 후 **사용자 승인 대기**.

```
## 이슈 생성 계획

타입: feat
제목: [FEAT] 소셜 로그인 기능 구현
Assignee: @me

### 이슈 본문 미리보기
---
(본문 내용)
---

생성될 브랜치: feat/web/{번호}-social-login
Base 브랜치: develop

계속 진행할까요?
```

### Phase 2 — 이슈 생성

```bash
gh issue create \
  --title "[FEAT] 소셜 로그인 기능 구현" \
  --body "$(cat <<'EOF'
...
EOF
)" \
  --assignee "@me"
```

출력된 이슈 URL에서 번호 파싱.

### Phase 3 — 브랜치 생성 및 체크아웃

```bash
git checkout -b {type}/{scope}/{번호}-{description} origin/develop
```

```
이슈 생성 완료: #{번호} — {제목}
   URL: https://github.com/{repo}/issues/{번호}
브랜치 생성 완료: {type}/{scope}/{번호}-{description}
   이제 작업을 시작할 수 있습니다.
```

---

## 주의사항

- assignee는 항상 `@me`
- `gh` CLI 미인증 시 `gh auth login` 먼저 안내
- 같은 이름의 브랜치가 이미 있으면 사용자에게 알리고 다른 이름 제안
- `origin/develop`이 없는 경우 사용자에게 base 브랜치를 물어본다

---

## 금지

- 사용자 승인 없이 이슈를 생성하지 않는다
- 브랜치 설명에 한국어를 그대로 쓰지 않는다 (반드시 영어 kebab-case 변환)
- `gh` 인증 상태를 확인하지 않고 실행하지 않는다
