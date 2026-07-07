import { SidebarButton } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

export interface TimeSidebarHeaderProps {
  date: Date;
  isOpen?: boolean;
  onToggleCollapse?: () => void;
}

export const TimeSidebarHeader = ({
  date,
  isOpen = true,
  onToggleCollapse,
}: TimeSidebarHeaderProps) => {
  const day = date.getDate();

  const weekday = new Intl.DateTimeFormat("ko-KR", { weekday: "long" }).format(
    date,
  );

  return (
    <header className="relative flex items-center px-4.5 pt-3 pb-3">
      <p
        className={cn(
          "flex items-center gap-2 transition-opacity duration-200 ease-in-out",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <span className="typo-headline-b-30 text-timo-black">{day}</span>
        <span className="typo-body-m-12 text-timo-gray-700">{weekday}</span>
      </p>

      <SidebarButton
        isOpen={isOpen}
        onClick={onToggleCollapse}
        className="absolute top-3 right-4.5"
      />
    </header>
  );
};
