"use client";

import { overlay } from "overlay-kit";

import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";
import type { ReactNode } from "react";

import { DetailTodoModalContent } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/todo-modal/DetailTodoModalContent";

export interface DetailTodoModalContainerProps {
  todo: Todo;
  onTogglePlay: () => void;
  children: (openDetailTodoModal: () => void) => ReactNode;
}

export const DetailTodoModalContainer = ({
  todo,
  onTogglePlay,
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
      />
    ));
  };

  return <>{children(openDetailTodoModal)}</>;
};
