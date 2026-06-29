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

export const 매우중요: Story = {
  args: { priority: "매우중요" },
};

export const 중요: Story = {
  args: { priority: "중요" },
};

export const 보통: Story = {
  args: { priority: "보통" },
};

export const 낮음: Story = {
  args: { priority: "낮음" },
};

export const Disable: Story = {
  args: { priority: "Disable" },
};
