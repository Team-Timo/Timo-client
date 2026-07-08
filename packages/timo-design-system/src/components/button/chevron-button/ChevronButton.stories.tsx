import { WeeklyButton } from "./ChevronButton";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Button/WeeklyButton",
  component: WeeklyButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: { control: "radio", options: ["left", "right"] },
    onClick: { action: "clicked" },
  },
  args: {
    variant: "left",
  },
} satisfies Meta<typeof WeeklyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex gap-4">
      <WeeklyButton variant="left" />
      <WeeklyButton variant="right" />
    </div>
  ),
};
