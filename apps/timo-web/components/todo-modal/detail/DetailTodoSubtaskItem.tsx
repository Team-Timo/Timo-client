import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

import type { DetailTodoSubtaskInput } from "@/components/todo-modal/detail/DetailTodoTaskFields";
import type { KeyboardEvent } from "react";

import { DragHandle } from "@/components/dnd/DragHandle";

const resizeTextarea = (element: HTMLTextAreaElement) => {
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
};

export interface DetailTodoSubtaskItemProps {
  subtask: DetailTodoSubtaskInput;
  isTodoCompleted: boolean;
  disabled: boolean;
  inputRef: (element: HTMLTextAreaElement | null) => void;
  onInputChange: (id: number, value: string) => void;
  onInputKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onToggleCompleted: (id: number, completed: boolean) => void;
}

export const DetailTodoSubtaskItem = ({
  subtask,
  isTodoCompleted,
  disabled,
  inputRef,
  onInputChange,
  onInputKeyDown,
  onToggleCompleted,
}: DetailTodoSubtaskItemProps) => {
  // 서버에 저장된 미완료 하위 태스크만 드래그로 순서를 바꿀 수 있다
  const isDraggable =
    !disabled && subtask.subtaskId !== null && !subtask.completed;
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: subtask.id, disabled: !isDraggable });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "group relative flex items-center gap-2 rounded-[4px] bg-white",
        isDragging && "z-10",
      )}
    >
      <DragHandle
        isDraggable={isDraggable}
        isDragging={isDragging}
        attributes={attributes}
        listeners={listeners}
        setActivatorNodeRef={setActivatorNodeRef}
      />
      <Checkbox
        checked={subtask.completed}
        disabled={isTodoCompleted}
        onChange={(completed) => onToggleCompleted(subtask.id, completed)}
      />
      <textarea
        value={subtask.value}
        ref={inputRef}
        onChange={(event) => {
          onInputChange(subtask.id, event.target.value);
          resizeTextarea(event.currentTarget);
        }}
        onKeyDown={onInputKeyDown}
        rows={1}
        disabled={disabled}
        className="typo-body-r-12 text-timo-gray-700 min-w-0 flex-1 cursor-text resize-none overflow-hidden wrap-break-word outline-none"
      />
    </div>
  );
};
