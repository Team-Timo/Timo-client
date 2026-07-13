"use client";

import { TimerOnIcon } from "@repo/timo-design-system/icons";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

import { getGetFocusTodoQueryKey } from "@/api/generated/endpoints/focus/focus";
import {
  useChangeStatus,
  useCompleteTimer,
  useExtendTimer,
  useStartTimer,
  useStopTimer,
  getGetActiveTimerQueryKey,
} from "@/api/generated/endpoints/timer/timer";
import {
  useChangeSubtaskStatus,
  useChangeTodoStatus,
} from "@/api/generated/endpoints/todo/todo";
import { FocusEmptyTaskItem } from "@/app/[locale]/(main)/focus/_components/FocusEmptyTaskItem";
import { FocusTaskItem } from "@/app/[locale]/(main)/focus/_components/FocusTaskItem";
import { FocusHeaderContainer } from "@/app/[locale]/(main)/focus/_containers/FocusHeaderContainer";
import { useFocusTodo } from "@/app/[locale]/(main)/focus/_queries/use-focus-todo";
import {
  convertDateToBadgeText,
  convertDateToDayNumberText,
  convertDateToDayOfWeekKey,
} from "@/app/[locale]/(main)/focus/_utils/date";
import { Timer } from "@/components/timer/Timer";
import {
  TimerSessionControls,
  type TimerSessionControlsHandle,
} from "@/components/timer/TimerSessionControls";
import { AnimatedToast } from "@/components/toast/AnimatedToast";
import { useActiveTimer } from "@/hooks/use-active-timer";
import { convertDurationToMinutes } from "@/utils/convert-duration-to-minutes";
import { convertDurationToTimeText } from "@/utils/convert-duration-to-time-text";
import { formatDurationLabel } from "@/utils/format-duration-label";

