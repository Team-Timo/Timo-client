import { useState } from "react";

import { Dropdown } from "./Dropdown";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultStory = () => {
  const [value, setValue] = useState("");
  return <Dropdown items={["기본", "7일"]} value={value} onChange={setValue} />;
};

export const Default: Story = {
  args: { items: [], value: "", onChange: () => {} },
  render: () => <DefaultStory />,
};
