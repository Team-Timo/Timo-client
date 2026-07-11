import { useId } from "react";

import { cn } from "../../../lib";

const DEFAULT_MAX_LENGTH = 10;

export interface TagNameInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  isError?: boolean;
  ariaLabel: string;
  maxLengthHint: string;
  duplicateHint: string;
}

export const TagNameInput = ({
  value,
  onChange,
  maxLength = DEFAULT_MAX_LENGTH,
  isError = false,
  ariaLabel,
  maxLengthHint,
  duplicateHint,
}: TagNameInputProps) => {
  const inputId = useId();

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <div
        className={cn(
          "flex w-full items-center gap-2.5 rounded-[4px] border border-solid px-3 py-2.5",
          isError ? "border-timo-red" : "border-timo-gray-500",
        )}
      >
        <input
          id={inputId}
          aria-label={ariaLabel}
          value={value}
          onChange={(event) => onChange(event.target.value.slice(0, maxLength))}
          maxLength={maxLength}
          className="typo-headline-m-14 text-timo-gray-900 focus-visible:ring-timo-blue-300 min-w-0 flex-1 outline-none focus-visible:ring-2"
        />
        <span className="typo-caption-r-10 text-timo-gray-700 shrink-0 whitespace-nowrap">
          {value.length}/{maxLength}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <p className="typo-caption-r-10 text-timo-gray-700">{maxLengthHint}</p>
        <p
          className={cn(
            "typo-caption-r-10",
            isError ? "text-timo-red" : "text-timo-gray-700",
          )}
        >
          {duplicateHint}
        </p>
      </div>
    </div>
  );
};
