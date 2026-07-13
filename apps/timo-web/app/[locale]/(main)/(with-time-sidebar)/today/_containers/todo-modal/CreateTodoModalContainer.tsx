"use client";

import { AddTaskButton } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { overlay } from "overlay-kit";

import type { TodoMock } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_mocks/today-todo-mock";

import { useCreateTodoSubmit } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_hooks/todo-modal/use-create-todo-submit";
import { CreateTodoModalContent } from "@/components/todo-modal/CreateTodoModalContent";

export interface CreateTodoModalContainerProps {
  defaultDate?: Date;
  onCreate: (todo: TodoMock) => void;
}

export const CreateTodoModalContainer = ({
  defaultDate,
  onCreate,
}: CreateTodoModalContainerProps) => {
  const t = useTranslations("Home");
  const { handleSubmit } = useCreateTodoSubmit({ onCreate });

  const handleAddClick = () => {
    overlay.open(({ isOpen, close, unmount }) => (
      <CreateTodoModalContent
        isOpen={isOpen}
        onClose={close}
        onExited={unmount}
        defaultDate={defaultDate}
        onSubmit={handleSubmit}
      />
    ));
  };

  return (
    <AddTaskButton variant="big" text={t("addTask")} onClick={handleAddClick} />
  );
};
