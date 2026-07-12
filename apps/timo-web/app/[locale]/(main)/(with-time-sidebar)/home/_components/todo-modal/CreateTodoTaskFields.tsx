import { Checkbox } from "@repo/timo-design-system/ui";

import type { CreateTodoRequest } from "@/api/todo/todo-schema";
import type { UseFormRegister } from "react-hook-form";

export interface CreateTodoTaskFieldsProps {
  register: UseFormRegister<CreateTodoRequest>;
  titlePlaceholder: string;
  subtaskInput: string;
  subtaskPlaceholder: string;
  onSubtaskInputChange: (value: string) => void;
}

export const CreateTodoTaskFields = ({
  register,
  titlePlaceholder,
  subtaskInput,
  subtaskPlaceholder,
  onSubtaskInputChange,
}: CreateTodoTaskFieldsProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-1.5">
      <div className="flex w-full items-center gap-2">
        <Checkbox checked={false} onChange={() => {}} disabled />
        <input
          {...register("title")}
          placeholder={titlePlaceholder}
          className="typo-headline-b-14 text-timo-black min-w-0 flex-1 outline-none"
        />
      </div>
      <div className="flex w-full items-center gap-2">
        <Checkbox checked={false} onChange={() => {}} disabled />
        <input
          value={subtaskInput}
          onChange={(event) => onSubtaskInputChange(event.target.value)}
          placeholder={subtaskPlaceholder}
          className="typo-body-r-12 text-timo-gray-800 min-w-0 flex-1 outline-none"
        />
      </div>
    </div>
  );
};
