import { TimeSelector } from "./TimeSelector";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Time/TimeSelector",
  component: TimeSelector,
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
      options: ["ai", 15, 30, 45, 60, 90],
    },
  },
} satisfies Meta<typeof TimeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const TRIGGER = (
  <span className="typo-headline-r-14 text-timo-black rounded-4 bg-timo-gray-300 px-3 py-1.5">
    예상 시간
  </span>
);

const TIMES = [
  { minute: 15, label: "00 : 15" },
  { minute: 30, label: "00 : 30" },
  { minute: 45, label: "00 : 45" },
  { minute: 60, label: "01 : 00" },
  { minute: 90, label: "01 : 30" },
];

export const Default: Story = {
  args: { trigger: TRIGGER, times: TIMES },
};

export const Selected: Story = {
  args: { trigger: TRIGGER, times: TIMES, selected: 60 },
};

export const AiSelected: Story = {
  args: { trigger: TRIGGER, times: TIMES, selected: "ai" },
};
