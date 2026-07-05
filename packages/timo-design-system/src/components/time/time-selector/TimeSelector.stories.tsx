import { TimeSelector } from "@components/time/time-selector/TimeSelector";

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
      options: ["ai", 15, 30, 45, 60, 120],
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
  { minute: 15, value: "15", unit: "min" },
  { minute: 30, value: "30", unit: "min" },
  { minute: 45, value: "45", unit: "min" },
  { minute: 60, value: "1", unit: "h" },
  { minute: 120, value: "2", unit: "h" },
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
