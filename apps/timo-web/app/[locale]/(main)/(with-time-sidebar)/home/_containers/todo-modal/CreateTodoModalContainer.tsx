"use client";

import { AddTaskButton } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { overlay } from "overlay-kit";

import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import { CreateTodoModalContent } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/todo-modal/CreateTodoModalContent";
import { useCreateTodoSubmit } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/todo-modal/use-create-todo-submit";

export interface CreateTodoModalContainerProps {
  defaultDate?: Date;
  onCreate: (todo: Todo) => void;
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

  return <AddTaskButton text={t("addTask")} onClick={handleAddClick} />;
};
