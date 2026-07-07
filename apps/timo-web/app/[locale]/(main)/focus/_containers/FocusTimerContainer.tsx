"use client";

import { TimerOnIcon } from "@repo/timo-design-system/icons";
import { useState } from "react";

import { Timer } from "@/components/timer/Timer";
import { TimerControls } from "@/components/timer/TimerControls";

type TimerStatus = "RUNNING" | "PAUSED";

export const FocusTimerContainer = () => {
  const [status, setStatus] = useState<TimerStatus>("PAUSED");

  const handleTogglePlay = () =>
    setStatus((prev) => (prev === "RUNNING" ? "PAUSED" : "RUNNING"));
  const handleEnd = () => setStatus("PAUSED");
  const handleAddTime = () => {};

  return (
    <div className="flex w-[546px] flex-col items-center gap-11.25">
      <Timer
        icon={<TimerOnIcon />}
        time="10:30"
        plannedLabel="12M"
        progress={70}
        size="lg"
      />

      <TimerControls
        isRunning={status === "RUNNING"}
        onTogglePlay={handleTogglePlay}
        onEnd={handleEnd}
        onAddTime={handleAddTime}
      />
    </div>
  );
};
