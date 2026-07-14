"use client";

import { useTranslations } from "next-intl";
import { overlay } from "overlay-kit";

import type { TodoUpdateRequest } from "@/api/generated/models";
import type { UseDetailTodoParams } from "@/queries/todo/use-detail-todo";
import type { ReactNode } from "react";

import { AnimatedToast } from "@/components/toast/AnimatedToast";
import { DetailTodoModalContent } from "@/components/todo-modal/detail/DetailTodoModalContent";
import { useDeleteTodoSubmit } from "@/hooks/todo-modal/detail/use-delete-todo-submit";
import { useUpdateTodoSubmit } from "@/hooks/todo-modal/detail/use-update-todo-submit";
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
  const tToast = useTranslations("Toast");
  const { data, isError } = useDetailTodo({ todoId, date });
  const { handleDelete } = useDeleteTodoSubmit();
  const updateTodoSubmit = useUpdateTodoSubmit();
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

  const handleUpdateTodo = (updateData: TodoUpdateRequest) => {
    updateTodoSubmit.handleUpdate({
      todoId,
      date,
      data: updateData,
    });
  };

  return (
    <>
      <DetailTodoModalContent
        isOpen={isOpen}
        onClose={onClose}
        onExited={onExited}
        todo={todo}
        onTogglePlay={onTogglePlay}
        onDelete={handleDeleteTodo}
        onSubmit={handleUpdateTodo}
      />

      <AnimatedToast
        isOpen={updateTodoSubmit.isErrorToastOpen}
        onClose={updateTodoSubmit.closeErrorToast}
        message={tToast("todoUpdateFailed")}
      />
    </>
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
