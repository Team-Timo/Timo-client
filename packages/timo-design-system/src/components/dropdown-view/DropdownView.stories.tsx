import { DropdownView } from "@components/dropdown-view/DropdownView";
import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/DropdownView",
  component: DropdownView,
  parameters: { layout: "centered" },
} satisfies Meta<typeof DropdownView>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultStory = () => {
  const [value, setValue] = useState("");
  return (
    <DropdownView items={["기본", "7일"]} value={value} onChange={setValue} />
  );
};

export const Default: Story = {
  args: { items: [], value: "", onChange: () => {} },
  render: () => <DefaultStory />,
};
