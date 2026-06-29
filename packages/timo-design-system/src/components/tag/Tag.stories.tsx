import { Tag } from "./Tag";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["과제", "운동", "일상", "업무", "기타"],
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 과제: Story = {
  args: { variant: "과제" },
};

export const 운동: Story = {
  args: { variant: "운동" },
};

export const 일상: Story = {
  args: { variant: "일상" },
};

export const 업무: Story = {
  args: { variant: "업무" },
};

export const 기타: Story = {
  args: { variant: "기타" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(["과제", "운동", "일상", "업무", "기타"] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-2">
          <Tag variant={variant} />
        </div>
      ))}
    </div>
  ),
};
