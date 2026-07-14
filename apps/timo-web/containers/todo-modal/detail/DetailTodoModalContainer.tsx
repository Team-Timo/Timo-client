"use client";

import { useState } from "react";

import type { ReactNode } from "react";

import { useGetTodoDetail } from "@/api/generated/endpoints/todo/todo";
import { DetailTodoModalContent } from "@/components/todo-modal/detail/DetailTodoModalContent";
import { useDeleteTodoSubmit } from "@/hooks/todo-modal/detail/use-delete-todo-submit";

export interface DetailTodoModalContainerProps {
  todoId: number;
  date: string;
  onTogglePlay: () => void;
  onDelete: () => void;
  children: (openDetailTodoModal: () => void) => ReactNode;
}

export const DetailTodoModalContainer = ({
  todoId,
  date,
  onTogglePlay,
  onDelete,
  children,
}: DetailTodoModalContainerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { data, isError } = useGetTodoDetail(
    todoId,
    { date },
    { query: { enabled: isMounted } },
  );
  const { handleDelete } = useDeleteTodoSubmit();
  const todo = data?.data;

  const openDetailTodoModal = () => {
    setIsMounted(true);
    setIsOpen(true);
  };

  const closeDetailTodoModal = () => {
    setIsOpen(false);
  };

  const deleteTodo = () => {
    handleDelete(todoId, {
      onSuccess: () => {
        onDelete();
        closeDetailTodoModal();
      },
    });
  };

  return (
    <>
      {children(openDetailTodoModal)}

      {isMounted && !isError && todo ? (
        <DetailTodoModalContent
          isOpen={isOpen}
          onClose={closeDetailTodoModal}
          onExited={() => setIsMounted(false)}
          todo={todo}
          onTogglePlay={onTogglePlay}
          onDelete={deleteTodo}
        />
      ) : null}
    </>
  );
};
