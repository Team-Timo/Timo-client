import { useId } from "react";

import { cn } from "../../lib";

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
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={cn(
        "relative inline-flex h-6 w-6 shrink-0 items-center justify-center",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="peer sr-only"
      />
      <span
        className={cn(
          "peer-focus-visible:ring-timo-blue-300 flex h-4.5 w-4.5 items-center justify-center rounded-[4px] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1",
          !checked && "border-timo-gray-500",
          checked && !disabled && "border-timo-blue-300 bg-timo-blue-300",
          checked && disabled && "bg-timo-blue-100 border-timo-blue-100",
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
            className="text-timo-yellow-300"
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
