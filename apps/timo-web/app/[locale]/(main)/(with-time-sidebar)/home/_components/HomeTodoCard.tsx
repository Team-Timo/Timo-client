import {
  MemoDisableIcon,
  MemoOnIcon,
  PlayDisabledIcon,
  PlayIcon,
  RepeatTodoDisableIcon,
  RepeatTodoOnIcon,
  StopIcon,
} from "@repo/timo-design-system/icons";
import {
  Checkbox,
  PlayButton,
  PriorityIcon,
  TagIcon,
} from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

import type {
  TodoPriorityTypes,
  TodoTimerStatusTypes,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import { convertDurationToTimeText } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/todo-time";

const PRIORITY_MAP: Record<
  TodoPriorityTypes,
  "urgent" | "high" | "medium" | "low"
> = {
  URGENT: "urgent",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

export interface HomeTodoCardProps {
  title: string;
  isCompleted: boolean;
  durationSeconds: number;
  priority: TodoPriorityTypes;
  priorityLabel?: string;
  tagName?: string;
  hasMemo: boolean;
  isRepeated: boolean;
  timerStatus: TodoTimerStatusTypes;
  subtaskTitle?: string;
  isSubtaskCompleted?: boolean;
  onToggleCompleted: (completed: boolean) => void;
  onTogglePlay: () => void;
  onToggleSubtaskCompleted?: (completed: boolean) => void;
}

export const HomeTodoCard = ({
  title,
  isCompleted,
  durationSeconds,
  priority,
  priorityLabel,
  tagName,
  hasMemo,
  isRepeated,
  timerStatus,
  subtaskTitle,
  isSubtaskCompleted = false,
  onToggleCompleted,
  onTogglePlay,
  onToggleSubtaskCompleted,
}: HomeTodoCardProps) => {
  const isRunning = timerStatus === "RUNNING";

  const titleRow = (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex w-[165px] items-center gap-1">
        <Checkbox
          checked={isCompleted}
          onChange={onToggleCompleted}
          disabled={isCompleted}
        />
        <p
          className={cn(
            "typo-body-sb-12 w-[137px] truncate",
            isCompleted ? "text-timo-gray-700" : "text-timo-black",
          )}
        >
          {title}
        </p>
      </div>
      <PlayButton
        variant={isRunning ? "stop" : "play"}
        size="sm"
        disabled={isCompleted}
        onClick={onTogglePlay}
      >
        {isCompleted ? (
          <PlayDisabledIcon />
        ) : isRunning ? (
          <StopIcon />
        ) : (
          <PlayIcon />
        )}
      </PlayButton>
    </div>
  );

  return (
    <article
      className={cn(
        "border-timo-gray-500 flex size-full flex-col items-start gap-2 overflow-hidden rounded-[4px] border border-solid px-3.5 py-3",
        isCompleted ? "bg-timo-gray-200" : "bg-white",
      )}
    >
      {subtaskTitle ? (
        <div className="flex w-full flex-col items-start gap-1">
          {titleRow}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isSubtaskCompleted}
              onChange={(checked) => onToggleSubtaskCompleted?.(checked)}
              disabled={isCompleted}
            />
            <p className="typo-body-r-12 text-timo-gray-700">{subtaskTitle}</p>
          </div>
        </div>
      ) : (
        titleRow
      )}
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1">
          <PriorityIcon
            priority={isCompleted ? "Disable" : PRIORITY_MAP[priority]}
            label={priorityLabel}
          />
          {tagName && <TagIcon text={tagName} />}
          {hasMemo &&
            (isCompleted ? (
              <MemoDisableIcon width={18} height={18} />
            ) : (
              <MemoOnIcon width={18} height={18} />
            ))}
          {isRepeated &&
            (isCompleted ? (
              <RepeatTodoDisableIcon width={18} height={18} />
            ) : (
              <RepeatTodoOnIcon width={18} height={18} />
            ))}
        </div>
        <span
          className={cn(
            "typo-body-sb-12 shrink-0 whitespace-nowrap",
            isCompleted ? "text-timo-gray-700" : "text-timo-gray-900",
          )}
        >
          {convertDurationToTimeText(durationSeconds)}
        </span>
      </div>
    </article>
  );
};
