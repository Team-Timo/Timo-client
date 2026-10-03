import { SidebarLeftIcon, SidebarRightIcon } from "../../../icons";
import { cn } from "../../../lib";

export interface SidebarButtonProps {
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
  label?: string;
}

export const SidebarButton = ({
  isOpen = true,
  onClick,
  className,
  label = "사이드바",
}: SidebarButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={isOpen ? `${label} 닫기` : `${label} 열기`}
      className={cn(
        "border-timo-gray-500 flex size-8 items-center justify-center rounded-[4px] border bg-white",
        className,
      )}
    >
      {isOpen ? <SidebarLeftIcon /> : <SidebarRightIcon />}
    </button>
  );
};
