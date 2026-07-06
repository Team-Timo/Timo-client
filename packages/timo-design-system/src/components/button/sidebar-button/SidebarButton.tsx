import { SidebarLeftIcon, SidebarRightIcon } from "@icons";
import { cn } from "@lib";

export interface SidebarButtonProps {
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
}

export const SidebarButton = ({
  isOpen = true,
  onClick,
  className,
}: SidebarButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "사이드바 닫기" : "사이드바 열기"}
      className={cn(
        "border-timo-gray-500 flex size-8 items-center justify-center rounded-[4px] border bg-white",
        className,
      )}
    >
      {isOpen ? <SidebarLeftIcon /> : <SidebarRightIcon />}
    </button>
  );
};
