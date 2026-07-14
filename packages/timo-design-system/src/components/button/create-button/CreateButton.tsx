import { cn } from "../../../lib";

export interface CreateButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const CreateButton = ({
  label,
  disabled = false,
  onClick,
}: CreateButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "typo-headline-b-14 inline-flex items-center justify-center rounded px-3 py-1.5",
        disabled
          ? "bg-timo-gray-500 text-timo-gray-700 cursor-not-allowed"
          : "bg-timo-blue-300 cursor-pointer text-white",
      )}
    >
      {label}
    </button>
  );
};
