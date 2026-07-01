import { COLOR_TOKENS } from "@tokens/color-token";

import { Color } from "./Color";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Tokens/Color",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  name: "All Colors",
  render: () => (
    <div
      style={{ fontFamily: "var(--font-family-pretendard)", maxWidth: "600px" }}
    >
      <p style={{ fontSize: "12px", color: "#999", marginBottom: "16px" }} />
      {COLOR_TOKENS.map((token) => (
        <Color key={token.name} {...token} />
      ))}
    </div>
  ),
};
