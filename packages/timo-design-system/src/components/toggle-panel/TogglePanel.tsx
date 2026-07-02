import { cn } from "@lib";

export type TogglePanelValue = "timebox" | "timer";

export interface TogglePanelProps {
  value: TogglePanelValue;
  onChange: (value: TogglePanelValue) => void;
}

export const TogglePanel = ({ value, onChange }: TogglePanelProps) => {
  return (
    <div className="flex h-7.5 w-full overflow-hidden rounded-lg">
      <button
        type="button"
        aria-pressed={value === "timebox"}
        onClick={() => onChange("timebox")}
        className={cn(
          "typo-body-sb-12 flex flex-1 items-center justify-center px-4 whitespace-nowrap",
          value === "timebox"
            ? "bg-timo-black text-white"
            : "bg-timo-gray-300 text-timo-black",
        )}
      >
        Timebox
      </button>
      <button
        type="button"
        aria-pressed={value === "timer"}
        onClick={() => onChange("timer")}
        className={cn(
          "typo-body-sb-12 flex flex-1 items-center justify-center px-4 whitespace-nowrap",
          value === "timer"
            ? "bg-timo-black text-white"
            : "bg-timo-gray-300 text-timo-black",
        )}
      >
        Timer
      </button>
    </div>
  );
};
