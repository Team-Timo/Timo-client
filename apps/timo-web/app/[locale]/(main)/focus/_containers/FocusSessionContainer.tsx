"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { FocusEmptyTaskItem } from "@/app/[locale]/(main)/focus/_components/FocusEmptyTaskItem";
import { FocusTaskItem } from "@/app/[locale]/(main)/focus/_components/FocusTaskItem";
import { FocusHeaderContainer } from "@/app/[locale]/(main)/focus/_containers/FocusHeaderContainer";
import { useFocusSession } from "@/app/[locale]/(main)/focus/_hooks/use-focus-session";
import {
  convertDateToDayNumberText,
  convertDateToDayOfWeekKey,
} from "@/app/[locale]/(main)/focus/_utils/date";
import { Timer } from "@/components/timer/Timer";
import { TimerSessionControls } from "@/components/timer/TimerSessionControls";
import { AnimatedToast } from "@/components/toast/AnimatedToast";
import { convertDurationToTimeText } from "@/utils/duration/convert-duration-to-time-text";
import { formatDurationLabel } from "@/utils/duration/format-duration-label";

export const FocusSessionContainer = () => {
  const tWeekday = useTranslations("Common.weekday");
  const tToast = useTranslations("Toast");

  const [feedbackText, setFeedbackText] = useState<string | undefined>();
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);

  const { focusSessionState, focusSessionActions } = useFocusSession({
    onMutationError: () => setIsErrorToastOpen(true),
    onFeedback: setFeedbackText,
  });

  if (!focusSessionState.focusView.hasTodo || !focusSessionState.todo) {
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
            dayNumber={convertDateToDayNumberText(focusSessionState.today)}
            dayOfWeek={tWeekday(
              convertDateToDayOfWeekKey(focusSessionState.today),
            )}
            dateText={focusSessionState.dateText}
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

  const todo = focusSessionState.todo;

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
          dayNumber={convertDateToDayNumberText(focusSessionState.today)}
          dayOfWeek={tWeekday(
            convertDateToDayOfWeekKey(focusSessionState.today),
          )}
          title={todo.title}
          completed={todo.completed}
          dateText={focusSessionState.dateText}
          durationText={convertDurationToTimeText(
            focusSessionState.plannedSeconds,
          )}
          isRunning={focusSessionState.isRunning}
          subtasks={todo.subtasks}
          memo={todo.memo}
          onToggleCompleted={focusSessionActions.onToggleCompleted}
          onTogglePlay={focusSessionActions.onTogglePlay}
          onToggleSubtaskCompleted={
            focusSessionActions.onToggleSubtaskCompleted
          }
        />
      </div>

      <section className="border-timo-gray-500 flex h-full w-136.5 shrink-0 items-center border-l bg-white">
        <div className="flex w-full flex-col items-center gap-11.25">
          <Timer
            time={convertDurationToTimeText(focusSessionState.remainingSeconds)}
            plannedLabel={formatDurationLabel(
              focusSessionState.plannedMinutes,
              "H",
              "M",
            )}
            progress={focusSessionState.progress}
            isOvertime={focusSessionState.isOvertime}
            overtimeProgress={focusSessionState.overtimeProgress}
            size="lg"
          />

          <TimerSessionControls
            ref={focusSessionState.timerSessionControlsRef}
            isRunning={focusSessionState.isRunning}
            onTogglePlay={focusSessionActions.onTogglePlay}
            plannedMinutes={focusSessionState.basePlannedMinutes}
            actualMinutes={focusSessionState.actualMinutes}
            feedbackText={feedbackText}
            isTimeUp={focusSessionState.isTimeUp}
            onExtend={focusSessionActions.onExtend}
            onComplete={focusSessionActions.onComplete}
            onStop={focusSessionActions.onStop}
          />
        </div>
      </section>
    </div>
  );
};
