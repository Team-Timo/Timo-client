import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

import type { SubTodo } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_components/TodayTodoCard";

export interface TodayTodoSubtaskItemProps {
  subTodo: SubTodo;
  isTodoDone: boolean;
  onCheck: (id: number) => void;
}

const stopPropagation = (e: { stopPropagation: () => void }) =>
  e.stopPropagation();

export const TodayTodoSubtaskItem = ({
  subTodo,
  isTodoDone,
  onCheck,
}: TodayTodoSubtaskItemProps) => {
  const isDraggable = !isTodoDone && !subTodo.isDone;
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: subTodo.id, disabled: !isDraggable });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn("rounded-[4px]", isDragging && "relative z-10 bg-white")}
    >
      {/* 하위 태스크 영역의 클릭·키 입력이 카드(상세 모달 열기)로 전달되지 않도록 막는다 */}
      <div
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        role={attributes.role}
        tabIndex={isDraggable ? 0 : -1}
        onClick={stopPropagation}
        onKeyDown={(event) => {
          listeners?.onKeyDown?.(event);
          stopPropagation(event);
        }}
        className={cn(
          "flex items-center gap-2",
          isDraggable && "cursor-grab",
          isDragging && "cursor-grabbing",
        )}
      >
        <Checkbox
          checked={subTodo.isDone ?? false}
          disabled={isTodoDone}
          onChange={() => onCheck(subTodo.id)}
        />
        <span className="typo-body-r-12 text-timo-gray-800">
          {subTodo.text}
        </span>
      </div>
    </li>
  );
};
