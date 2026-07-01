import { PlayButton } from "./PlayButton";
import { PauseIcon } from "../../icons/generated/Pause";
import { PlayIcon } from "../../icons/generated/Play";
import { PlayDisabledIcon } from "../../icons/generated/PlayDisabled";

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
  render: (args) => (
    <PlayButton {...args}>
      <PlayIcon />
    </PlayButton>
  ),
};

export const Stop: Story = {
  args: { variant: "stop" },
  render: (args) => (
    <PlayButton {...args}>
      <PauseIcon />
    </PlayButton>
  ),
};

export const Disabled: Story = {
  args: { variant: "disabled" },
  render: (args) => (
    <PlayButton {...args}>
      <PlayDisabledIcon />
    </PlayButton>
  ),
};

export const All: Story = {
  name: "All Variants",
  args: { variant: "play" },
  render: () => (
    <div className="flex items-center gap-4">
      <PlayButton variant="play">
        <PlayIcon />
      </PlayButton>
      <PlayButton variant="stop">
        <PauseIcon />
      </PlayButton>
      <PlayButton variant="disabled">
        <PlayDisabledIcon />
      </PlayButton>
    </div>
  ),
};
