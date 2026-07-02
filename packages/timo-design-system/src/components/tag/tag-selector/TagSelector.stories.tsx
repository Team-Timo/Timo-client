import { TagSelector } from "@components/tag/tag-selector/TagSelector";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Tag/TagSelector",
  component: TagSelector,
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
      options: ["일상", "운동", "업무", "기타"],
    },
  },
} satisfies Meta<typeof TagSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const 일상: Story = {
  args: { selected: "일상" },
};

export const 운동: Story = {
  args: { selected: "운동" },
};

export const 업무: Story = {
  args: { selected: "업무" },
};

export const 기타: Story = {
  args: { selected: "기타" },
};
