import { DragIcon } from "@repo/timo-design-system/icons";
import { cn } from "@repo/timo-design-system/utils";
import { useTranslations } from "next-intl";

import type { useSortable } from "@dnd-kit/sortable";

type SortableState = ReturnType<typeof useSortable>;

export interface DragHandleProps {
  isDraggable: boolean;
  isDragging: boolean;
  attributes: SortableState["attributes"];
  listeners: SortableState["listeners"];
  setActivatorNodeRef: SortableState["setActivatorNodeRef"];
}

/**
 * 정렬 목록 항목의 드래그 핸들입니다. 항목 왼쪽 여백에 겹쳐 띄워 기존 좌측 정렬을 유지하고,
 * 항목에 hover·포커스했을 때만 보입니다. hover가 없는 터치 기기에서는 항상 보입니다.
 * 부모 항목에 `group relative` 클래스가 있어야 합니다.
 */
export const DragHandle = ({
  isDraggable,
  isDragging,
  attributes,
  listeners,
  setActivatorNodeRef,
}: DragHandleProps) => {
  const tCommon = useTranslations("Common");

  if (!isDraggable) return null;

  return (
    <span
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      aria-label={tCommon("dragHandle")}
      className={cn(
        "absolute top-1/2 right-full flex size-6 -translate-y-1/2 cursor-grab touch-none items-center justify-center opacity-0 transition-opacity outline-none",
        "group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
        isDragging && "cursor-grabbing opacity-100",
      )}
    >
      <DragIcon width={20} height={20} />
    </span>
  );
};
