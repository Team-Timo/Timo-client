import {
  EndBlackIcon,
  EndBlueIcon,
  PlayTimerIcon,
  PlusBlueIcon,
  PlusIcon,
  StopIcon,
} from "@repo/timo-design-system/icons";

import { TimerControlButton } from "@/components/timer/TimerControlButton";

export interface TimerControlsProps {
  isRunning: boolean;
  onTogglePlay: () => void;
  onEnd: () => void;
  onAddTime: () => void;
}

export const TimerControls = ({
  isRunning,
  onTogglePlay,
  onEnd,
  onAddTime,
}: TimerControlsProps) => {
  return (
    <div className="flex items-center gap-5">
      <TimerControlButton
        icon={<EndBlackIcon />}
        activeIcon={<EndBlueIcon />}
        label="종료"
        onClick={onEnd}
      />

      <TimerControlButton
        icon={
          isRunning ? <StopIcon width={24} height={24} /> : <PlayTimerIcon />
        }
        label={isRunning ? "일시정지" : "재생"}
        variant={isRunning ? "active" : "default"}
        onClick={onTogglePlay}
      />

      <TimerControlButton
        icon={<PlusIcon width={27} height={27} />}
        activeIcon={<PlusBlueIcon />}
        label="시간 추가"
        onClick={onAddTime}
      />
    </div>
  );
};
