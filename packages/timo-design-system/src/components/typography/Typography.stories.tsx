
import { Typography } from "./Typography";
import { TYPOGRAPHY_TOKENS } from "../../tokens/typography-token";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Tokens/Typography",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div style={{ fontFamily: "sans-serif", maxWidth: "700px" }}>
      <p style={{ fontSize: "12px", color: "#999", marginBottom: "24px" }}>
        ⚠️ 피그마 MCP 연동 후 실제 값으로 업데이트 예정입니다.
      </p>
      {TYPOGRAPHY_TOKENS.map((row) => (
        <Typography key={row.token} {...row} />
      ))}
    </div>
  ),
};
