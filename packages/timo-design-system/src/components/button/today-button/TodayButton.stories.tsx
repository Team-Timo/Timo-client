import { TodayButton } from "@components/button/today-button/TodayButton";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Button/TodayButton",
  component: TodayButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof TodayButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
