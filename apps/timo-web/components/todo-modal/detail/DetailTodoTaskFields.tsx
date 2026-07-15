import {
  PlayDisabledIcon,
  PlayIcon,
  StopIcon,
} from "@repo/timo-design-system/icons";
import { Checkbox, PlayButton } from "@repo/timo-design-system/ui";

import type { TodoDetailResponseTimerStatus } from "@/api/generated/models";
import type { DetailTodoSubtaskInput } from "@/hooks/todo-modal/detail/use-detail-subtask-field";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";

const resizeTextarea = (element: HTMLTextAreaElement | null) => {
  if (!element) return;
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
};

export interface DetailTodoTaskFieldsProps {
  titleValue: string;
  isCompleted: boolean;
  disabled?: boolean;
  timerStatus: TodoDetailResponseTimerStatus;
  subtaskInputs: DetailTodoSubtaskInput[];
  onTitleChange: (value: string) => void;
  onToggleCompleted: (completed: boolean) => void;
  onTogglePlay: () => void;
  onSubtaskInputChange: (id: number, value: string) => void;
  onToggleSubtaskCompleted: (id: number, completed: boolean) => void;
  registerSubtaskInputRef: (
    index: number,
  ) => (element: HTMLTextAreaElement | null) => void;
  onSubtaskInputKeyDown: (
    index: number,
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => void;
}

export const DetailTodoTaskFields = ({
  titleValue,
  isCompleted,
  disabled = false,
  timerStatus,
  subtaskInputs,
  onTitleChange,
  onToggleCompleted,
  onTogglePlay,
  onSubtaskInputChange,
  onToggleSubtaskCompleted,
  registerSubtaskInputRef,
  onSubtaskInputKeyDown,
}: DetailTodoTaskFieldsProps) => {
  const isRunning = timerStatus === "RUNNING";

  const stopInteractiveEvent = (
    event: MouseEvent<HTMLButtonElement> | PointerEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
  };

  const handlePlayClick = (event: MouseEvent<HTMLButtonElement>) => {
    stopInteractiveEvent(event);
    onTogglePlay();
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Checkbox checked={isCompleted} onChange={onToggleCompleted} />
          <textarea
            value={titleValue}
            ref={resizeTextarea}
            onChange={(event) => {
              onTitleChange(event.target.value);
              resizeTextarea(event.currentTarget);
            }}
            rows={1}
            disabled={disabled}
            className="typo-headline-b-14 text-timo-black min-w-0 flex-1 resize-none overflow-hidden wrap-break-word outline-none"
          />
        </div>

        <div className="shrink-0">
          <PlayButton
            variant={isRunning ? "stop" : "play"}
            size="lg"
            disabled={isCompleted}
            onClick={handlePlayClick}
            onPointerDown={stopInteractiveEvent}
          >
            {isCompleted ? (
              <PlayDisabledIcon width={24} height={24} />
            ) : isRunning ? (
              <StopIcon width={24} height={24} />
            ) : (
              <PlayIcon width={24} height={24} />
            )}
          </PlayButton>
        </div>
      </div>

      {subtaskInputs.length > 0 && (
        <div className="flex flex-col">
          {subtaskInputs.map((subtask, index) => (
            <div key={subtask.id} className="flex items-center gap-2">
              <Checkbox
                checked={subtask.completed}
                onChange={(completed) =>
                  onToggleSubtaskCompleted(subtask.id, completed)
                }
              />
              <textarea
                value={subtask.value}
                ref={registerSubtaskInputRef(index)}
                onChange={(event) => {
                  onSubtaskInputChange(subtask.id, event.target.value);
                  resizeTextarea(event.currentTarget);
                }}
                onKeyDown={(event) => onSubtaskInputKeyDown(index, event)}
                rows={1}
                disabled={disabled}
                className="typo-body-r-12 text-timo-gray-700 min-w-0 flex-1 resize-none overflow-hidden wrap-break-word outline-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
