import { TabButton } from "@components/button/tab-button/TabButton";
import {
  ChartHoverIcon,
  ChartOffIcon,
  ChartOnIcon,
  HomeHoverIcon,
  HomeOffIcon,
  HomeOnIcon,
  SettingHoverIcon,
  SettingOffIcon,
  SettingOnIcon,
  TimerHoverIcon,
  TimerOffIcon,
  TimerOnIcon,
  TodayHoverIcon,
  TodayOffIcon,
  TodayOnIcon,
} from "@icons";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Button/TabButton",
  component: TabButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
    },
    isSelected: {
      control: "boolean",
    },
  },
  args: {
    label: "홈",
    icon: <HomeOffIcon width={24} height={24} />,
    hoverIcon: <HomeHoverIcon width={24} height={24} />,
    isSelected: false,
  },
} satisfies Meta<typeof TabButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-3">
        <TabButton
          label="홈"
          icon={<HomeOnIcon width={24} height={24} />}
          isSelected
        />
        <TabButton
          label="홈"
          icon={<HomeOffIcon width={24} height={24} />}
          hoverIcon={<HomeHoverIcon width={24} height={24} />}
        />
        <TabButton label="홈" icon={<HomeOffIcon width={24} height={24} />} />
      </div>

      <div className="flex flex-col gap-3">
        <TabButton
          label="오늘"
          icon={<TodayOnIcon width={24} height={24} />}
          isSelected
        />
        <TabButton
          label="오늘"
          icon={<TodayOffIcon width={24} height={24} />}
          hoverIcon={<TodayHoverIcon width={24} height={24} />}
        />
        <TabButton
          label="오늘"
          icon={<TodayOffIcon width={24} height={24} />}
        />
      </div>

      <div className="flex flex-col gap-3">
        <TabButton
          label="집중 모드"
          icon={<TimerOnIcon width={24} height={24} />}
          isSelected
        />
        <TabButton
          label="집중 모드"
          icon={<TimerOffIcon width={24} height={24} />}
          hoverIcon={<TimerHoverIcon width={24} height={24} />}
        />
        <TabButton
          label="집중 모드"
          icon={<TimerOffIcon width={24} height={24} />}
        />
      </div>

      <div className="flex flex-col gap-3">
        <TabButton
          label="통계"
          icon={<ChartOnIcon width={24} height={24} />}
          isSelected
        />
        <TabButton
          label="통계"
          icon={<ChartOffIcon width={24} height={24} />}
          hoverIcon={<ChartHoverIcon width={24} height={24} />}
        />
        <TabButton
          label="통계"
          icon={<ChartOffIcon width={24} height={24} />}
        />
      </div>

      <div className="flex flex-col gap-3">
        <TabButton
          label="설정"
          icon={<SettingOnIcon width={24} height={24} />}
          isSelected
        />
        <TabButton
          label="설정"
          icon={<SettingOffIcon width={24} height={24} />}
          hoverIcon={<SettingHoverIcon width={24} height={24} />}
        />
        <TabButton
          label="설정"
          icon={<SettingOffIcon width={24} height={24} />}
        />
      </div>
    </div>
  ),
};
