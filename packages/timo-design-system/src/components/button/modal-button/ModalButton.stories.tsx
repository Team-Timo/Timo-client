import { ModalButton } from "@components/button/modal-button/ModalButton";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Button/ModalButton",
  component: ModalButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: { control: "radio", options: ["fill", "border"] },
    onClick: { action: "clicked" },
  },
  args: {
    variant: "fill",
    children: "삭제하기",
  },
} satisfies Meta<typeof ModalButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex gap-3">
      <ModalButton variant="border">돌아가기</ModalButton>
      <ModalButton variant="fill">삭제하기</ModalButton>
    </div>
  ),
};

export const CustomWidth: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-[400px] gap-3">
      <ModalButton variant="border" className="w-full px-0">
        돌아가기
      </ModalButton>
      <ModalButton variant="fill" className="w-full px-0">
        삭제하기
      </ModalButton>
    </div>
  ),
};
