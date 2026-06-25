# 브랜치 컨벤션

## 브랜치 구조

```text
main ── develop ──────────────── feat
 └── !HOTFIX    └── release/x.x.x  └── fix
                                    └── refactor
```

## 브랜치 타입

| 브랜치 | 설명 |
|--------|------|
| `main` | 실제 서비스 브랜치 |
| `develop` | 배포 전 작업 기준 브랜치 (default) |
| `feat` | 기능 단위 개발 |
| `fix` | 버그/에러 수정 |
| `refactor` | 코드 구조 개선 |
| `ci` | CI/CD 설정 변경 |
| `docs` | 문서 작업 |
| `release` | 릴리즈 준비 |
| `!HOTFIX` | 서비스 중 긴급 수정 (main에서 분기) |

## 브랜치 형식

```text
prefix/scope/이슈번호-작업내용
(띄어쓰기는 -로 대체, kebab-case)

scope: web / ui / root / config (커밋 스코프와 동일 → conventions/commit.md 참조)

ex) feat/web/1-add-searching-result
    fix/web/8-login-error
    refactor/ui/12-button-cleanup
    ci/root/15-add-bundle-size-workflow
    release/0.1.0
```

## 규칙

- 작업 설명은 **영어** kebab-case로 작성 (한국어 금지)
- 최대 50자 이내로 축약
- base 브랜치는 `develop`
