import { PillButton } from "./PillButton";
import { PlusGrayIcon } from "../../../icons";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Button/PillButton",
  component: PillButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["gray", "blue"],
    },
    children: {
      control: "text",
    },
  },
  args: {
    variant: "gray",
    children: "로그아웃",
    onClick: () => {},
  },
} satisfies Meta<typeof PillButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Blue: Story = {
  args: { variant: "blue", children: "연동하기" },
};

export const WithIcon: Story = {
  args: {
    children: "태그 추가",
    icon: <PlusGrayIcon width={18} height={18} />,
  },
};