export const FocusSessionContainer = () => {
  const queryClient = useQueryClient();
  const timerSessionControlsRef = useRef<TimerSessionControlsHandle>(null);
  const tWeekday = useTranslations("Common.weekday");
  const tDuration = useTranslations("Focus.duration");
  const tToast = useTranslations("Toast");
  const [feedbackText, setFeedbackText] = useState<string | undefined>();
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);

  const { data: focusView } = useFocusTodo();
  const { data: activeTimer } = useActiveTimer();

  const invalidateActiveTimer = () =>
    queryClient.invalidateQueries({ queryKey: getGetActiveTimerQueryKey() });
  const invalidateFocusTodo = () =>
    queryClient.invalidateQueries({ queryKey: getGetFocusTodoQueryKey() });
  const handleMutationError = () => setIsErrorToastOpen(true);

  const { mutate: startTimer } = useStartTimer({
    mutation: {
      onSuccess: invalidateActiveTimer,
      onError: handleMutationError,
    },
  });
  const { mutate: changeStatus } = useChangeStatus({
    mutation: {
      onSuccess: invalidateActiveTimer,
      onError: handleMutationError,
    },
  });
  const { mutate: extendTimer } = useExtendTimer({
    mutation: {
      onSuccess: invalidateActiveTimer,
      onError: handleMutationError,
    },
  });
  const { mutate: completeTimer } = useCompleteTimer({
    mutation: {
      onSuccess: (response) => {
        setFeedbackText(response.data?.aiFeedback ?? undefined);
        invalidateActiveTimer();
        invalidateFocusTodo();
      },
      onError: handleMutationError,
    },
  });
  const { mutate: stopTimer } = useStopTimer({
    mutation: {
      onSuccess: (response) => {
        setFeedbackText(response.data?.aiFeedback ?? undefined);
        invalidateActiveTimer();
        invalidateFocusTodo();
      },
      onError: handleMutationError,
    },
  });
  const { mutate: changeTodoStatus } = useChangeTodoStatus({
    mutation: { onSuccess: invalidateFocusTodo, onError: handleMutationError },
  });
  const { mutate: changeSubtaskStatus } = useChangeSubtaskStatus({
    mutation: { onSuccess: invalidateFocusTodo, onError: handleMutationError },
  });

  const todo = focusView.todo;
  const timer =
    activeTimer && todo && activeTimer.todoId === todo.todoId
      ? activeTimer
      : undefined;
  const isRunning = timer?.status === "RUNNING";

  const handleTogglePlay = () => {
    if (!todo) return;

    if (!timer) {
      startTimer({ todoId: todo.todoId });
      return;
    }

    changeStatus({
      timerId: timer.timerId,
      data: { action: isRunning ? "PAUSE" : "RESUME" },
    });
  };

  const handleExtendTimer = (minutes: number) => {
    if (!timer) return;

    extendTimer({ timerId: timer.timerId, data: { extendMinutes: minutes } });
  };

  const handleCompleteTimer = () => {
    if (!timer) return;

    completeTimer({ timerId: timer.timerId });
  };

  const handleStopTimer = () => {
    if (!timer) return;

    stopTimer({ timerId: timer.timerId });
  };

  const handleToggleCompleted = (completed: boolean) => {
    if (!todo) return;

    if (completed && timer) {
      timerSessionControlsRef.current?.openStopModal();
      return;
    }

    changeTodoStatus({
      todoId: todo.todoId,
      data: { isCompleted: completed, date: focusView.date },
    });
  };

  const handleToggleSubtaskCompleted = (
    subtaskId: number,
    completed: boolean,
  ) => {
    if (!todo) return;

    changeSubtaskStatus({
      todoId: todo.todoId,
      subtaskId,
      data: { isCompleted: completed },
    });
  };

  const today = new Date(focusView.date);
  const dateText = convertDateToBadgeText(today);

  if (!focusView.hasTodo || !todo) {
    return (
      <div className="flex h-full overflow-x-auto">
        <AnimatedToast
          isOpen={isErrorToastOpen}
          onClose={() => setIsErrorToastOpen(false)}
          message={tToast("focusActionFailed")}
        />
        <div className="flex flex-1 flex-col gap-18">
          <FocusHeaderContainer />
          <FocusEmptyTaskItem
            dayNumber={convertDateToDayNumberText(today)}
            dayOfWeek={tWeekday(convertDateToDayOfWeekKey(today))}
            dateText={dateText}
          />
        </div>

        <section className="border-timo-gray-500 flex h-full w-136.5 shrink-0 items-center border-l bg-white">
          <div className="flex w-full flex-col items-center gap-11.25">
            <Timer time="00:00" plannedLabel="0M" progress={0} size="lg" />

            <TimerSessionControls
              isRunning={false}
              onTogglePlay={() => {}}
              plannedMinutes={0}
              actualMinutes={0}
              isTimeUp={false}
              onExtend={() => {}}
              onComplete={() => {}}
              onStop={() => {}}
              disabled
            />
          </div>
        </section>
      </div>
    );
  }

  const plannedSeconds = timer
    ? timer.plannedSeconds + timer.extendedSeconds
    : (todo.durationSeconds ?? 0);
  const remainingSeconds = timer ? timer.remainingSeconds : plannedSeconds;
  const isTimeUp = timer ? timer.remainingSeconds <= 0 : false;
  const progress =
    plannedSeconds > 0
      ? ((plannedSeconds - remainingSeconds) / plannedSeconds) * 100
      : 0;
  const plannedMinutes = convertDurationToMinutes(plannedSeconds);
  const actualMinutes = convertDurationToMinutes(timer?.elapsedSeconds ?? 0);

  return (
    <div className="flex h-full overflow-x-auto">
      <AnimatedToast
        isOpen={isErrorToastOpen}
        onClose={() => setIsErrorToastOpen(false)}
        message={tToast("focusActionFailed")}
      />
      <div className="flex flex-1 flex-col gap-18">
        <FocusHeaderContainer />
        <FocusTaskItem
          dayNumber={convertDateToDayNumberText(today)}
          dayOfWeek={tWeekday(convertDateToDayOfWeekKey(today))}
          title={todo.title}
          completed={todo.completed}
          dateText={dateText}
          durationText={convertDurationToTimeText(plannedSeconds)}
          isRunning={isRunning}
          subtasks={todo.subtasks}
          onToggleCompleted={handleToggleCompleted}
          onTogglePlay={handleTogglePlay}
          onToggleSubtaskCompleted={handleToggleSubtaskCompleted}
        />
      </div>

      <section className="border-timo-gray-500 flex h-full w-136.5 shrink-0 items-center border-l bg-white">
        <div className="flex w-full flex-col items-center gap-11.25">
          <Timer
            icon={<TimerOnIcon />}
            time={convertDurationToTimeText(remainingSeconds)}
            plannedLabel={formatDurationLabel(
              plannedMinutes,
              tDuration("hourUnit"),
              tDuration("minuteUnit"),
            )}
            progress={progress}
            size="lg"
          />

          <TimerSessionControls
            ref={timerSessionControlsRef}
            isRunning={isRunning}
            onTogglePlay={handleTogglePlay}
            plannedMinutes={plannedMinutes}
            actualMinutes={actualMinutes}
            feedbackText={feedbackText}
            isTimeUp={isTimeUp}
            onExtend={handleExtendTimer}
            onComplete={handleCompleteTimer}
            onStop={handleStopTimer}
          />
        </div>
      </section>
    </div>
  );
};
