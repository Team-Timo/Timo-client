import { Header } from "@components/layout/header/Header";
import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

const VIEW_OPTIONS = ["기본", "7일"];

const meta = {
  title: "Components/Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultHeader = () => {
  const [view, setView] = useState("기본");
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Header
      left={
        <>
          <Header.SidebarButton
            isOpen={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          />
          <Header.TodayButton onClick={() => {}} />
        </>
      }
      right={
        <Header.ViewDropdown
          items={VIEW_OPTIONS}
          value={view}
          onChange={setView}
        />
      }
    />
  );
};

const WeeklyHeader = () => {
  const [view, setView] = useState("7일");
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Header
      left={
        <>
          <Header.SidebarButton
            isOpen={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          />
          <Header.WeeklyNav onPrev={() => {}} onNext={() => {}} />
        </>
      }
      right={
        <Header.ViewDropdown
          items={VIEW_OPTIONS}
          value={view}
          onChange={setView}
        />
      }
    />
  );
};

const ChartHeader = () => {
  const [view, setView] = useState("기본");
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Header
      left={
        <>
          <Header.SidebarButton
            isOpen={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          />
          <Header.WeeklyNav onPrev={() => {}} onNext={() => {}} label="6월" />
        </>
      }
      right={
        <Header.ViewDropdown
          items={VIEW_OPTIONS}
          value={view}
          onChange={setView}
        />
      }
    />
  );
};

const ShortHeader = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Header
      left={
        <Header.SidebarButton
          isOpen={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      }
    />
  );
};

const InteractiveHeader = () => {
  const [view, setView] = useState("기본");
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Header
      left={
        <>
          <Header.SidebarButton
            isOpen={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          />
          {view === "기본" && <Header.TodayButton onClick={() => {}} />}
          {view === "7일" && (
            <Header.WeeklyNav onPrev={() => {}} onNext={() => {}} />
          )}
        </>
      }
      right={
        <Header.ViewDropdown
          items={VIEW_OPTIONS}
          value={view}
          onChange={setView}
        />
      }
    />
  );
};

export const Default: Story = {
  render: () => <DefaultHeader />,
};

export const Weekly: Story = {
  render: () => <WeeklyHeader />,
};

export const Chart: Story = {
  render: () => <ChartHeader />,
};

export const Short: Story = {
  render: () => <ShortHeader />,
};

export const Interactive: Story = {
  render: () => <InteractiveHeader />,
};
