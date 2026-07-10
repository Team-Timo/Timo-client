import { cn } from "../../../lib";

export type Priority =
  | "urgent"
  | "high"
  | "medium"
  | "low"
  | "Disable"
  | "white"
  | "blue";

const PRIORITY_COLOR: Record<Priority, string> = {
  urgent: "bg-timo-red",
  high: "bg-timo-orange",
  medium: "bg-timo-gray-600",
  low: "bg-timo-black",
  Disable: "bg-timo-gray-700",
  white: "bg-white",
  blue: "bg-timo-blue-300",
};

export interface PriorityIconProps {
  priority: Priority;
  label?: string;
}

export const PriorityIcon = ({ priority, label }: PriorityIconProps) => {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        "size-2 shrink-0 rounded-full transition-colors duration-200 ease-in-out",
        PRIORITY_COLOR[priority],
      )}
    />
  );
};
