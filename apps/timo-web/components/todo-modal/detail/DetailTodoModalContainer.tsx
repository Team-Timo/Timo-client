"use client";

import { overlay } from "overlay-kit";

import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";
import type { ReactNode } from "react";

import { DetailTodoModalContent } from "@/components/todo-modal/detail/DetailTodoModalContent";

export interface DetailTodoModalContainerProps {
  todo: Todo;
  onTogglePlay: () => void;
  onDelete: () => void;
  children: (openDetailTodoModal: () => void) => ReactNode;
}

export const DetailTodoModalContainer = ({
  todo,
  onTogglePlay,
  onDelete,
  children,
}: DetailTodoModalContainerProps) => {
  const openDetailTodoModal = () => {
    overlay.open(({ isOpen, close, unmount }) => (
      <DetailTodoModalContent
        isOpen={isOpen}
        onClose={close}
        onExited={unmount}
        todo={todo}
        onTogglePlay={onTogglePlay}
        onDelete={onDelete}
      />
    ));
  };

  return <>{children(openDetailTodoModal)}</>;
};
