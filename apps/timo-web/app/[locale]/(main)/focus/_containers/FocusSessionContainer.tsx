"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { FocusEmptyTaskItem } from "@/app/[locale]/(main)/focus/_components/FocusEmptyTaskItem";
import { FocusSessionLayout } from "@/app/[locale]/(main)/focus/_components/FocusSessionLayout";
import { FocusTaskItem } from "@/app/[locale]/(main)/focus/_components/FocusTaskItem";
import { FocusHeaderContainer } from "@/app/[locale]/(main)/focus/_containers/FocusHeaderContainer";
import { useFocusSession } from "@/app/[locale]/(main)/focus/_hooks/use-focus-session";
import {
  convertDateToDayNumberText,
  convertDateToDayOfWeekKey,
} from "@/app/[locale]/(main)/focus/_utils/date";
import { Timer } from "@/components/timer/Timer";
import { TimerSessionControls } from "@/components/timer/TimerSessionControls";
import { convertDurationToTimeText } from "@/utils/duration/convert-duration-to-time-text";
import { formatDurationLabel } from "@/utils/duration/format-duration-label";
import { canEditTodo } from "@/utils/todo/todo-editability";

const TIMER_SIZE_CLASS_NAME = "h-60.5 w-60.5 md:h-90 md:w-90";
const TIMER_TIME_CLASS_NAME = "typo-headline-b-40 md:typo-headline-b-50";
const TIMER_PLANNED_CLASS_NAME = "typo-headline-m-20 md:typo-headline-m-26";

export const FocusSessionContainer = () => {
  const tWeekday = useTranslations("Common.weekday");
  const tToast = useTranslations("Toast");

  const [feedbackText, setFeedbackText] = useState<string | undefined>();
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);

  const { focusSessionState, focusSessionActions } = useFocusSession({
    onMutationError: () => setIsErrorToastOpen(true),
    onFeedback: setFeedbackText,
  });

  const header = <FocusHeaderContainer />;

  if (!focusSessionState.focusView.hasTodo || !focusSessionState.todo) {
    return (
      <FocusSessionLayout
        header={header}
        isErrorToastOpen={isErrorToastOpen}
        onCloseErrorToast={() => setIsErrorToastOpen(false)}
        errorToastMessage={tToast("focusActionFailed")}
        taskItem={
          <FocusEmptyTaskItem
            dayNumber={convertDateToDayNumberText(focusSessionState.today)}
            dayOfWeek={tWeekday(
              convertDateToDayOfWeekKey(focusSessionState.today),
            )}
            dateText={focusSessionState.dateText}
          />
        }
        timer={
          <Timer
            time="00:00"
            plannedLabel="0M"
            progress={0}
            size="lg"
            className={TIMER_SIZE_CLASS_NAME}
            timeClassName={TIMER_TIME_CLASS_NAME}
            plannedClassName={TIMER_PLANNED_CLASS_NAME}
          />
        }
        controls={
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
        }
      />
    );
  }

  const todo = focusSessionState.todo;

  return (
    <FocusSessionLayout
      header={header}
      isErrorToastOpen={isErrorToastOpen}
      onCloseErrorToast={() => setIsErrorToastOpen(false)}
      errorToastMessage={tToast("focusActionFailed")}
      taskItem={
        <FocusTaskItem
          dayNumber={convertDateToDayNumberText(focusSessionState.today)}
          dayOfWeek={tWeekday(
            convertDateToDayOfWeekKey(focusSessionState.today),
          )}
          title={todo.title}
          completed={todo.completed}
          isTimerLookupUnavailable={focusSessionState.isTimerLookupUnavailable}
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
      }
      timer={
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
          className={TIMER_SIZE_CLASS_NAME}
          timeClassName={TIMER_TIME_CLASS_NAME}
          plannedClassName={TIMER_PLANNED_CLASS_NAME}
        />
      }
      controls={
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
          disabled={!canEditTodo(todo.completed)}
        />
      }
    />
  );
};
