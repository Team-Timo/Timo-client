import { useState } from "react";

import { Checkbox } from "./Checkbox";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    checked: false,
    disabled: false,
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const PlaygroundCheckbox = (args: React.ComponentProps<typeof Checkbox>) => {
  const [checked, setChecked] = useState(args.checked);
  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

export const Playground: Story = {
  render: (args) => <PlaygroundCheckbox {...args} />,
};

export const AllStates: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Checkbox checked={false} onChange={() => {}} />
        <p className="text-xs">Unchecked</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox checked={true} onChange={() => {}} />
        <p className="text-xs">Checked</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox checked={true} disabled onChange={() => {}} />
        <p className="text-xs">Disabled</p>
      </div>
    </div>
  ),
};
