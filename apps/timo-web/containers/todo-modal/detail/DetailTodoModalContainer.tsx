"use client";

import { useTranslations } from "next-intl";
import { overlay } from "overlay-kit";
import { useCallback, useEffect, useState } from "react";

import type { ErrorType } from "@/api/client/custom-instance";
import type { ErrorDto, TodoUpdateRequest } from "@/api/generated/models";
import type { ReactNode } from "react";

import { useGetTodoDetail } from "@/api/generated/endpoints/todo/todo";
import { AnimatedToast } from "@/components/toast/AnimatedToast";
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
  onActionError: (error: ErrorType<ErrorDto>) => void;
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
  onActionError,
}: DetailTodoModalQueryProps) => {
  const { data, error, isError } = useGetTodoDetail(todoId, { date });
  const { handleDelete } = useDeleteTodoSubmit();
  const { handleUpdate } = useUpdateTodoSubmit();
  const todo = data?.data;

  const { data: activeTimer } = useActiveTimer();

  useEffect(() => {
    if (isError && error) {
      onActionError(error);
    }
  }, [error, isError, onActionError]);

  if (isError || !todo) return null;

  const timerStatus =
    activeTimer?.todoId === todoId ? activeTimer.status : todo.timerStatus;

  const deleteTodo = () => {
    handleDelete(todoId, {
      onSuccess: () => {
        onDelete();
        onClose();
      },
      onError: onActionError,
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
        onError: onActionError,
      },
    );
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
  const tToast = useTranslations("Toast");
  const [actionErrorMessage, setActionErrorMessage] = useState("");
  const [isActionErrorToastOpen, setIsActionErrorToastOpen] = useState(false);

  const showActionErrorToast = useCallback(
    (error: ErrorType<ErrorDto>) => {
      setActionErrorMessage(
        error.response?.data.message ?? tToast("focusActionFailed"),
      );
      setIsActionErrorToastOpen(true);
    },
    [tToast],
  );

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
        onActionError={showActionErrorToast}
      />
    ));
  };

  return (
    <>
      {children(openDetailTodoModal)}

      <AnimatedToast
        isOpen={isActionErrorToastOpen}
        onClose={() => setIsActionErrorToastOpen(false)}
        message={actionErrorMessage}
      />
    </>
  );
};
