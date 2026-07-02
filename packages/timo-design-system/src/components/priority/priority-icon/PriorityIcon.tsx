import { cn } from "@lib";

export type Priority =
  | "매우중요"
  | "중요"
  | "보통"
  | "낮음"
  | "Disable"
  | "white"
  | "blue";

const PRIORITY_COLOR: Record<Priority, string> = {
  매우중요: "bg-timo-red",
  중요: "bg-timo-orange",
  보통: "bg-timo-gray-600",
  낮음: "bg-timo-black",
  Disable: "bg-timo-gray-500",
  white: "bg-white",
  blue: "bg-timo-blue-300",
};

export interface PriorityIconProps {
  priority: Priority;
}

export const PriorityIcon = ({ priority }: PriorityIconProps) => {
  return (
    <div
      className={cn(
        "size-2 shrink-0 rounded-full transition-colors duration-200 ease-in-out",
        PRIORITY_COLOR[priority],
      )}
    />
  );
};
