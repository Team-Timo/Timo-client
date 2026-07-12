import { useState } from "react";
import { useController } from "react-hook-form";

import type { CreateTodoRequest, TodoIcon } from "@/api/todo/todo-schema";
import type { Control } from "react-hook-form";

export interface UseIconFieldParams {
  control: Control<CreateTodoRequest>;
}

export const useIconField = ({ control }: UseIconFieldParams) => {
  const [isIconPanelOpen, setIsIconPanelOpen] = useState(false);
  const { field } = useController({ name: "icon", control });

  const openIconPanel = () => setIsIconPanelOpen(true);
  const toggleIconPanel = () => setIsIconPanelOpen((prev) => !prev);
  const selectIcon = (value: TodoIcon) => field.onChange(value);
  const removeIcon = () => field.onChange(null);

  return {
    icon: field.value,
    isIconPanelOpen,
    openIconPanel,
    toggleIconPanel,
    selectIcon,
    removeIcon,
  };
};
