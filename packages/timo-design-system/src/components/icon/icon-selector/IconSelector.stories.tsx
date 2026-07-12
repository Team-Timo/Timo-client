import { useState } from "react";

import { IconSelector } from "./IconSelector";

import type { IconSelectorProps, TodoIconValue } from "./IconSelector";
import type { Meta, StoryObj } from "@storybook/react";

const InteractiveDemo = (args: IconSelectorProps) => {
  const [selected, setSelected] = useState<TodoIconValue | null>(
    args.selected ?? null,
  );

  return (
    <IconSelector
      selected={selected}
      onSelect={setSelected}
      onRemove={() => setSelected(null)}
    />
  );
};

const meta = {
  title: "Components/Icon/IconSelector",
  component: IconSelector,
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
    selected: {
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
} satisfies Meta<typeof IconSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: null,
    onSelect: () => {},
    onRemove: () => {},
  },
};

export const 선택됨: Story = {
  args: {
    selected: "ICON_1",
    onSelect: () => {},
    onRemove: () => {},
  },
};

export const Interactive: Story = {
  args: {
    selected: null,
    onSelect: () => {},
    onRemove: () => {},
  },
  render: (args) => <InteractiveDemo {...args} />,
};
