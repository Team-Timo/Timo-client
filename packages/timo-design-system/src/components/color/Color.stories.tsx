
import { Color } from "./Color";
import { COLOR_TOKENS } from "../../tokens/colort-token";

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
    <div style={{ fontFamily: "sans-serif", maxWidth: "600px" }}>
      <p style={{ fontSize: "12px", color: "#999", marginBottom: "16px" }}>
        ⚠️ 피그마 MCP 연동 후 실제 값으로 업데이트 예정입니다.
      </p>
      {COLOR_TOKENS.map((token) => (
        <Color key={token.name} {...token} />
      ))}
    </div>
  ),
};
