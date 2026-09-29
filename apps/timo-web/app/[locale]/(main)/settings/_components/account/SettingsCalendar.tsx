import { PillButton } from "@repo/timo-design-system/ui";
import Image from "next/image";

interface SettingsCalendarProps {
  iconSrc: string;
  name: string;
  isConnected: boolean;
  connectLabel: string;
  disconnectLabel: string;
  onClick: () => void;
}

export const SettingsCalendar = ({
  iconSrc,
  name,
  isConnected,
  connectLabel,
  disconnectLabel,
  onClick,
}: SettingsCalendarProps) => {
  return (
    <div className="bg-timo-gray-300 flex h-10.25 w-fit items-center gap-4 self-start rounded-lg px-2.5 py-1.5">
      <div className="flex items-center gap-1.5">
        <Image src={iconSrc} alt="" width={20} height={20} unoptimized />
        <span className="typo-headline-m-16 text-timo-gray-700 whitespace-nowrap">
          {name}
        </span>
      </div>

      <PillButton
        variant={isConnected ? "gray-dark" : "blue"}
        onClick={onClick}
      >
        {isConnected ? disconnectLabel : connectLabel}
      </PillButton>
    </div>
  );
};
