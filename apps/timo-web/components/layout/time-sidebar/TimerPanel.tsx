"use client";

import { TimerOnIcon } from "@repo/timo-design-system/icons";
import { useState } from "react";

import { Timer } from "@/components/timer/Timer";
import { TimerControls } from "@/components/timer/TimerControls";

export const TimerPanel = () => {
  const [isRunning, setIsRunning] = useState(false);

  const handleTogglePlay = () => setIsRunning((prev) => !prev);
  const handleEnd = () => setIsRunning(false);
  const handleAddTime = () => {};

  return (
    <div className="flex flex-col items-center gap-11.25">
      <Timer
        icon={<TimerOnIcon />}
        time="10:30"
        durationLabel="12M"
        progress={70}
        size="sm"
      />

      <TimerControls
        isRunning={isRunning}
        onTogglePlay={handleTogglePlay}
        onEnd={handleEnd}
        onAddTime={handleAddTime}
      />
    </div>
  );
};
