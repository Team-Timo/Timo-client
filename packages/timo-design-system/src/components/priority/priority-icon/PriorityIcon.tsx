import { cn } from "../../../lib";

export type Priority =
  | "VERY_HIGH"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "Disable"
  | "white"
  | "blue";

const PRIORITY_COLOR: Record<Priority, string> = {
  VERY_HIGH: "bg-timo-red",
  HIGH: "bg-timo-orange",
  MEDIUM: "bg-timo-gray-600",
  LOW: "bg-timo-black",
  Disable: "bg-timo-gray-500",
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
