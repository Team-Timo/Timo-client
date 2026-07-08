import { TagButton } from "./TagButton";
import { PlusGrayIcon } from "../../../icons";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Button/TagButton",
  component: TagButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["gray", "blue"],
    },
    children: {
      control: "text",
    },
  },
  args: {
    variant: "gray",
    children: "과제",
  },
} satisfies Meta<typeof TagButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Blue: Story = {
  args: { variant: "blue", children: "연동하기", onClick: () => {} },
};

export const Removable: Story = {
  args: {
    children: "안녕",
    onRemove: () => {},
    removeLabel: "안녕 태그 삭제",
  },
};

export const WithAddIcon: Story = {
  args: {
    children: "태그 추가",
    icon: <PlusGrayIcon width={18} height={18} />,
    onClick: () => {},
  },
};

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <TagButton>과제</TagButton>
      <TagButton onRemove={() => {}} removeLabel="안녕 태그 삭제">
        안녕
      </TagButton>
      <TagButton
        icon={<PlusGrayIcon width={18} height={18} />}
        onClick={() => {}}
      >
        태그 추가
      </TagButton>
      <TagButton variant="blue" onClick={() => {}}>
        연동하기
      </TagButton>
    </div>
  ),
};
