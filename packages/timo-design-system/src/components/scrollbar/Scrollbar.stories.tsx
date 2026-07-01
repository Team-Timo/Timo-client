import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Tokens/Scrollbar",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex w-[340px] flex-col gap-6">
      <div className="border-timo-gray-500 h-[200px] overflow-y-auto rounded-lg border p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-timo-gray-900 py-1 text-sm">
            아이템 {i + 1}
          </p>
        ))}
      </div>

      <div className="border-timo-gray-500 overflow-x-auto rounded-lg border p-4">
        <div className="flex w-[800px] gap-3">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="bg-timo-gray-300 text-timo-gray-900 flex h-[60px] w-[100px] shrink-0 items-center justify-center rounded-lg text-sm"
            >
              아이템 {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
