import { useId, useRef } from "react";

import { cn } from "../../lib";

import type { KeyboardEvent } from "react";

export interface TogglePanelOption {
  value: string;
  label: string;
  controls?: string;
}

export interface TogglePanelProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly [TogglePanelOption, TogglePanelOption];
}

export const TogglePanel = ({
  id: idProp,
  value,
  onChange,
  options,
}: TogglePanelProps) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const next = options.find((option) => option.value !== value);
    if (!next) return;
    onChange(next.value);
    buttonRefs.current[next.value]?.focus();
  };

  return (
    <div
      role="tablist"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className="flex h-7.5 w-full overflow-hidden rounded-[4px]"
    >
      {options.map((option) => (
        <button
          key={option.value}
          ref={(element) => {
            buttonRefs.current[option.value] = element;
          }}
          type="button"
          id={`${id}-${option.value}-tab`}
          role="tab"
          aria-selected={value === option.value}
          aria-controls={option.controls}
          tabIndex={value === option.value ? 0 : -1}
          onClick={() => onChange(option.value)}
          className={cn(
            "typo-body-sb-12 flex flex-1 items-center justify-center px-4 whitespace-nowrap",
            value === option.value
              ? "bg-timo-black text-white"
              : "bg-timo-gray-300 text-timo-black",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
