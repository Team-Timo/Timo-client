import { PlayIcon } from "@icons/generated/Play";
import { PlayDisabledIcon } from "@icons/generated/PlayDisabled";
import { StopIcon } from "@icons/generated/Stop";

import { PlayButton } from "./PlayButton";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/PlayButton",
  component: PlayButton,
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
    size: {
      control: "select",
      options: ["sm", "lg"],
      description: "버튼 크기 (sm: 24×24, lg: 40×40)",
      table: {
        type: { summary: "sm | lg" },
        defaultValue: { summary: "sm" },
      },
    },
  },
} satisfies Meta<typeof PlayButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Play: Story = {
  args: { variant: "play", size: "sm" },
  render: (args) => (
    <PlayButton {...args}>
      <PlayIcon
        width={args.size === "lg" ? 24 : 12}
        height={args.size === "lg" ? 24 : 12}
      />
    </PlayButton>
  ),
};

export const Stop: Story = {
  args: { variant: "stop", size: "sm" },
  render: (args) => (
    <PlayButton {...args}>
      <StopIcon
        width={args.size === "lg" ? 24 : 12}
        height={args.size === "lg" ? 24 : 12}
      />
    </PlayButton>
  ),
};

export const Disabled: Story = {
  args: { variant: "disabled", size: "sm" },
  render: (args) => (
    <PlayButton {...args}>
      <PlayDisabledIcon
        width={args.size === "lg" ? 24 : 12}
        height={args.size === "lg" ? 24 : 12}
      />
    </PlayButton>
  ),
};

export const AllVariants: Story = {
  name: "All Variants",
  args: { variant: "play", size: "sm" },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <PlayButton variant="play" size="sm">
          <PlayIcon width={12} height={12} />
        </PlayButton>
        <PlayButton variant="stop" size="sm">
          <StopIcon width={12} height={12} />
        </PlayButton>
        <PlayButton variant="disabled" size="sm">
          <PlayDisabledIcon width={12} height={12} />
        </PlayButton>
      </div>
      <div className="flex items-center gap-4">
        <PlayButton variant="play" size="lg">
          <PlayIcon width={24} height={24} />
        </PlayButton>
        <PlayButton variant="stop" size="lg">
          <StopIcon width={24} height={24} />
        </PlayButton>
        <PlayButton variant="disabled" size="lg">
          <PlayDisabledIcon width={24} height={24} />
        </PlayButton>
      </div>
    </div>
  ),
};
