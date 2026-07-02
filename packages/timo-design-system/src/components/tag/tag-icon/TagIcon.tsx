export type TagVariant = "default" | "blue";

export interface TagIconProps {
  text: string;
  variant?: TagVariant;
}

export const TagIcon = ({ text, variant = "default" }: TagIconProps) => {
  const isBlue = variant === "blue";
  return (
    <div
      className={`flex h-4 items-center justify-center rounded-[4px] px-[6.5px] ${
        isBlue ? "bg-timo-blue-300" : "bg-timo-gray-300"
      }`}
    >
      <span
        className={`typo-caption-r-10 whitespace-nowrap ${
          isBlue ? "text-white" : "text-timo-gray-800"
        }`}
      >
        {text}
      </span>
    </div>
  );
};
