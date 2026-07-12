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
      options: [
        "VERY_HIGH",
        "HIGH",
        "MEDIUM",
        "LOW",
        "Disable",
        "white",
        "blue",
      ],
    },
  },
} satisfies Meta<typeof PriorityIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 매우중요: Story = {
  args: { priority: "VERY_HIGH" },
};

export const 중요: Story = {
  args: { priority: "HIGH" },
};

export const 보통: Story = {
  args: { priority: "MEDIUM" },
};

export const 낮음: Story = {
  args: { priority: "LOW" },
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
  "VERY_HIGH",
  "HIGH",
  "MEDIUM",
  "LOW",
  "Disable",
  "white",
  "blue",
];

export const AllPriorities: Story = {
  args: { priority: "VERY_HIGH" },
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
