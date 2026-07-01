import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Tokens/Scrollbar",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  name: "All Scrollbars",
  render: () => (
    <div className="flex w-[340px] flex-col gap-8">
      <style>{`
        .scrollbar-default::-webkit-scrollbar-thumb { background-color: var(--color-timo-gray-600); }
        .scrollbar-default::-webkit-scrollbar-thumb:hover { background-color: var(--color-timo-gray-700); }
        .scrollbar-hover::-webkit-scrollbar-thumb { background-color: var(--color-timo-gray-700); }
      `}</style>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-timo-gray-800 text-xs">Default (gray-600)</p>
          <div className="scrollbar-default border-timo-gray-500 h-[160px] overflow-y-auto rounded-lg border p-4">
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="text-timo-gray-900 py-1 text-sm">
                아이템 {i + 1}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="text-timo-gray-800 text-xs">Hover (gray-700)</p>
          <div className="scrollbar-hover border-timo-gray-500 h-[160px] overflow-y-auto rounded-lg border p-4">
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="text-timo-gray-900 py-1 text-sm">
                아이템 {i + 1}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-timo-gray-800 text-xs">Horizontal</p>
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
    </div>
  ),
};
