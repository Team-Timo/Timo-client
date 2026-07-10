import {
  EndBlackIcon,
  EndBlueIcon,
  PlayTimerIcon,
  PlusBlueIcon,
  PlusIcon,
  StopIcon,
} from "@repo/timo-design-system/icons";
import { Modal } from "@repo/timo-design-system/ui";

import { TimerControlButton } from "@/components/timer/TimerControlButton";

const MODAL_TRIGGER_CLASS =
  "group bg-timo-gray-300 active:bg-timo-blue-50 flex size-14.5 items-center justify-center rounded-full";

export interface TimerControlsProps {
  isRunning: boolean;
  onTogglePlay: () => void;
  onOpenEndModal: () => void;
  onOpenExtendModal: () => void;
}

export const TimerControls = ({
  isRunning,
  onTogglePlay,
  onOpenEndModal,
  onOpenExtendModal,
}: TimerControlsProps) => {
  return (
    <div className="flex items-center gap-5">
      <Modal.Trigger
        aria-label="종료"
        onClick={onOpenEndModal}
        className={MODAL_TRIGGER_CLASS}
      >
        <span className="group-active:hidden">
          <EndBlackIcon />
        </span>
        <span className="hidden group-active:block">
          <EndBlueIcon />
        </span>
      </Modal.Trigger>

      <TimerControlButton
        icon={
          isRunning ? <StopIcon width={24} height={24} /> : <PlayTimerIcon />
        }
        label={isRunning ? "일시정지" : "재생"}
        variant={isRunning ? "active" : "default"}
        onClick={onTogglePlay}
      />

      <Modal.Trigger
        aria-label="시간 추가"
        onClick={onOpenExtendModal}
        className={MODAL_TRIGGER_CLASS}
      >
        <span className="group-active:hidden">
          <PlusIcon width={27} height={27} />
        </span>
        <span className="hidden group-active:block">
          <PlusBlueIcon />
        </span>
      </Modal.Trigger>
    </div>
  );
};
