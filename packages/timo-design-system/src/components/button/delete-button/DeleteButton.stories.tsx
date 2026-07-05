import { DeleteButton } from "@components/button/delete-button/DeleteButton";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Button/DeleteButton",
  component: DeleteButton,
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
} satisfies Meta<typeof DeleteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onClick: () => {} },
};
