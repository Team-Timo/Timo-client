import { TagChip } from "./TagChip";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Tag/TagChip",
  component: TagChip,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: "text",
    },
  },
  args: {
    children: "과제",
  },
} satisfies Meta<typeof TagChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Removable: Story = {
  args: {
    children: "안녕",
    onRemove: () => {},
    removeLabel: "안녕 태그 삭제",
  },
};

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <TagChip>과제</TagChip>
      <TagChip onRemove={() => {}} removeLabel="안녕 태그 삭제">
        안녕
      </TagChip>
    </div>
  ),
};
