import { TodayBadge } from "./TodayBadge";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/TodayBadge",
  component: TodayBadge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "weekly"],
    },
  },
} satisfies Meta<typeof TodayBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Weekly: Story = {
  args: {
    variant: "weekly",
  },
};
