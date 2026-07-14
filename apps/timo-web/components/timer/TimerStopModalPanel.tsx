import timoTimerLogo from "@repo/timo-design-system/assets/images/logo/timo-timer.svg";
import { Modal, ModalButton } from "@repo/timo-design-system/ui";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { formatDurationLabel } from "@/utils/duration/format-duration-label";

export interface TimerStopModalPanelProps {
  minutes: number;
  onSwitch: () => void;
}

export const TimerStopModalPanel = ({
  minutes,
  onSwitch,
}: TimerStopModalPanelProps) => {
  const t = useTranslations("Focus.stopModal");
  const tDuration = useTranslations("Focus.duration");
  const durationLabel = formatDurationLabel(
    minutes,
    tDuration("hourUnit"),
    tDuration("minuteUnit"),
  );

  return (
    <>
      <Modal.Icon>
        <Image src={timoTimerLogo} alt="" width={40} height={40} />
      </Modal.Icon>
      <Modal.Title>{t("title")}</Modal.Title>
      <Modal.Description>
        {t.rich("description", {
          minutes: durationLabel,
          blue: (chunks) => (
            <span className="text-timo-blue-300">{chunks}</span>
          ),
        })}
      </Modal.Description>
      <Modal.Footer>
        <Modal.BorderButton className="flex-1 px-0">
          {t("continueButton")}
        </Modal.BorderButton>
        <ModalButton variant="fill" className="flex-1 px-0" onClick={onSwitch}>
          {t("switchButton")}
        </ModalButton>
      </Modal.Footer>
    </>
  );
};
