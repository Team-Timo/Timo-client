import {
  ControlEndActiveIcon,
  ControlEndDefaultIcon,
  ControlEndDisabledIcon,
  ControlPauseActiveIcon,
  ControlPauseDisabledIcon,
  ControlPlayActiveIcon,
  ControlPlayDefaultIcon,
  ControlPlayDisabledIcon,
  ControlPlusActiveIcon,
  ControlPlusDefaultIcon,
  ControlPlusDisabledIcon,
} from "@repo/timo-design-system/icons";
import { Modal } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";

import { TimerControlButton } from "@/components/timer/TimerControlButton";

const MODAL_TRIGGER_CLASS =
  "group bg-timo-gray-300 active:bg-timo-blue-50 focus-visible:border-timo-blue-300 flex size-14.5 items-center justify-center rounded-full border-2 border-transparent outline-none";

export interface TimerControlsProps {
  isRunning: boolean;
  onTogglePlay: () => void;
  onOpenEndModal: () => void;
  onOpenExtendModal: () => void;
  disabled?: boolean;
}

export const TimerControls = ({
  isRunning,
  onTogglePlay,
  onOpenEndModal,
  onOpenExtendModal,
  disabled = false,
}: TimerControlsProps) => {
  const t = useTranslations("Focus.controls");

  return (
    <div className="flex items-center gap-5">
      <Modal.Trigger
        aria-label={t("end")}
        onClick={onOpenEndModal}
        disabled={disabled}
        className={MODAL_TRIGGER_CLASS}
      >
        {disabled ? (
          <ControlEndDisabledIcon width={35} height={35} />
        ) : (
          <>
            <span className="group-active:hidden">
              <ControlEndDefaultIcon width={35} height={35} />
            </span>
            <span className="hidden group-active:block">
              <ControlEndActiveIcon width={35} height={35} />
            </span>
          </>
        )}
      </Modal.Trigger>

      <TimerControlButton
        icon={
          isRunning ? (
            <ControlPauseActiveIcon width={35} height={35} />
          ) : (
            <ControlPlayDefaultIcon width={35} height={35} />
          )
        }
        activeIcon={
          isRunning ? undefined : (
            <ControlPlayActiveIcon width={35} height={35} />
          )
        }
        disabledIcon={
          isRunning ? (
            <ControlPauseDisabledIcon width={35} height={35} />
          ) : (
            <ControlPlayDisabledIcon width={35} height={35} />
          )
        }
        label={isRunning ? t("pause") : t("play")}
        variant={isRunning ? "active" : "default"}
        onClick={onTogglePlay}
        disabled={disabled}
      />

      <Modal.Trigger
        aria-label={t("extend")}
        onClick={onOpenExtendModal}
        disabled={disabled}
        className={MODAL_TRIGGER_CLASS}
      >
        {disabled ? (
          <ControlPlusDisabledIcon width={35} height={35} />
        ) : (
          <>
            <span className="group-active:hidden">
              <ControlPlusDefaultIcon width={35} height={35} />
            </span>
            <span className="hidden group-active:block">
              <ControlPlusActiveIcon width={35} height={35} />
            </span>
          </>
        )}
      </Modal.Trigger>
    </div>
  );
};
