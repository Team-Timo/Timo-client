import { useState } from "react";

import { DateSelector } from "./DateSelector";

import type { Meta, StoryObj } from "@storybook/react";

const TRIGGER = (
  <span className="typo-headline-r-14 text-timo-black rounded-4 bg-timo-gray-300 px-3 py-1.5">
    날짜 선택
  </span>
);

const meta = {
  title: "Components/Calendar/DateSelector",
  component: DateSelector,
  parameters: {
    layout: "centered",
  },
  args: {
    trigger: TRIGGER,
  },
} satisfies Meta<typeof DateSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const DateSelectorDemo = () => {
  const [value, setValue] = useState<Date | undefined>();

  return <DateSelector trigger={TRIGGER} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: () => <DateSelectorDemo />,
};
