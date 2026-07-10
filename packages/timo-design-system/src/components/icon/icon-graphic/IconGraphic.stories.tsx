import { IconGraphic } from "./IconGraphic";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Icon/IconGraphic",
  component: IconGraphic,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light-gray",
      values: [
        { name: "light-gray", value: "#F5F5F5" },
        { name: "white", value: "#FFFFFF" },
      ],
    },
  },
  argTypes: {
    icon: {
      control: "select",
      options: [
        "ICON_1",
        "ICON_2",
        "ICON_3",
        "ICON_4",
        "ICON_5",
        "ICON_6",
        "ICON_7",
        "ICON_8",
      ],
    },
  },
} satisfies Meta<typeof IconGraphic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { icon: "ICON_1" },
};

export const 관계: Story = {
  args: { icon: "ICON_4" },
};
