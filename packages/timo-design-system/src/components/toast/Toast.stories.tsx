import { Toast } from "./Toast";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    message: {
      control: false,
      description: "토스트 내부에 표시할 메시지 (ReactNode)",
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: (
      <>
        <p className="mb-0">
          완료되지 않은 투두는{" "}
          <span className="text-timo-blue-300">최대 20개</span>
          까지 추가할 수 있어요.
        </p>
        <p>새로운 투두를 추가하려면 기존 투두를 완료해주세요.</p>
      </>
    ),
  },
};

export const English: Story = {
  args: {
    message: (
      <>
        <p className="mb-0">
          You can add up to{" "}
          <span className="text-timo-blue-300">20 incomplete todos</span>.
        </p>
        <p>Complete an existing todo to add a new one.</p>
      </>
    ),
  },
};
