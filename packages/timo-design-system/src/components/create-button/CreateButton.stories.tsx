import { CreateButton } from "./CreateButton";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/CreateButton",
  component: CreateButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
      description: "버튼에 표시될 텍스트",
    },
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 여부",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
  },
} satisfies Meta<typeof CreateButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "생성하기", disabled: false },
};

export const Disabled: Story = {
  args: { label: "생성하기", disabled: true },
};
