import {
  ControlPauseActiveIcon,
  ControlPlayActiveIcon,
  PlayDisabledIcon,
} from "@repo/timo-design-system/icons";
import { Checkbox, PlayButton } from "@repo/timo-design-system/ui";
import { useId } from "react";

import type { TodoDetailResponseTimerStatus } from "@/generated/models";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";

import { DetailTodoSubtaskItem } from "@/components/todo-modal/detail/DetailTodoSubtaskItem";
import { DndSortableListProvider } from "@/providers/dnd/DndSortableListProvider";

export interface DetailTodoSubtaskInput {
  id: number;
  subtaskId: number | null;
  completed: boolean;
  value: string;
}

export interface DetailTodoTaskFieldsProps {
  titleValue: string;
  isCompleted: boolean;
  disabled?: boolean;
  timerStatus: TodoDetailResponseTimerStatus;
  isPlayHighlighted: boolean;
  subtaskInputs: DetailTodoSubtaskInput[];
  onTitleChange: (value: string) => void;
  onTitleEnter: () => void;
  onToggleCompleted: (completed: boolean) => void;
  onTogglePlay: () => void;
  onSubtaskInputChange: (id: number, value: string) => void;
  onToggleSubtaskCompleted: (id: number, completed: boolean) => void;
  onReorderSubtask: (fromIndex: number, toIndex: number) => void;
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
  isPlayHighlighted,
  subtaskInputs,
  onTitleChange,
  onTitleEnter,
  onToggleCompleted,
  onTogglePlay,
  onSubtaskInputChange,
  onToggleSubtaskCompleted,
  onReorderSubtask,
  registerSubtaskInputRef,
  onSubtaskInputKeyDown,
}: DetailTodoTaskFieldsProps) => {
  const subtaskDndId = useId();
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
          <input
            type="text"
            value={titleValue}
            onChange={(event) => onTitleChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== "Enter") return;
              if (event.nativeEvent.isComposing) return;

              event.preventDefault();
              onTitleEnter();
            }}
            disabled={disabled}
            className="typo-headline-b-14 text-timo-black min-w-0 flex-1 outline-none"
          />
        </div>

        <div className="shrink-0">
          <PlayButton
            variant={isRunning ? "stop" : "play"}
            size="lg"
            disabled={isCompleted}
            active={isPlayHighlighted}
            onClick={handlePlayClick}
            onPointerDown={stopInteractiveEvent}
          >
            {isCompleted ? (
              <PlayDisabledIcon width={24} height={24} />
            ) : isRunning ? (
              <ControlPauseActiveIcon width={24} height={24} />
            ) : isPlayHighlighted ? (
              <ControlPlayActiveIcon width={24} height={24} />
            ) : (
              <PlayDisabledIcon width={24} height={24} />
            )}
          </PlayButton>
        </div>
      </div>

      {subtaskInputs.length > 0 && (
        <DndSortableListProvider
          dndId={subtaskDndId}
          itemIds={subtaskInputs.map((subtask) => subtask.id)}
          onReorder={onReorderSubtask}
        >
          <div className="flex flex-col">
            {subtaskInputs.map((subtask, index) => (
              <DetailTodoSubtaskItem
                key={subtask.id}
                subtask={subtask}
                isTodoCompleted={isCompleted}
                disabled={disabled}
                inputRef={registerSubtaskInputRef(index)}
                onInputChange={onSubtaskInputChange}
                onInputKeyDown={(event) => onSubtaskInputKeyDown(index, event)}
                onToggleCompleted={onToggleSubtaskCompleted}
              />
            ))}
          </div>
        </DndSortableListProvider>
      )}
    </div>
  );
};
