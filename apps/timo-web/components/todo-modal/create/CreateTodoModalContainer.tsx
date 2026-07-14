"use client";

import { AddTaskButton } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { overlay } from "overlay-kit";

import type { CreateTodoRequest } from "@/api/common/todo-schema";

import { AnimatedToast } from "@/components/toast/AnimatedToast";
import { CreateTodoModalContent } from "@/components/todo-modal/create/CreateTodoModalContent";
import { useCreateTodoSubmit } from "@/hooks/todo-modal/use-create-todo-submit";

export interface CreateTodoModalContainerProps {
  defaultDate?: Date;
  buttonVariant?: "default" | "big";
  onSubmit?: (data: CreateTodoRequest) => void;
}

export const CreateTodoModalContainer = ({
  defaultDate,
  buttonVariant = "default",
  onSubmit,
}: CreateTodoModalContainerProps) => {
  const t = useTranslations("Home");
  const tToast = useTranslations("Toast");
  const { handleSubmit, isErrorToastOpen, closeErrorToast } =
    useCreateTodoSubmit();
  const submitTodo = onSubmit ?? handleSubmit;

  const handleAddClick = () => {
    overlay.open(({ isOpen, close, unmount }) => (
      <CreateTodoModalContent
        isOpen={isOpen}
        onClose={close}
        onExited={unmount}
        defaultDate={defaultDate}
        onSubmit={submitTodo}
      />
    ));
  };

  return (
    <>
      <AddTaskButton
        variant={buttonVariant}
        text={t("addTask")}
        onClick={handleAddClick}
      />

      <AnimatedToast
        isOpen={isErrorToastOpen}
        onClose={closeErrorToast}
        message={tToast("todoCreateFailed")}
      />
    </>
  );
};
