import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

import type { DetailTodoSubtaskInput } from "@/components/todo-modal/detail/DetailTodoTaskFields";
import type { KeyboardEvent } from "react";

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
      ref={(element) => {
        setNodeRef(element);
        setActivatorNodeRef(element);
      }}
      {...attributes}
      {...listeners}
      role={attributes.role}
      tabIndex={isDraggable ? 0 : -1}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex items-center gap-2 rounded-[4px] bg-white",
        isDraggable && "cursor-grab",
        isDragging && "relative z-10 cursor-grabbing",
      )}
    >
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
        // 입력창에서 시작한 포인터 동작은 텍스트 선택에 쓰이도록 드래그로 넘기지 않는다
        onPointerDown={(event) => event.stopPropagation()}
        rows={1}
        disabled={disabled}
        className="typo-body-r-12 text-timo-gray-700 min-w-0 flex-1 cursor-text resize-none overflow-hidden wrap-break-word outline-none"
      />
    </div>
  );
};
