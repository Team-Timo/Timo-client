import { useState } from "react";

import { SidebarButton } from "./SidebarButton";

import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";

const meta = {
  title: "Components/Button/SidebarButton",
  component: SidebarButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isOpen: { control: "boolean" },
    onClick: { action: "clicked" },
  },
  args: {
    isOpen: true,
  },
} satisfies Meta<typeof SidebarButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex gap-4">
      <div className="flex flex-col items-center gap-2">
        <SidebarButton isOpen={true} />
        <span className="typo-caption-r-10 text-timo-gray-800">열림</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SidebarButton isOpen={false} />
        <span className="typo-caption-r-10 text-timo-gray-800">닫힘</span>
      </div>
    </div>
  ),
};

const InteractiveSidebarButton = (
  args: ComponentProps<typeof SidebarButton>,
) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarButton
      {...args}
      isOpen={isOpen}
      onClick={() => {
        args.onClick?.();
        setIsOpen((prev) => !prev);
      }}
    />
  );
};

export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => <InteractiveSidebarButton {...args} />,
};
