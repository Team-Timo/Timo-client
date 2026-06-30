import { cn } from "../../lib/cn";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Checkbox = ({
  checked,
  onChange,
  disabled = false,
  className,
}: CheckboxProps) => {
  return (
    <label
      className={cn(
        "relative inline-flex h-6 w-6 shrink-0 items-center justify-center",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only"
      />
      <span
        className={cn(
          "flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border transition-colors",
          !checked && "border-timo-gray-600 bg-timo-gray-300",
          checked && !disabled && "border-timo-blue-300 bg-timo-blue-300",
          checked && disabled && "bg-timo-blue-300/40 border-transparent",
        )}
      >
        {(checked || disabled) && (
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            overflow="visible"
            fill="none"
            aria-hidden="true"
            className={cn(disabled ? "text-white" : "text-timo-yellow-300")}
          >
            <path
              d="M0.75 3.5L3.5 6.25L9.25 0.75"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </label>
  );
};
