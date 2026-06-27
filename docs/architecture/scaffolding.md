# 코드 스캐폴딩

`@turbo/gen` 기반 generator로 보일러플레이트를 자동 생성한다.

```bash
pnpm gen react-component   # packages/timo-design-system에 컴포넌트 추가
pnpm gen page              # apps/timo-web에 App Router 페이지 추가
```

| Generator         | 출력 경로                                    | 템플릿 위치                             |
| ----------------- | -------------------------------------------- | --------------------------------------- |
| `react-component` | `packages/timo-design-system/src/<name>.tsx` | `turbo/generators/templates/component/` |
| `page`            | `apps/timo-web/app/<route>/page.tsx`         | `turbo/generators/templates/page/`      |

생성되는 파일 형식은 `docs/conventions/code-style.md` 코드 스타일 규칙을 따른다.

- **컴포넌트**: arrow function, named export (`export const`)
- **페이지**: `export default function RouteNamePage()` — 함수명은 라우트명 PascalCase + `Page` 접미사 (예: `HomePage`, `LoginPage`)
- **레이아웃**: `export default function RouteNameLayout()` — 함수명은 라우트명 PascalCase + `Layout` 접미사 (예: `HomeLayout`, `LoginLayout`)
