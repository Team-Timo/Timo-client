import { cn } from "../../lib";

export type TagVariant = "과제" | "운동" | "일상" | "업무" | "기타";

const TAG_BG: Record<TagVariant, string> = {
  과제: "bg-timo-yellow-300",
  운동: "bg-timo-green",
  일상: "bg-timo-blue-75",
  업무: "bg-timo-gray-900",
  기타: "bg-timo-gray-500",
};

const TAG_TEXT_COLOR: Record<TagVariant, string> = {
  과제: "text-timo-black",
  운동: "text-white",
  일상: "text-white",
  업무: "text-white",
  기타: "text-timo-gray-800",
};

export interface TagProps {
  variant?: TagVariant;
}

export const Tag = ({ variant = "과제" }: TagProps) => {
  return (
    <div
      className={cn(
        "flex h-4 w-7.5 items-center justify-center rounded-[4px]",
        TAG_BG[variant],
      )}
    >
      <span
        className={cn(
          "typo-caption-r-10 whitespace-nowrap",
          TAG_TEXT_COLOR[variant],
        )}
      >
        {variant}
      </span>
    </div>
  );
};
