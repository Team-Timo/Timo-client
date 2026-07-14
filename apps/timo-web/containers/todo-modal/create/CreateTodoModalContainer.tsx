"use client";

import { AddTaskButton } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { overlay } from "overlay-kit";
import { useState } from "react";

import type { CreateTodoRequest } from "@/api/common/todo-schema";

import { AnimatedToast } from "@/components/toast/AnimatedToast";
import { CreateTodoModalContent } from "@/components/todo-modal/create/CreateTodoModalContent";
import { useCreateTodoSubmit } from "@/hooks/todo-modal/create/use-create-todo-submit";

const MAX_TODO_COUNT = 20;

export interface CreateTodoModalContainerProps {
  defaultDate?: Date;
  buttonVariant?: "default" | "big";
  totalCount?: number;
  onSubmit?: (data: CreateTodoRequest) => void;
}

export const CreateTodoModalContainer = ({
  defaultDate,
  buttonVariant = "default",
  totalCount = 0,
  onSubmit,
}: CreateTodoModalContainerProps) => {
  const t = useTranslations("Home");
  const tToast = useTranslations("Toast");
  const { handleSubmit, isErrorToastOpen, closeErrorToast } =
    useCreateTodoSubmit();
  const [isTodoLimitToastOpen, setIsTodoLimitToastOpen] = useState(false);
  const submitTodo = onSubmit ?? handleSubmit;

  const handleAddClick = () => {
    if (totalCount >= MAX_TODO_COUNT) {
      setIsTodoLimitToastOpen(true);
      return;
    }

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

      <AnimatedToast
        isOpen={isTodoLimitToastOpen}
        onClose={() => setIsTodoLimitToastOpen(false)}
        message={
          <>
            <p className="mb-0">
              {tToast.rich("todoLimitLine1", {
                blue: (chunks) => (
                  <span className="text-timo-blue-300">{chunks}</span>
                ),
              })}
            </p>
            <p>{tToast("todoLimitLine2")}</p>
          </>
        }
      />
    </>
  );
};
