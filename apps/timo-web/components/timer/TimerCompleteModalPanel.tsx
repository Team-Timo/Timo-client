import { Modal } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";

import { formatDurationLabel } from "@/utils/duration/format-duration-label";

export interface TimerCompleteModalPanelProps {
  plannedMinutes: number;
  actualMinutes: number;
  feedbackText?: string;
  onComplete: () => void;
}

export const TimerCompleteModalPanel = ({
  plannedMinutes,
  actualMinutes,
  feedbackText,
  onComplete,
}: TimerCompleteModalPanelProps) => {
  const t = useTranslations("Focus.completeModal");
  const tDuration = useTranslations("Focus.duration");
  const hourUnit = tDuration("hourUnit");
  const minuteUnit = tDuration("minuteUnit");

  return (
    <>
      <Modal.Title>{t("title")}</Modal.Title>
      <p className="typo-headline-r-14 text-timo-black mt-3">
        {feedbackText ?? t("defaultFeedback")}
      </p>

      <div className="bg-timo-gray-500 mt-4.5 h-px w-full" />

      <div className="mt-4 flex gap-6.5">
        <div className="flex flex-col gap-1">
          <span className="typo-body-m-12 text-timo-gray-900">
            {t("plannedLabel")}
          </span>
          <span className="typo-headline-b-20 text-timo-gray-900">
            {formatDurationLabel(plannedMinutes, hourUnit, minuteUnit)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="typo-body-m-12 text-timo-blue-300">
            {t("actualLabel")}
          </span>
          <span className="typo-headline-m-20 text-timo-blue-300">
            {formatDurationLabel(actualMinutes, hourUnit, minuteUnit)}
          </span>
        </div>
      </div>

      <Modal.Footer>
        <Modal.FillButton className="flex-1 px-0" onClick={onComplete}>
          {t("completeButton")}
        </Modal.FillButton>
      </Modal.Footer>
    </>
  );
};
