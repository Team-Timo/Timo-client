"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import type { TodoUpdateRequest } from "@/api/generated/models";
import type { ReactNode } from "react";

import { useGetTodoDetail } from "@/api/generated/endpoints/todo/todo";
import { AnimatedToast } from "@/components/toast/AnimatedToast";
import { DetailTodoModalContent } from "@/components/todo-modal/detail/DetailTodoModalContent";
import { useDeleteTodoSubmit } from "@/hooks/todo-modal/detail/use-delete-todo-submit";
import { useUpdateTodoSubmit } from "@/hooks/todo-modal/detail/use-update-todo-submit";

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
  const tToast = useTranslations("Toast");
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isUpdateErrorToastOpen, setIsUpdateErrorToastOpen] = useState(false);
  const { data, isError } = useGetTodoDetail(
    todoId,
    { date },
    { query: { enabled: isMounted } },
  );
  const { handleDelete } = useDeleteTodoSubmit();
  const { handleUpdate } = useUpdateTodoSubmit();
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

  const updateTodo = (updateData: TodoUpdateRequest) => {
    handleUpdate(
      {
        todoId,
        date,
        data: updateData,
      },
      {
        onError: () => setIsUpdateErrorToastOpen(true),
      },
    );
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
          onUpdate={updateTodo}
        />
      ) : null}

      <AnimatedToast
        isOpen={isUpdateErrorToastOpen}
        onClose={() => setIsUpdateErrorToastOpen(false)}
        message={tToast("todoUpdateFailed")}
      />
    </>
  );
};
