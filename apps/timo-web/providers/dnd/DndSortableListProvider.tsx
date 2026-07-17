"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import type { ReactNode } from "react";

export interface DndSortableListProviderProps {
  dndId: string;
  itemIds: UniqueIdentifier[];
  onReorder: (fromIndex: number, toIndex: number) => void;
  children: ReactNode;
}

export const DndSortableListProvider = ({
  dndId,
  itemIds,
  onReorder,
  children,
}: DndSortableListProviderProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const fromIndex = itemIds.indexOf(active.id);
    const toIndex = itemIds.indexOf(over.id);
    if (fromIndex === -1 || toIndex === -1) {
      return;
    }

    onReorder(fromIndex, toIndex);
  };

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      autoScroll={{ threshold: { x: 0, y: 0.2 } }}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};
