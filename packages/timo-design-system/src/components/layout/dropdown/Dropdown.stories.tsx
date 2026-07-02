import { Dropdown } from "./Dropdown";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/layout/Dropdown",
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light-gray",
      values: [
        { name: "light-gray", value: "#F5F5F5" },
        { name: "dark", value: "#333333" },
        { name: "white", value: "#FFFFFF" },
      ],
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_ITEMS = ["옵션 1", "옵션 2", "옵션 3"];

export const Default: Story = {
  name: "Basic Usage",
  render: () => (
    <Dropdown>
      <Dropdown.Trigger className="typo-headline-r-14 text-timo-black rounded-4 bg-timo-gray-300 px-3 py-1.5">
        트리거
      </Dropdown.Trigger>

      <Dropdown.Panel className="gap-1">
        {SAMPLE_ITEMS.map((item) => (
          <Dropdown.Item key={item} className="px-1.5 py-1">
            <span className="typo-headline-r-14 text-timo-black whitespace-nowrap">
              {item}
            </span>
          </Dropdown.Item>
        ))}
      </Dropdown.Panel>
    </Dropdown>
  ),
};
