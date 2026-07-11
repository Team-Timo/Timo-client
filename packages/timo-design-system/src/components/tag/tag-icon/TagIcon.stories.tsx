import { TagIcon } from "./TagIcon";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Tag/TagIcon",
  component: TagIcon,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    text: {
      control: "text",
      description: "태그에 표시될 텍스트",
    },
    variant: {
      control: "select",
      options: ["disable", "default", "blue"],
      description: "태그 스타일 베리언트",
    },
  },
} satisfies Meta<typeof TagIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Disable: Story = {
  args: { text: "태그", variant: "disable" },
};

export const Default: Story = {
  args: { text: "과제", variant: "default" },
};

export const Blue: Story = {
  args: { text: "과제", variant: "blue" },
};
