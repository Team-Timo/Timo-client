import { cn } from "@repo/timo-design-system/utils";

export interface OnboardingSelectCardProps {
  size: "sm" | "lg";
  selected: boolean;
  label: string;
  sublabel: string;
  onClick?: () => void;
}

export const OnboardingSelectCard = ({
  size,
  selected,
  label,
  sublabel,
  onClick,
}: OnboardingSelectCardProps) => {
  const radioIcon = (
    <div
      className={cn(
        "size-4.5 shrink-0 rounded-full bg-white",
        selected
          ? "border-timo-blue-300 border-[5px]"
          : "border-timo-gray-500 border-2",
      )}
    />
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex rounded-[4px] border px-4 py-2 text-left",
        selected
          ? "border-timo-blue-300 bg-timo-blue-50"
          : "border-timo-gray-500 bg-white",
        size === "sm" ? "w-37.5" : "w-76 flex-row items-center justify-between",
      )}
    >
      {size === "sm" ? (
        <div className="flex w-full flex-col items-end gap-1">
          <div className="flex w-full flex-col">
            <span
              className={cn(
                "typo-headline-b-16",
                selected ? "text-timo-blue-300" : "text-timo-gray-900",
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "typo-body-m-12",
                selected ? "text-timo-blue-300" : "text-timo-gray-700",
              )}
            >
              {sublabel}
            </span>
          </div>
          {radioIcon}
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <span
              className={cn(
                "typo-headline-b-16",
                selected ? "text-timo-blue-300" : "text-timo-gray-900",
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "typo-body-m-12",
                selected ? "text-timo-blue-300" : "text-timo-gray-700",
              )}
            >
              {sublabel}
            </span>
          </div>
          {radioIcon}
        </>
      )}
    </button>
  );
};
