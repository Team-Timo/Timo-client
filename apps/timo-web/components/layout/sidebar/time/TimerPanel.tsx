"use client";

import { TimerOnIcon } from "@repo/timo-design-system/icons";
import { useState } from "react";

import { Timer } from "@/components/timer/Timer";
import { TimerSessionControls } from "@/components/timer/TimerSessionControls";

type TimerStatus = "RUNNING" | "PAUSED";

const PLANNED_MINUTES = 12;

export const TimerPanel = () => {
  const [status, setStatus] = useState<TimerStatus>("PAUSED");

  const handleTogglePlay = () =>
    setStatus((prev) => (prev === "RUNNING" ? "PAUSED" : "RUNNING"));
  const handleExtendTimer = () => {};
  const handleCompleteTimer = () => setStatus("PAUSED");
  const handleStopTimer = () => setStatus("PAUSED");

  return (
    <div className="flex flex-col items-center gap-11.25">
      <Timer
        icon={<TimerOnIcon />}
        time="10:30"
        plannedLabel="12M"
        progress={70}
        size="sm"
      />

      <TimerSessionControls
        isRunning={status === "RUNNING"}
        onTogglePlay={handleTogglePlay}
        plannedMinutes={PLANNED_MINUTES}
        actualMinutes={PLANNED_MINUTES}
        onExtend={handleExtendTimer}
        onComplete={handleCompleteTimer}
        onStop={handleStopTimer}
      />
    </div>
  );
};
