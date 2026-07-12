"use client";

import { DeleteIcon } from "@repo/timo-design-system/icons";
import {
  Checkbox,
  PlayButton,
  TODO_ICON_VALUES,
} from "@repo/timo-design-system/ui";
import { useState } from "react";

import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";
import type { TodoIconValue } from "@repo/timo-design-system/ui";

import { TodoIconField } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-modal/TodoIconField";
import { OverlayModal } from "@/components/modal/OverlayModal";

const isTodoIconValue = (icon: string | null): icon is TodoIconValue =>
  icon !== null && (TODO_ICON_VALUES as readonly string[]).includes(icon);

export interface DetailTodoModalContentProps {
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
  todo: Todo;
}

export const DetailTodoModalContent = ({
  isOpen,
  onClose,
  onExited,
  todo,
}: DetailTodoModalContentProps) => {
  const [icon, setIcon] = useState<TodoIconValue | null>(
    isTodoIconValue(todo.icon) ? todo.icon : null,
  );
  const [isIconPanelOpen, setIsIconPanelOpen] = useState(false);

  const openIconPanel = () => setIsIconPanelOpen(true);
  const toggleIconPanel = () => setIsIconPanelOpen((prev) => !prev);
  const selectIcon = (nextIcon: TodoIconValue) => setIcon(nextIcon);
  const removeIcon = () => setIcon(null);

  return (
    <OverlayModal
      isOpen={isOpen}
      onClose={onClose}
      onExited={onExited}
      ariaLabel="투두 상세"
      className="w-124 items-start px-7.5 py-5"
    >
      <div className="flex w-full justify-end">
        <button type="button" aria-label="닫기" onClick={onClose}>
          <DeleteIcon />
        </button>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-col">
          <p className="typo-headline-b-30 text-timo-black">22</p>
          <p className="typo-body-m-12 text-timo-gray-700">월요일</p>
        </div>

        <TodoIconField
          icon={icon}
          isIconPanelOpen={isIconPanelOpen}
          addIconLabel="아이콘 추가하기"
          onOpenPanel={openIconPanel}
          onTogglePanel={toggleIconPanel}
          onSelectIcon={selectIcon}
          onRemoveIcon={removeIcon}
        />
      </div>

      <div className="bg-timo-gray-500 mt-3 h-px w-full" />
      <div className="mt-3 flex w-full flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox checked={todo.completed} onChange={() => {}} />
            <p className="typo-headline-b-14 text-timo-black min-w-0 truncate">
              {todo.title}
            </p>
          </div>

          <PlayButton
            variant={todo.timerStatus === "RUNNING" ? "stop" : "play"}
            size="lg"
            disabled={todo.completed}
            onClick={() => {}}
          />
        </div>

        {todo.subtasks.length > 0 && (
          <div className="flex flex-col">
            {todo.subtasks.map((subtask) => (
              <div key={subtask.subtaskId} className="flex items-center gap-2">
                <Checkbox checked={subtask.completed} onChange={() => {}} />
                <p className="typo-body-r-12 text-timo-gray-700 min-w-0 truncate">
                  {subtask.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </OverlayModal>
  );
};
