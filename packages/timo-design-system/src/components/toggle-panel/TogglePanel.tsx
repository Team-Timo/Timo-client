import { cn } from "@lib";
import { useId, useRef } from "react";

import type { KeyboardEvent, RefObject } from "react";

export type TogglePanelValue = "timebox" | "timer";

export interface TogglePanelProps {
  id?: string;
  value: TogglePanelValue;
  onChange: (value: TogglePanelValue) => void;
  timeboxControls?: string;
  timerControls?: string;
}

interface TogglePanelOption {
  value: TogglePanelValue;
  label: string;
  ref: RefObject<HTMLButtonElement | null>;
  controls?: string;
}

export const TogglePanel = ({
  id: idProp,
  value,
  onChange,
  timeboxControls,
  timerControls,
}: TogglePanelProps) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const timeboxRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<HTMLButtonElement>(null);

  const options: TogglePanelOption[] = [
    {
      value: "timebox",
      label: "Timebox",
      ref: timeboxRef,
      controls: timeboxControls,
    },
    { value: "timer", label: "Timer", ref: timerRef, controls: timerControls },
  ];

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const next = options.find((option) => option.value !== value);
    if (!next) return;
    onChange(next.value);
    next.ref.current?.focus();
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
          ref={option.ref}
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
