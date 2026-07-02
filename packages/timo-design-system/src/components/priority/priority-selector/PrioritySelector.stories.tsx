import { PrioritySelector } from "./PrioritySelector";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Priority/PrioritySelector",
  component: PrioritySelector,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light-gray",
      values: [
        { name: "light-gray", value: "#F5F5F5" },
        { name: "dark", value: "#333333" },
        { name: "white", value: "#FFFFFF" },
      ],
    },
  },
  argTypes: {
    selected: {
      control: "select",
      options: ["매우중요", "중요", "보통", "낮음"],
    },
  },
} satisfies Meta<typeof PrioritySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const TRIGGER = (
  <span className="typo-headline-r-14 text-timo-black rounded-4 bg-timo-gray-300 px-3 py-1.5">
    우선순위
  </span>
);

export const Default: Story = {
  args: { trigger: TRIGGER },
};

export const 매우중요: Story = {
  args: { trigger: TRIGGER, selected: "매우중요" },
};

export const 중요: Story = {
  args: { trigger: TRIGGER, selected: "중요" },
};

export const 보통: Story = {
  args: { trigger: TRIGGER, selected: "보통" },
};

export const 낮음: Story = {
  args: { trigger: TRIGGER, selected: "낮음" },
};
