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

const TRIGGER = (
  <span className="typo-headline-r-14 text-timo-black rounded-4 bg-timo-gray-300 px-3 py-1.5">
    태그
  </span>
);

export const Default: Story = {
  args: { trigger: TRIGGER },
};

export const 일상: Story = {
  args: { trigger: TRIGGER, selected: "일상" },
};

export const 운동: Story = {
  args: { trigger: TRIGGER, selected: "운동" },
};

export const 업무: Story = {
  args: { trigger: TRIGGER, selected: "업무" },
};

export const 기타: Story = {
  args: { trigger: TRIGGER, selected: "기타" },
};
