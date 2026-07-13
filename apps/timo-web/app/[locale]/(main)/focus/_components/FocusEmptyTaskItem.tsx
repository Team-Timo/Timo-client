import {
  CalendarDisableIcon,
  ClockDisableIcon,
  PlayDisabledIcon,
} from "@repo/timo-design-system/icons";
import { Checkbox, PlayButton } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";

export interface FocusEmptyTaskItemProps {
  dayNumber: string;
  dayOfWeek: string;
  dateText: string;
}

export const FocusEmptyTaskItem = ({
  dayNumber,
  dayOfWeek,
  dateText,
}: FocusEmptyTaskItemProps) => {
  const t = useTranslations("Focus");

  return (
    <section className="flex w-full min-w-80 flex-col items-start gap-5 px-[34.5px] pb-8">
      <div className="text-timo-gray-900 flex flex-col items-start">
        <p className="typo-headline-b-30">{dayNumber}</p>
        <p className="typo-headline-m-14">{dayOfWeek}</p>
      </div>

      <div className="flex w-full items-center gap-2.5">
        <Checkbox checked disabled onChange={() => {}} />
        <p className="typo-headline-b-22 text-timo-black min-w-0 flex-1 wrap-break-word">
          {t("empty")}
        </p>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <CalendarDisableIcon width={22} height={22} />
            <span className="typo-caption-r-10 text-timo-gray-700 whitespace-nowrap">
              {dateText}
            </span>
          </div>

          <div className="flex items-center gap-0.5">
            <ClockDisableIcon width={22} height={22} />
            <span className="typo-caption-r-10 text-timo-gray-700 w-9 text-center whitespace-nowrap">
              00:00
            </span>
          </div>
        </div>

        <PlayButton variant="play" size="lg" disabled>
          <PlayDisabledIcon width={24} height={24} />
        </PlayButton>
      </div>

      <div className="border-timo-gray-500 min-h-26 w-full border-t" />
    </section>
  );
};
