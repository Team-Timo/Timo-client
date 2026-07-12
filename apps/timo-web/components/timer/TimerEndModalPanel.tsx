import timoTimerLogo from "@repo/timo-design-system/assets/images/logo/timo-timer.svg";
import { Modal, ModalButton } from "@repo/timo-design-system/ui";
import Image from "next/image";
import { useTranslations } from "next-intl";

export interface TimerEndModalPanelProps {
  onContinue: () => void;
  onComplete: () => void;
}

export const TimerEndModalPanel = ({
  onContinue,
  onComplete,
}: TimerEndModalPanelProps) => {
  const t = useTranslations("Focus.endModal");

  return (
    <>
      <Modal.Icon>
        <Image src={timoTimerLogo} alt="" width={40} height={40} />
      </Modal.Icon>
      <Modal.Title>{t("title")}</Modal.Title>
      <Modal.Description>{t("description")}</Modal.Description>
      <Modal.Footer>
        <ModalButton
          variant="border"
          className="flex-1 px-0"
          onClick={onContinue}
        >
          {t("continueButton")}
        </ModalButton>
        <ModalButton
          variant="fill"
          className="flex-1 px-0"
          onClick={onComplete}
        >
          {t("completeButton")}
        </ModalButton>
      </Modal.Footer>
    </>
  );
};
