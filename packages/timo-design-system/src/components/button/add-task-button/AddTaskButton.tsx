import { PlusGrayIcon } from "../../../icons";
import { cn } from "../../../lib";

export type AddTaskButtonVariant = "default" | "big";

const ADD_TASK_BUTTON_VARIANT: Record<AddTaskButtonVariant, string> = {
  default: "px-2 typo-body-m-12",
  big: "h-14.5 px-5 typo-headline-m-14",
};

export interface AddTaskButtonProps {
  text: string;
  variant?: AddTaskButtonVariant;
  onClick?: () => void;
}

export const AddTaskButton = ({
  text,
  variant = "default",
  onClick,
}: AddTaskButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "bg-timo-gray-300 rounded-4 flex w-full items-center gap-1 py-1.5",
        ADD_TASK_BUTTON_VARIANT[variant],
      )}
    >
      <span className="flex size-5.5 shrink-0 items-center justify-center">
        <PlusGrayIcon />
      </span>

      <span className="text-timo-gray-700 min-w-0 flex-1 truncate text-left">
        {text}
      </span>
    </button>
  );
};
