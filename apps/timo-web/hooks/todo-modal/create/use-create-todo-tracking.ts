import { useRef } from "react";

import type {
  PriorityLevel,
  RepeatFrequency,
} from "@repo/timo-design-system/ui";

import { trackMixpanel } from "@/utils/analytics/mixpanel";

export interface UseCreateTodoTrackingParams {
  memoValue: string;
  onDateChange: (next: Date) => void;
  onSelectPriority: (level: PriorityLevel) => void;
  onMemoChange: (value: string) => void;
  onRepeatFrequencyChange: (frequency: RepeatFrequency) => void;
}

/**
 * 투두 생성 모달에서 날짜·우선순위·메모·반복 옵션을 처음 선택할 때
 * 트래킹 플랜의 todo_calender/todo_priority/todo_memo/todo_repeat 이벤트를 전송한다.
 * 모달 한 번 열린 동안 이벤트별로 한 번만 보내며, resetTrackedEvents로 다시 열 때 초기화한다.
 */
export const useCreateTodoTracking = ({
  memoValue,
  onDateChange,
  onSelectPriority,
  onMemoChange,
  onRepeatFrequencyChange,
}: UseCreateTodoTrackingParams) => {
  const trackedEventsRef = useRef({
    dateChanged: false,
    priorityChanged: false,
    memoAdded: false,
    repeatChanged: false,
  });

  const resetTrackedEvents = () => {
    trackedEventsRef.current = {
      dateChanged: false,
      priorityChanged: false,
      memoAdded: false,
      repeatChanged: false,
    };
  };

  const handleDateChange = (next: Date) => {
    if (!trackedEventsRef.current.dateChanged) {
      trackMixpanel("todo_calender");
      trackedEventsRef.current.dateChanged = true;
    }
    onDateChange(next);
  };

  const handleSelectPriority = (level: PriorityLevel) => {
    if (!trackedEventsRef.current.priorityChanged) {
      trackMixpanel("todo_priority");
      trackedEventsRef.current.priorityChanged = true;
    }
    onSelectPriority(level);
  };

  const handleMemoChange = (value: string) => {
    if (
      !trackedEventsRef.current.memoAdded &&
      memoValue.trim() === "" &&
      value.trim() !== ""
    ) {
      trackMixpanel("todo_memo");
      trackedEventsRef.current.memoAdded = true;
    }
    onMemoChange(value);
  };

  const handleRepeatFrequencyChange = (frequency: RepeatFrequency) => {
    if (!trackedEventsRef.current.repeatChanged) {
      trackMixpanel("todo_repeat");
      trackedEventsRef.current.repeatChanged = true;
    }
    onRepeatFrequencyChange(frequency);
  };

  return {
    handleDateChange,
    handleSelectPriority,
    handleMemoChange,
    handleRepeatFrequencyChange,
    resetTrackedEvents,
  };
};
