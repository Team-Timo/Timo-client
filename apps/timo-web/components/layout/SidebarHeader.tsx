import { SidebarRightIcon } from "@repo/timo-design-system/icons";

export interface SidebarHeaderProps {
  date: Date;
  onToggleCollapse?: () => void;
}

export const SidebarHeader = ({
  date,
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

      <button
        type="button"
        aria-label="사이드바 접기"
        onClick={onToggleCollapse}
        className="border-timo-gray-500 flex size-8 items-center justify-center rounded-[4px] border"
      >
        <SidebarRightIcon />
      </button>
    </header>
  );
};
