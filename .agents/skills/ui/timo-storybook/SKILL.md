# timo-storybook

## 트리거

- "스토리 만들어줘 / 스토리북 추가해줘"
- 컴포넌트 구현 완료 후 문서화 요청

## 참조

- 대상 컴포넌트의 Props 인터페이스
- `docs/design/storybook.md` → Story 작성 컨벤션 (패턴 A/B/C, argTypes, autodocs, play 함수)
- `docs/conventions/naming.md` → 파일 네이밍

---

## Phase 1 — 컴포넌트 분석

대상 컴포넌트를 읽어 아래를 파악한다:

- props 인터페이스와 각 prop의 타입
- variant/열거형 prop이 있는지 (유니언 타입, Record 패턴)
- 단순 string/boolean prop인지
- 여러 항목을 목록으로 전시하는 컴포넌트인지 (Color, Typography 등 토큰 전시용)

---

## Phase 2 — 패턴 선택

컴포넌트 성격에 따라 아래 세 패턴 중 하나를 선택한다.

### 패턴 A — variant별 개별 Story (PriorityIcon 참조)

variant(유니언 타입) prop이 있는 컴포넌트. variant마다 Story를 따로 export한다.

```tsx
import { PriorityIcon } from "./PriorityIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/PriorityIcon",
  component: PriorityIcon,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    priority: {
      control: "select",
      options: ["매우중요", "중요", "보통", "낮음", "Disable"],
    },
  },
} satisfies Meta<typeof PriorityIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 매우중요: Story = { args: { priority: "매우중요" } };
export const 중요: Story = { args: { priority: "중요" } };
export const 보통: Story = { args: { priority: "보통" } };
export const 낮음: Story = { args: { priority: "낮음" } };
export const Disable: Story = { args: { priority: "Disable" } };
```

### 패턴 B — Default 단일 Story (Tag 참조)

string/boolean 등 자유 입력 prop을 받는 컴포넌트. Controls에서 직접 수정한다.

```tsx
import { Tag } from "./Tag";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    text: {
      control: "text",
      description: "태그에 표시될 텍스트",
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: "과제" },
};
```

### 패턴 C — render() 전시 Story (Color, Typography 참조)

토큰·목록을 전체 나열하는 전시용 컴포넌트. `component`를 meta에서 생략하고 `render()`로 직접 렌더링한다.

```tsx
import { Color } from "./Color";
import { COLOR_TOKENS } from "../../tokens/color-token";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Tokens/Color",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  name: "All Colors",
  render: () => (
    <div
      style={{ fontFamily: "var(--font-family-pretendard)", maxWidth: "600px" }}
    >
      {COLOR_TOKENS.map((token) => (
        <Color key={token.name} {...token} />
      ))}
    </div>
  ),
};
```

---

## Phase 3 — 세부 규칙

### title 네이밍

| 컴포넌트 유형              | title                 |
| -------------------------- | --------------------- |
| 일반 UI 컴포넌트           | `"Components/{Name}"` |
| 토큰 전시 (색상·타이포 등) | `"Tokens/{Name}"`     |

### layout 선택

| 상황               | layout       |
| ------------------ | ------------ |
| 작은 단일 컴포넌트 | `"centered"` |
| 목록·넓은 컨텐츠   | `"padded"`   |

### argTypes control 선택

| prop 타입             | control                       |
| --------------------- | ----------------------------- |
| 유니언 타입 (variant) | `"select"` + `options: [...]` |
| string                | `"text"`                      |
| boolean               | `"boolean"`                   |
| number                | `"number"`                    |

### Story export 이름

- 패턴 A: variant 값 그대로 export (`export const 매우중요`, `export const Disable`)
- 패턴 B: `Default`
- 패턴 C: 목적을 나타내는 이름 (`All`, `Scale` 등)

---

## Phase 4 — 자가 검토

- [ ] `satisfies Meta<typeof {Component}>` 형식 사용 (패턴 C는 `satisfies Meta`)
- [ ] `type Story = StoryObj<typeof meta>` 선언
- [ ] 파일 위치: 컴포넌트와 동일 폴더 (`{Name}.stories.tsx`)
- [ ] variant 있는 컴포넌트는 모든 variant에 Story가 있는가
- [ ] Controls 패널에서 props가 조작 가능한가
