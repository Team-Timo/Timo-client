import { Tag } from "./Tag";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    text: {
      control: "text",
      description: "태그에 표시될 텍스트",
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: "과제" },
};
