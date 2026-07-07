import { useEffect, useState } from "react";

import { TogglePanel } from "./TogglePanel";

import type { Meta, StoryObj } from "@storybook/react";

const TIMEBOX_TIMER_OPTIONS = [
  { value: "timebox", label: "Timebox" },
  { value: "timer", label: "Timer" },
] as const;

const meta = {
  title: "Components/TogglePanel",
  component: TogglePanel,
  parameters: {
    layout: "centered",
  },
  args: {
    value: "timebox",
    onChange: () => {},
    options: TIMEBOX_TIMER_OPTIONS,
  },
} satisfies Meta<typeof TogglePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const PlaygroundTogglePanel = ({
  width,
  ...args
}: React.ComponentProps<typeof TogglePanel> & { width: string }) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <div className={width}>
      <TogglePanel {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <PlaygroundTogglePanel {...args} width="w-67" />,
};

export const Big: Story = {
  args: {
    value: "timer",
  },
  render: (args) => <PlaygroundTogglePanel {...args} width="w-101" />,
};

const TogglePanelWithPanel = (
  args: React.ComponentProps<typeof TogglePanel>,
) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <div className="w-67">
      <TogglePanel
        {...args}
        id="toggle-panel-demo"
        value={value}
        onChange={setValue}
        options={[
          {
            ...TIMEBOX_TIMER_OPTIONS[0],
            controls: "toggle-panel-demo-timebox-panel",
          },
          {
            ...TIMEBOX_TIMER_OPTIONS[1],
            controls: "toggle-panel-demo-timer-panel",
          },
        ]}
      />
      <div
        id="toggle-panel-demo-timebox-panel"
        role="tabpanel"
        aria-labelledby="toggle-panel-demo-timebox-tab"
        hidden={value !== "timebox"}
        className="bg-timo-blue-100 mt-4 rounded-lg p-4 text-sm"
      >
        Timebox 관련 콘텐츠 영역
      </div>
      <div
        id="toggle-panel-demo-timer-panel"
        role="tabpanel"
        aria-labelledby="toggle-panel-demo-timer-tab"
        hidden={value !== "timer"}
        className="border-timo-gray-500 mt-4 rounded-lg border p-4 text-sm"
      >
        Timer 관련 콘텐츠 영역
      </div>
    </div>
  );
};

export const WithPanel: Story = {
  render: (args) => <TogglePanelWithPanel {...args} />,
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <p className="text-xs">Default (268px)</p>
        <div className="w-67">
          <TogglePanel
            value="timebox"
            onChange={() => {}}
            options={TIMEBOX_TIMER_OPTIONS}
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-xs">Big (404px)</p>
        <div className="w-101">
          <TogglePanel
            value="timer"
            onChange={() => {}}
            options={TIMEBOX_TIMER_OPTIONS}
          />
        </div>
      </div>
    </div>
  ),
};
