import { PlayButton } from "./PlayButton";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/PlayButton",
  component: PlayButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["play", "stop", "disabled"],
      description: "버튼 상태",
      table: {
        type: { summary: "play | stop | disabled" },
      },
    },
  },
} satisfies Meta<typeof PlayButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Play: Story = {
  args: { variant: "play" },
};

export const Stop: Story = {
  args: { variant: "stop" },
};

export const Disabled: Story = {
  args: { variant: "disabled" },
};

export const All: Story = {
  name: "All Variants",
  args: { variant: "play" },
  render: () => (
    <div className="flex items-center gap-4">
      <PlayButton variant="play" />
      <PlayButton variant="stop" />
      <PlayButton variant="disabled" />
    </div>
  ),
};
