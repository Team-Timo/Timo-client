import { SidebarButton } from "@repo/timo-design-system/ui";

export interface SidebarHeaderProps {
  date: Date;
  isOpen?: boolean;
  onToggleCollapse?: () => void;
}

export const SidebarHeader = ({
  date,
  isOpen = true,
  onToggleCollapse,
}: SidebarHeaderProps) => {
  const day = date.getDate();
  const weekday = new Intl.DateTimeFormat("ko-KR", { weekday: "long" }).format(
    date,
  );

  return (
    <header className="flex items-center justify-between px-4.5 py-3">
      <p className="flex items-center gap-2">
        <span className="typo-headline-b-30 text-timo-black">{day}</span>
        <span className="typo-body-m-12 text-timo-gray-700">{weekday}</span>
      </p>

      <SidebarButton isOpen={isOpen} onClick={onToggleCollapse} />
    </header>
  );
};
