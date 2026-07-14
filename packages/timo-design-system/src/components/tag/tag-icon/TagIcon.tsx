import { cn } from "../../../lib";

export type TagVariant = "disable" | "default" | "blue";

export interface TagIconProps {
  text: string;
  variant?: TagVariant;
}

const TEXT_COLOR: Record<TagVariant, string> = {
  disable: "text-timo-gray-700",
  default: "text-timo-gray-800",
  blue: "text-white",
};

export const TagIcon = ({ text, variant = "default" }: TagIconProps) => {
  const isBlue = variant === "blue";

  return (
    <div
      className={cn(
        "flex h-4 items-center justify-center rounded-[4px] px-[6.5px]",
        isBlue ? "bg-timo-blue-300" : "bg-timo-gray-300",
      )}
    >
      <span
        className={cn(
          "typo-caption-r-10 whitespace-nowrap",
          TEXT_COLOR[variant],
        )}
      >
        {text}
      </span>
    </div>
  );
};
