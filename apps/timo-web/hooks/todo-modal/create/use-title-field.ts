import { useController } from "react-hook-form";

import type { CreateTodoRequest } from "@/schemas/todo/todo-schema";
import type { Control } from "react-hook-form";

import {
  TITLE_MAX_WEIGHTED_LENGTH,
  truncateToWeightedLength,
} from "@/utils/todo/text-length";

export interface UseTitleFieldParams {
  control: Control<CreateTodoRequest>;
}

export const useTitleField = ({ control }: UseTitleFieldParams) => {
  const { field } = useController({ name: "title", control });

  const handleTitleChange = (value: string) => {
    field.onChange(truncateToWeightedLength(value, TITLE_MAX_WEIGHTED_LENGTH));
  };

  return {
    title: field.value,
    handleTitleChange,
  };
};
