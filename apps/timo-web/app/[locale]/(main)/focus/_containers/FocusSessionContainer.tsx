"use client";

import { TimerOnIcon } from "@repo/timo-design-system/icons";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

import type { FocusTask } from "@/app/[locale]/(main)/focus/_types/task-type";

import { FocusTaskItem } from "@/app/[locale]/(main)/focus/_components/FocusTaskItem";
import { FocusHeaderContainer } from "@/app/[locale]/(main)/focus/_containers/FocusHeaderContainer";
import { focusTaskMock } from "@/app/[locale]/(main)/focus/_mocks/task-mock";
import {
  convertDateToBadgeText,
  convertDateToDayNumberText,
  convertDateToDayOfWeekKey,
} from "@/app/[locale]/(main)/focus/_utils/date";
import { convertDurationToMinutes } from "@/app/[locale]/(main)/focus/_utils/duration";
import { Timer } from "@/components/timer/Timer";
import {
  TimerSessionControls,
  type TimerSessionControlsHandle,
} from "@/components/timer/TimerSessionControls";
import { convertDurationToTimeText } from "@/utils/convert-duration-to-time-text";

const SECONDS_PER_MINUTE = 60;

export const FocusSessionContainer = () => {
  const [task, setTask] = useState<FocusTask>(focusTaskMock);
  const today = new Date();
  const timerSessionControlsRef = useRef<TimerSessionControlsHandle>(null);
  const tWeekday = useTranslations("Common.weekday");

  const handleTogglePlay = () => {
    // TODO: API
    setTask((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const handleExtendTimer = (minutes: number) => {
    // TODO: API
    setTask((prev) => ({
      ...prev,
      durationSeconds: prev.durationSeconds + minutes * SECONDS_PER_MINUTE,
    }));
  };

  const handleCompleteTimer = () => {
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

  const handleToggleCompleted = (completed: boolean) => {
    if (completed && task.isRunning) {
      timerSessionControlsRef.current?.openStopModal();
      return;
    }

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

  const plannedMinutes = convertDurationToMinutes(task.durationSeconds);

  return (
    <div className="flex h-full overflow-x-auto">
      <div className="flex flex-1 flex-col gap-18">
        <FocusHeaderContainer />
        <FocusTaskItem
          dayNumber={convertDateToDayNumberText(today)}
          dayOfWeek={tWeekday(convertDateToDayOfWeekKey(today))}
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

          <TimerSessionControls
            ref={timerSessionControlsRef}
            isRunning={task.isRunning}
            onTogglePlay={handleTogglePlay}
            plannedMinutes={plannedMinutes}
            actualMinutes={plannedMinutes}
            onExtend={handleExtendTimer}
            onComplete={handleCompleteTimer}
          />
        </div>
      </section>
    </div>
  );
};
