"use client";

import { TimerOnIcon } from "@repo/timo-design-system/icons";
import { useState } from "react";

import type { FocusTask } from "@/app/[locale]/(main)/focus/_types/task-type";

import { FocusTaskCard } from "@/app/[locale]/(main)/focus/_components/FocusTaskCard";
import { FocusHeaderContainer } from "@/app/[locale]/(main)/focus/_containers/FocusHeaderContainer";
import { focusTaskMock } from "@/app/[locale]/(main)/focus/_mocks/task-mock";
import {
  convertDateToBadgeText,
  convertDateToDayNumberText,
  convertDateToDayOfWeekText,
} from "@/app/[locale]/(main)/focus/_utils/date";
import { convertDurationToTimeText } from "@/app/[locale]/(main)/focus/_utils/duration";
import { Timer } from "@/components/timer/Timer";
import { TimerControls } from "@/components/timer/TimerControls";

export const FocusSessionContainer = () => {
  const [task, setTask] = useState<FocusTask>(focusTaskMock);
  const today = new Date();

  const handleTogglePlay = () => {
    // TODO: API
    setTask((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const handleEnd = () => {
    // TODO: API
    setTask((prev) => ({
      ...prev,
      isRunning: false,
      completed: true,
      subtasks: prev.subtasks.map((subtask) => ({
        ...subtask,
        completed: true,
      })),
    }));
  };

  const handleAddTime = () => {};

  const handleToggleCompleted = (completed: boolean) => {
    // TODO: API
    setTask((prev) => ({
      ...prev,
      completed,
      isRunning: completed ? false : prev.isRunning,
      subtasks: prev.subtasks.map((subtask) => ({ ...subtask, completed })),
    }));
  };

  const handleToggleSubtaskCompleted = (
    subtaskId: number,
    completed: boolean,
  ) => {
    // TODO: API
    setTask((prev) => ({
      ...prev,
      subtasks: prev.subtasks.map((subtask) =>
        subtask.subtaskId === subtaskId ? { ...subtask, completed } : subtask,
      ),
    }));
  };

  return (
    <div className="flex h-full">
      <div className="flex min-w-0 flex-1 flex-col gap-18">
        <FocusHeaderContainer />
        <FocusTaskCard
          dayNumber={convertDateToDayNumberText(today)}
          dayOfWeek={convertDateToDayOfWeekText(today)}
          title={task.title}
          completed={task.completed}
          dateText={convertDateToBadgeText(task.scheduledDate)}
          durationText={convertDurationToTimeText(task.durationSeconds)}
          isRunning={task.isRunning}
          subtasks={task.subtasks}
          memo={task.memo}
          onToggleCompleted={handleToggleCompleted}
          onTogglePlay={handleTogglePlay}
          onToggleSubtaskCompleted={handleToggleSubtaskCompleted}
        />
      </div>

      <section className="border-timo-gray-500 flex h-full w-136.5 shrink-0 items-center border-l bg-white">
        <div className="flex w-full flex-col items-center gap-11.25">
          <Timer
            icon={<TimerOnIcon />}
            time="10:30"
            plannedLabel="12M"
            progress={70}
            size="lg"
          />

          <TimerControls
            isRunning={task.isRunning}
            onTogglePlay={handleTogglePlay}
            onEnd={handleEnd}
            onAddTime={handleAddTime}
          />
        </div>
      </section>
    </div>
  );
};
