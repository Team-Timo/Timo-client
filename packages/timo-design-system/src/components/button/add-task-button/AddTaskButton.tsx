import { PlusIcon } from "@icons";
import { cn } from "@lib";

export type AddTaskButtonVariant = "default" | "weekly" | "big";

const ADD_TASK_BUTTON_VARIANT: Record<AddTaskButtonVariant, string> = {
  default: "w-57.5 px-2 typo-body-m-12",
  weekly: "w-29 px-2 typo-body-m-12",
  big: "h-14.5 w-155 px-5 typo-headline-m-14",
};

export interface AddTaskButtonProps {
  text?: string;
  variant?: AddTaskButtonVariant;
  onClick?: () => void;
}

export const AddTaskButton = ({
  text = "할 일을 추가하세요",
  variant = "default",
  onClick,
}: AddTaskButtonProps) => {
  const isWeekly = variant === "weekly";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "bg-timo-gray-300 rounded-4 flex items-center gap-1 py-1.5",
        ADD_TASK_BUTTON_VARIANT[variant],
      )}
    >
      <span className="flex size-5.5 shrink-0 items-center justify-center">
        <PlusIcon />
      </span>

      <span
        className={cn(
          "text-timo-gray-700 whitespace-nowrap",
          isWeekly
            ? "min-w-0 flex-1 overflow-hidden text-ellipsis"
            : "shrink-0",
        )}
      >
        {text}
      </span>
    </button>
  );
};
