import { PriorityIcon, type Priority } from "./PriorityIcon";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Priority/PriorityIcon",
  component: PriorityIcon,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    priority: {
      control: "select",
      options: ["매우중요", "중요", "보통", "낮음", "Disable", "white", "blue"],
    },
  },
} satisfies Meta<typeof PriorityIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 매우중요: Story = {
  args: { priority: "매우중요" },
};

export const 중요: Story = {
  args: { priority: "중요" },
};

export const 보통: Story = {
  args: { priority: "보통" },
};

export const 낮음: Story = {
  args: { priority: "낮음" },
};

export const Disable: Story = {
  args: { priority: "Disable" },
};

export const white: Story = {
  args: { priority: "white" },
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "light-gray", value: "#F5F5F5" },
        { name: "dark", value: "#333333" },
        { name: "white", value: "#FFFFFF" },
      ],
    },
  },
};
export const blue: Story = {
  args: { priority: "blue" },
};

const ALL_PRIORITIES: Priority[] = [
  "매우중요",
  "중요",
  "보통",
  "낮음",
  "Disable",
  "white",
  "blue",
];

export const AllPriorities: Story = {
  args: { priority: "매우중요" },
  parameters: {
    backgrounds: {
      default: "light-gray",
      values: [
        { name: "light-gray", value: "#F5F5F5" },
        { name: "dark", value: "#333333" },
        { name: "white", value: "#FFFFFF" },
      ],
    },
  },
  render: () => (
    <div className="flex items-center gap-3">
      {ALL_PRIORITIES.map((priority) => (
        <div key={priority} className="flex flex-col items-center gap-1.5">
          <PriorityIcon priority={priority} />
          <span style={{ fontSize: 10, color: "#666" }}>{priority}</span>
        </div>
      ))}
    </div>
  ),
};
