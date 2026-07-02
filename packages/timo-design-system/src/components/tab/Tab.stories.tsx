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
import { useState } from "react";

import { Tab } from "./Tab";

import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";

const meta = {
  title: "Components/Tab",
  component: Tab,
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
    onClick: {
      action: "clicked",
    },
  },
  args: {
    label: "홈",
    icon: <HomeOffIcon width={24} height={24} />,
    hoverIcon: <HomeHoverIcon width={24} height={24} />,
    isSelected: false,
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-3">
        <Tab
          label="홈"
          icon={<HomeOnIcon width={24} height={24} />}
          isSelected
        />
        <Tab
          label="홈"
          icon={<HomeOffIcon width={24} height={24} />}
          hoverIcon={<HomeHoverIcon width={24} height={24} />}
        />
        <Tab label="홈" icon={<HomeOffIcon width={24} height={24} />} />
      </div>

      <div className="flex flex-col gap-3">
        <Tab
          label="오늘"
          icon={<TodayOnIcon width={24} height={24} />}
          isSelected
        />
        <Tab
          label="오늘"
          icon={<TodayOffIcon width={24} height={24} />}
          hoverIcon={<TodayHoverIcon width={24} height={24} />}
        />
        <Tab label="오늘" icon={<TodayOffIcon width={24} height={24} />} />
      </div>

      <div className="flex flex-col gap-3">
        <Tab
          label="집중 모드"
          icon={<TimerOnIcon width={24} height={24} />}
          isSelected
        />
        <Tab
          label="집중 모드"
          icon={<TimerOffIcon width={24} height={24} />}
          hoverIcon={<TimerHoverIcon width={24} height={24} />}
        />
        <Tab label="집중 모드" icon={<TimerOffIcon width={24} height={24} />} />
      </div>

      <div className="flex flex-col gap-3">
        <Tab
          label="통계"
          icon={<ChartOnIcon width={24} height={24} />}
          isSelected
        />
        <Tab
          label="통계"
          icon={<ChartOffIcon width={24} height={24} />}
          hoverIcon={<ChartHoverIcon width={24} height={24} />}
        />
        <Tab label="통계" icon={<ChartOffIcon width={24} height={24} />} />
      </div>

      <div className="flex flex-col gap-3">
        <Tab
          label="설정"
          icon={<SettingOnIcon width={24} height={24} />}
          isSelected
        />
        <Tab
          label="설정"
          icon={<SettingOffIcon width={24} height={24} />}
          hoverIcon={<SettingHoverIcon width={24} height={24} />}
        />
        <Tab label="설정" icon={<SettingOffIcon width={24} height={24} />} />
      </div>
    </div>
  ),
};

const InteractiveHomeTab = (args: ComponentProps<typeof Tab>) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Tab
      {...args}
      label="홈"
      icon={
        isSelected ? (
          <HomeOnIcon width={24} height={24} />
        ) : (
          <HomeOffIcon width={24} height={24} />
        )
      }
      hoverIcon={<HomeHoverIcon width={24} height={24} />}
      isSelected={isSelected}
      onClick={() => {
        args.onClick?.();
        setIsSelected((prevIsSelected) => !prevIsSelected);
      }}
    />
  );
};

export const Interactive: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: (args) => <InteractiveHomeTab {...args} />,
};
