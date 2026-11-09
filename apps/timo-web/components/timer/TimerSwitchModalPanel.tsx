import timoTimerLogo from "@repo/timo-design-system/assets/images/logo/timo-timer.svg";
import { Modal } from "@repo/timo-design-system/ui";
import Image from "next/image";
import { useTranslations } from "next-intl";

export interface TimerSwitchModalPanelProps {
  onSwitch: () => void;
}

export const TimerSwitchModalPanel = ({
  onSwitch,
}: TimerSwitchModalPanelProps) => {
  const t = useTranslations("Focus.switchModal");

  return (
    <>
      <Modal.Icon>
        <Image src={timoTimerLogo} alt="" width={40} height={40} />
      </Modal.Icon>
      <Modal.Title>{t("title")}</Modal.Title>
      <Modal.Description className="whitespace-pre-line">
        {t("description")}
      </Modal.Description>
      <Modal.Footer>
        <Modal.BorderButton>{t("cancelButton")}</Modal.BorderButton>
        <Modal.FillButton onClick={onSwitch}>
          {t("switchButton")}
        </Modal.FillButton>
      </Modal.Footer>
    </>
  );
};
