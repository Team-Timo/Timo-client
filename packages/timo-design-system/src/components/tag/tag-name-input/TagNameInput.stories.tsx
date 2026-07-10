import { useState } from "react";

import { TagNameInput } from "./TagNameInput";

import type { TagNameInputProps } from "./TagNameInput";
import type { Meta, StoryObj } from "@storybook/react";

const HINTS = {
  maxLengthHint: "태그 이름은 최대 10자까지 입력할 수 있어요",
  duplicateHint: "이미 사용 중인 이름은 등록할 수 없어요",
};

const InteractiveDemo = (args: TagNameInputProps) => {
  const [value, setValue] = useState(args.value);

  return <TagNameInput {...args} value={value} onChange={setValue} />;
};

const meta = {
  title: "Components/Tag/TagNameInput",
  component: TagNameInput,
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
} satisfies Meta<typeof TagNameInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    onChange: () => {},
    ...HINTS,
  },
  render: (args) => <InteractiveDemo {...args} />,
};

export const Error: Story = {
  args: {
    value: "일상",
    onChange: () => {},
    isError: true,
    ...HINTS,
  },
  render: (args) => <InteractiveDemo {...args} />,
};
