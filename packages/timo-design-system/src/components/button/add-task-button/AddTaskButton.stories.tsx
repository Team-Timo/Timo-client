import { AddTaskButton } from "./AddTaskButton";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Button/AddTaskButton",
  component: AddTaskButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    text: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["default", "weekly", "big"],
    },
  },
} satisfies Meta<typeof AddTaskButton>;

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

export const Big: Story = {
  args: {
    variant: "big",
  },
};
