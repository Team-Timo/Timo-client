import * as Icons from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Tokens/Icons",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  name: "All Icons",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: "16px",
        width: "100%",
        fontFamily: "var(--font-family-pretendard)",
      }}
    >
      {Object.entries(Icons).map(([name, Icon]) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            padding: "12px",
            border: "1px solid #eee",
            borderRadius: "8px",
          }}
        >
          <Icon width={24} height={24} />
          <span
            style={{ fontSize: "11px", color: "#666", textAlign: "center" }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};
