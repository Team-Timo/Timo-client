import { useState } from "react";

import { Calendar } from "./Calendar";

import type { CalendarProps } from "./Calendar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const CalendarDemo = (args: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2026, 5, 24),
  );

  return (
    <Calendar
      {...args}
      value={selectedDate}
      defaultMonth={new Date(2026, 6, 1)}
      onChange={setSelectedDate}
    />
  );
};

export const Default: Story = {
  render: (args) => <CalendarDemo {...args} />,
};
