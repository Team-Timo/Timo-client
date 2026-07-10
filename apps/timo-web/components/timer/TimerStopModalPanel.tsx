import { Modal, ModalButton } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";

import { formatDurationLabel } from "@/components/timer/durationLabel";

const TimerStopIcon = () => (
  //TODO: SVG를 컴포넌트 머지 시 변경 예정
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="20"
      cy="20"
      r="18.3333"
      fill="#121212"
      stroke="#121212"
      strokeWidth="3.33333"
    />
    <rect
      x="30.7812"
      y="18.3335"
      width="2.96296"
      height="8.14815"
      transform="rotate(90 30.7812 18.3335)"
      fill="white"
    />
    <path
      d="M17.7604 22.3774L20.6657 22.9593L18.388 34.3325L15.4827 33.7507L17.7604 22.3774Z"
      fill="#4293F7"
    />
    <circle cx="19.9369" cy="19.9394" r="1.791" fill="#F2FC9F" />
    <path
      d="M20 1.85156V4.07378"
      stroke="white"
      strokeWidth="0.740741"
      strokeLinecap="round"
    />
    <path
      d="M20 35.9258V38.148"
      stroke="white"
      strokeWidth="0.740741"
      strokeLinecap="round"
    />
    <path
      d="M38.1459 20H35.9237"
      stroke="white"
      strokeWidth="0.740741"
      strokeLinecap="round"
    />
    <path
      d="M4.07288 20H1.85065"
      stroke="white"
      strokeWidth="0.740741"
      strokeLinecap="round"
    />
  </svg>
);

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
        <TimerStopIcon />
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
