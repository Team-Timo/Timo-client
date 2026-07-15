"use client";

import { overlay } from "overlay-kit";

import type { TodoUpdateRequest } from "@/api/generated/models";
import type { ReactNode } from "react";

import { useGetTodoDetail } from "@/api/generated/endpoints/todo/todo";
import { DetailTodoModalContent } from "@/components/todo-modal/detail/DetailTodoModalContent";
import { useDeleteTodoSubmit } from "@/hooks/todo-modal/detail/use-delete-todo-submit";
import { useUpdateTodoSubmit } from "@/hooks/todo-modal/detail/use-update-todo-submit";
import { useActiveTimer } from "@/hooks/use-active-timer";

export interface DetailTodoModalContainerProps {
  todoId: number;
  date: string;
  onTogglePlay: () => void;
  onToggleCompleted: (completed: boolean) => void;
  onDelete: () => void;
  children: (openDetailTodoModal: () => void) => ReactNode;
}

interface DetailTodoModalQueryProps extends Omit<
  DetailTodoModalContainerProps,
  "children"
> {
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
}

const DetailTodoModalQuery = ({
  todoId,
  date,
  isOpen,
  onClose,
  onExited,
  onTogglePlay,
  onToggleCompleted,
  onDelete,
}: DetailTodoModalQueryProps) => {
  const { data, isError } = useGetTodoDetail(todoId, { date });
  const { handleDelete } = useDeleteTodoSubmit();
  const { handleUpdate } = useUpdateTodoSubmit();
  const todo = data?.data;

  const { data: activeTimer } = useActiveTimer();

  if (isError || !todo) return null;

  const timerStatus =
    activeTimer?.todoId === todoId ? activeTimer.status : todo.timerStatus;

  const deleteTodo = () => {
    handleDelete(todoId, {
      onSuccess: () => {
        onDelete();
        onClose();
      },
    });
  };

  const updateTodo = (updateData: TodoUpdateRequest) => {
    handleUpdate({
      todoId,
      date,
      data: updateData,
    });
  };

  return (
    <DetailTodoModalContent
      isOpen={isOpen}
      onClose={onClose}
      onExited={onExited}
      todo={todo}
      onTogglePlay={onTogglePlay}
      onToggleCompleted={onToggleCompleted}
      onDelete={deleteTodo}
      onUpdate={updateTodo}
      timerStatus={timerStatus}
    />
  );
};

export const DetailTodoModalContainer = ({
  todoId,
  date,
  onTogglePlay,
  onToggleCompleted,
  onDelete,
  children,
}: DetailTodoModalContainerProps) => {
  const openDetailTodoModal = () => {
    overlay.open(({ isOpen, close, unmount }) => (
      <DetailTodoModalQuery
        todoId={todoId}
        date={date}
        isOpen={isOpen}
        onClose={close}
        onExited={unmount}
        onTogglePlay={onTogglePlay}
        onToggleCompleted={onToggleCompleted}
        onDelete={onDelete}
      />
    ));
  };

  return <>{children(openDetailTodoModal)}</>;
};
