import { ReactElement } from "react";

import { PauseIcon } from "../../icons/generated/Pause";
import { PlayIcon } from "../../icons/generated/Play";
import { PlayDisabledIcon } from "../../icons/generated/PlayDisabled";
import { cn } from "../../lib";

export type PlayButtonVariant = "play" | "stop" | "disabled";

export interface PlayButtonProps {
  variant: PlayButtonVariant;
  onClick?: () => void;
}

const VARIANT_MAP: Record<
  PlayButtonVariant,
  { icon: ReactElement; className: string }
> = {
  play: { icon: <PlayIcon />, className: "cursor-pointer bg-timo-blue-50" },
  stop: { icon: <PauseIcon />, className: "cursor-pointer bg-timo-blue-50" },
  disabled: { icon: <PlayDisabledIcon />, className: "bg-timo-gray-500" },
};

export const PlayButton = ({ variant, onClick }: PlayButtonProps) => {
  const { icon, className } = VARIANT_MAP[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={variant === "disabled"}
      className={cn(
        "inline-flex size-6 items-center justify-center rounded-full",
        className,
      )}
    >
      {icon}
    </button>
  );
};
