import type { Meta, StoryObj } from "@storybook/react-vite";

const Introduction = () => (
  <div>
    <h1>Timo Design System</h1>
    <p>디자인 시스템 확정 후 공통 컴포넌트와 아이콘을 추가합니다.</p>
  </div>
);

const meta: Meta<typeof Introduction> = {
  title: "Introduction",
  component: Introduction,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Introduction> = {};
