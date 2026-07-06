import { useState } from "react";

import { RepeatSelector, RepeatSelectorProps } from "./RepeatSelector";

import type { Meta, StoryObj } from "@storybook/react";

const TRIGGER = (
  <span className="typo-headline-r-14 text-timo-black rounded-4 bg-timo-gray-300 px-3 py-1.5">
    반복 설정
  </span>
);

const KOREAN_OPTIONS = [
  { frequency: "daily", label: "매일" },
  { frequency: "weekly", label: "매주" },
  { frequency: "monthly", label: "매달" },
] as const;

const WEEKDAYS_KO = [
  { id: "mon", label: "월요일마다" },
  { id: "tue", label: "화요일마다" },
  { id: "wed", label: "수요일마다" },
  { id: "thu", label: "목요일마다" },
  { id: "fri", label: "금요일마다" },
  { id: "sat", label: "토요일마다" },
  { id: "sun", label: "일요일마다" },
];

const meta = {
  title: "Components/Repeat/RepeatSelector",
  component: RepeatSelector,
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
    frequency: {
      control: "select",
      options: ["daily", "weekly", "monthly"],
    },
  },
  args: {
    trigger: TRIGGER,
    detailHeading: "세부 설정",
    options: [...KOREAN_OPTIONS],
    weekly: {
      weekdays: WEEKDAYS_KO,
      selectedWeekdayIds: [],
    },
    monthly: {
      repeatDayLabel: "일 마다",
      repeatDay: "3",
    },
  },
} satisfies Meta<typeof RepeatSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Daily: Story = {
  args: {
    frequency: "daily",
  },
};

const WeeklyDemo = (args: RepeatSelectorProps) => {
  const [selectedWeekdayIds, setSelectedWeekdayIds] = useState<string[]>([]);

  return (
    <RepeatSelector
      {...args}
      frequency="weekly"
      weekly={{
        ...args.weekly,
        weekdays: WEEKDAYS_KO,
        selectedWeekdayIds,
        onWeekdayToggle: (id) =>
          setSelectedWeekdayIds((prev) =>
            prev.includes(id)
              ? prev.filter((item) => item !== id)
              : [...prev, id],
          ),
      }}
    />
  );
};

export const Weekly: Story = {
  args: {
    frequency: "weekly",
  },
  render: (args) => <WeeklyDemo {...args} />,
};

const MonthlyDemo = (args: RepeatSelectorProps) => {
  const [repeatDay, setRepeatDay] = useState("3");

  return (
    <RepeatSelector
      {...args}
      frequency="monthly"
      monthly={{
        ...args.monthly,
        repeatDayLabel: "일 마다",
        repeatDay,
        onRepeatDayChange: setRepeatDay,
      }}
    />
  );
};

export const Monthly: Story = {
  args: {
    frequency: "monthly",
  },
  render: (args) => <MonthlyDemo {...args} />,
};
