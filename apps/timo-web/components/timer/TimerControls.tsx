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
  const variant = isRunning ? "active" : "default";

  return (
    <div className="flex items-center gap-5">
      <TimerControlButton
        icon={isRunning ? <EndBlueIcon /> : <EndBlackIcon />}
        activeIcon={<EndBlueIcon />}
        label="종료"
        variant={variant}
        onClick={onEnd}
      />

      <TimerControlButton
        icon={
          isRunning ? <StopIcon width={24} height={24} /> : <PlayTimerIcon />
        }
        label={isRunning ? "일시정지" : "재생"}
        variant={variant}
        onClick={onTogglePlay}
      />

      <TimerControlButton
        icon={
          isRunning ? <PlusBlueIcon /> : <PlusIcon width={27} height={27} />
        }
        activeIcon={<PlusBlueIcon />}
        label="시간 추가"
        variant={variant}
        onClick={onAddTime}
      />
    </div>
  );
};
