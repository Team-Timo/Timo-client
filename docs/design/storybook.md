# Storybook 컨벤션

Storybook **8.6** 기반. `@storybook/react-vite` 프레임워크 사용.

## 설치된 Addon

| Addon                | 역할                                                |
| -------------------- | --------------------------------------------------- |
| `addon-essentials`   | Controls, Actions, Backgrounds, Viewport, Docs 통합 |
| `addon-interactions` | `play` 함수로 인터랙션 시나리오 실행                |
| `addon-a11y`         | 접근성 자동 검사 (Addons 패널 → Accessibility 탭)   |
| `addon-links`        | Story 간 링크 연결                                  |

---

## 파일 위치

Story 파일은 컴포넌트와 **같은 폴더**에 둔다.

```
src/components/
  tag/
    Tag.tsx
    Tag.stories.tsx
  priority-icon/
    PriorityIcon.tsx
    PriorityIcon.stories.tsx
```

---

## CSF(Component Story Format) 기본 구조

```tsx
import { ComponentName } from "./ComponentName";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    propName: { control: "text" },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { propName: "value" },
};
```

- `satisfies Meta<typeof ComponentName>` — 타입 추론을 유지하면서 meta를 검증한다
- `type Story = StoryObj<typeof meta>` — meta에서 타입을 추론해 Story 타입을 정의한다

---

## title 네이밍

Storybook 사이드바 계층 구조를 `title`로 제어한다.  
프로젝트의 storySort 순서: `Guides → Tokens → Components → Icons`

| 컨텐츠 유형 | title 형식            | 예시                       |
| ----------- | --------------------- | -------------------------- |
| 가이드 문서 | `"Guides/{이름}"`     | `"Guides/Storybook Guide"` |
| 토큰 전시   | `"Tokens/{이름}"`     | `"Tokens/Color"`           |
| UI 컴포넌트 | `"Components/{이름}"` | `"Components/Tag"`         |
| 아이콘      | `"Icons/{이름}"`      | `"Icons/ChevronIcon"`      |

---

## layout 선택

| 상황               | layout       |
| ------------------ | ------------ |
| 작은 단일 컴포넌트 | `"centered"` |
| 목록·넓은 컨텐츠   | `"padded"`   |

전역 기본값은 `preview.ts`에서 `"centered"`로 설정되어 있다.

---

## argTypes

Controls 패널에 표시되는 prop 조작 UI를 정의한다.

```tsx
argTypes: {
  // 선택형 (유니언 타입 variant)
  priority: {
    control: "select",
    options: ["매우중요", "중요", "보통", "낮음", "Disable"],
  },
  // 텍스트 입력
  text: {
    control: "text",
    description: "태그에 표시될 텍스트",
  },
  // 색상 피커
  color: { control: "color" },
  // 불리언 토글
  disabled: { control: "boolean" },
  // 숫자 슬라이더
  size: { control: "number" },
}
```

`preview.ts`에 `actions: { argTypesRegex: "^on[A-Z].*" }` 설정이 있어 `on`으로 시작하는 prop은 자동으로 action 로깅된다.

### table 옵션 (Docs 탭 테이블 제어)

```tsx
argTypes: {
  label: {
    description: "버튼에 표시되는 텍스트",
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "확인" },
      category: "Content",
    },
    control: "text",
  },
}
```

---

## autodocs

`main.ts`에 `docs: { autodocs: "tag" }` 설정 → meta에 `tags: ["autodocs"]`를 추가하면 Docs 탭이 자동 생성된다.

```tsx
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;
```

---

## play 함수 (addon-interactions)

인터랙션 시나리오를 코드로 작성해 Canvas에서 자동 실행한다.

```tsx
import { userEvent, within, expect } from "@storybook/test";

export const Filled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "입력값");
    await expect(canvas.getByRole("textbox")).toHaveValue("입력값");
  },
};
```

버튼 클릭, 폼 입력 등 상태 변화가 있는 컴포넌트에 활용한다.

---

## 배경·뷰포트

`preview.ts`에 전역 설정이 되어 있다.

**배경**: white / gray(`#f5f5f5`) / dark(`#1f1f1f`)  
**뷰포트**: Mobile(375px) / Tablet(768px) / Desktop(1280px)

Story별로 기본값을 덮어쓸 수 있다:

```tsx
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
    viewport: { defaultViewport: "mobile" },
  },
};
```
