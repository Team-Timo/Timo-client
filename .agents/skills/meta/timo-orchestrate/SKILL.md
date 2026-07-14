# timo-orchestrate

## 트리거

- 요청 하나가 2개 이상의 스킬을 순서대로 필요로 할 때
- "처음부터 끝까지 만들어줘", "기능 전체 작업해줘"
- 어떤 스킬로 시작해야 할지 판단이 필요할 때

단일 스킬로 해결되는 요청("커밋해줘", "리뷰해줘")은 바로 해당 스킬을 실행한다.

---

## 실행 전 확인

아래가 없으면 시작 전에 먼저 물어본다:

- 무엇을 만들거나 고칠 것인지 (목표)
- 어느 위치에 들어갈지 (`timo-web` / `timo-design-system` / 루트)
- 이슈 번호 (커밋·PR 이 필요한 경우)

피그마 링크, API 문서, 스크린샷이 있으면 바로 활용한다.

---

## 자주 쓰는 스킬 체인

| 상황                              | 실행 순서                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| 새 기능 처음부터 끝까지           | `timo-issue` → 구현 스킬 → `timo-review` → `timo-verify` → `timo-commit` → `timo-pr` |
| 피그마 디자인 → 컴포넌트 + 스토리 | `timo-figma` → `timo-component` → `timo-storybook` → `timo-commit`                   |
| 코드 구조 개선 후 PR              | `timo-refactor` → `timo-review` → `timo-verify` → `timo-commit` → `timo-pr`          |
| 이슈 없이 빠른 버그 픽스          | `timo-component` 또는 `timo-page` → `timo-verify` → `timo-commit`                    |
| 페이지 + 데이터 연동              | `timo-issue` → `timo-page` → `timo-review` → `timo-commit`                           |

구현 스킬은 작업 유형에 따라 `timo-component` / `timo-page` / `timo-figma` 중 하나를 선택한다.

---

## Phase 1 — 스킬 체인 도출

요청에서 작업 단위를 분해하고 실행 순서를 결정한다.

```text
예시: "로그인 페이지 만들고 커밋까지"

1. timo-issue   → 이슈 생성 + 브랜치 생성
2. timo-page    → 라우트·컴포넌트 구현
3. timo-review  → 코드 리뷰
4. timo-verify  → 타입·린트·빌드 확인
5. timo-commit  → 커밋
6. timo-pr      → PR 작성
```

## Phase 2 — 계획 확인

아래 형식으로 계획을 출력하고 사용자 승인을 받는다.

```text
## 작업 계획

목표: {요청 내용 한 줄 요약}
위치: {대상 패키지/경로}

실행 순서:
1. timo-xxx — 무엇을 하는 단계인지
2. timo-xxx — 무엇을 하는 단계인지

시작할까요?
```

## Phase 3 — 순차 실행

각 스킬의 Phase 절차를 그대로 따른다.  
블로커(빌드 실패, 미결 리뷰 이슈 등)가 생기면 즉시 멈추고 사용자에게 알린다.  
모든 스킬 완료 후 변경 파일 목록과 결과를 한 줄로 요약한다.
