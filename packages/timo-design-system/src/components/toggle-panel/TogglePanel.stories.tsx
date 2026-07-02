import { useState } from "react";

import { TogglePanel } from "./TogglePanel";

import type { TogglePanelValue } from "./TogglePanel";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/TogglePanel",
  component: TogglePanel,
  parameters: {
    layout: "centered",
  },
  args: {
    value: "timebox",
    onChange: () => {},
  },
} satisfies Meta<typeof TogglePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const PlaygroundTogglePanel = ({
  width,
  ...args
}: React.ComponentProps<typeof TogglePanel> & { width: string }) => {
  const [value, setValue] = useState<TogglePanelValue>(args.value);
  return (
    <div className={width}>
      <TogglePanel {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <PlaygroundTogglePanel {...args} width="w-67" />,
};

export const Big: Story = {
  args: {
    value: "timer",
  },
  render: (args) => <PlaygroundTogglePanel {...args} width="w-101" />,
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <p className="text-xs">Default (268px)</p>
        <div className="w-67">
          <TogglePanel value="timebox" onChange={() => {}} />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-xs">Big (404px)</p>
        <div className="w-101">
          <TogglePanel value="timer" onChange={() => {}} />
        </div>
      </div>
    </div>
  ),
};
