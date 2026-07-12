"use client";

import { DeleteIcon } from "@repo/timo-design-system/icons";

import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import { OverlayModal } from "@/components/modal/OverlayModal";

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
  return (
    <OverlayModal
      isOpen={isOpen}
      onClose={onClose}
      onExited={onExited}
      ariaLabel="투두 상세"
      className="w-[490px] items-start gap-4 px-6 py-4"
    >
      <div className="flex w-full items-center justify-between">
        <p className="typo-body-sb-12 text-timo-blue-300">투두 상세</p>
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="shrink-0"
        >
          <DeleteIcon />
        </button>
      </div>

      <p className="typo-headline-b-14 text-timo-black">{todo.title}</p>
    </OverlayModal>
  );
};
