"use client";

import { overlay } from "overlay-kit";

import type { UseDetailTodoParams } from "@/queries/todo/use-detail-todo";
import type { ReactNode } from "react";

import { DetailTodoModalContent } from "@/components/todo-modal/detail/DetailTodoModalContent";
import { useDeleteTodoSubmit } from "@/hooks/todo-modal/use-delete-todo-submit";
import { useDetailTodo } from "@/queries/todo/use-detail-todo";

export interface DetailTodoModalContainerProps extends UseDetailTodoParams {
  onTogglePlay: () => void;
  onDelete: () => void;
  children: (openDetailTodoModal: () => void) => ReactNode;
}

interface DetailTodoModalQueryProps extends UseDetailTodoParams {
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
  onTogglePlay: () => void;
  onDelete: () => void;
}

const DetailTodoModalQuery = ({
  isOpen,
  onClose,
  onExited,
  todoId,
  date,
  onTogglePlay,
  onDelete,
}: DetailTodoModalQueryProps) => {
  const { data, isError } = useDetailTodo({ todoId, date });
  const { handleDelete } = useDeleteTodoSubmit();
  const todo = data?.data;

  if (isError || !todo) return null;

  const handleDeleteTodo = () => {
    handleDelete(todoId, {
      onSuccess: () => {
        onDelete();
        onClose();
      },
    });
  };

  return (
    <DetailTodoModalContent
      isOpen={isOpen}
      onClose={onClose}
      onExited={onExited}
      todo={todo}
      onTogglePlay={onTogglePlay}
      onDelete={handleDeleteTodo}
    />
  );
};

export const DetailTodoModalContainer = ({
  todoId,
  date,
  onTogglePlay,
  onDelete,
  children,
}: DetailTodoModalContainerProps) => {
  const openDetailTodoModal = () => {
    overlay.open(({ isOpen, close, unmount }) => (
      <DetailTodoModalQuery
        isOpen={isOpen}
        onClose={close}
        onExited={unmount}
        todoId={todoId}
        date={date}
        onTogglePlay={onTogglePlay}
        onDelete={onDelete}
      />
    ));
  };

  return <>{children(openDetailTodoModal)}</>;
};
