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
  TodoPriority,
  TodoTimerStatus,
} from "@/app/home/_types/todo-type";

import { convertDurationToTimeText } from "@/app/home/_utils/todo-time";

const PRIORITY_MAP: Record<TodoPriority, "urgent" | "high" | "medium" | "low"> =
  {
    URGENT: "urgent",
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low",
  };

export interface HomeDayTodoCardProps {
  title: string;
  completed: boolean;
  durationSeconds: number;
  priority: TodoPriority;
  tagName?: string;
  hasMemo: boolean;
  isRepeated: boolean;
  timerStatus: TodoTimerStatus;
  subtaskTitle?: string;
  isSubtaskCompleted?: boolean;
  onToggleCompleted: (completed: boolean) => void;
  onTogglePlay: () => void;
  onToggleSubtaskCompleted?: (completed: boolean) => void;
}

export const HomeDayTodoCard = ({
  title,
  completed,
  durationSeconds,
  priority,
  tagName,
  hasMemo,
  isRepeated,
  timerStatus,
  subtaskTitle,
  isSubtaskCompleted = false,
  onToggleCompleted,
  onTogglePlay,
  onToggleSubtaskCompleted,
}: HomeDayTodoCardProps) => {
  const isRunning = timerStatus === "RUNNING";

  const titleRow = (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex w-[165px] items-center gap-1">
        <Checkbox
          checked={completed}
          onChange={onToggleCompleted}
          disabled={completed}
        />
        <p
          className={cn(
            "typo-body-sb-12 w-[137px] truncate",
            completed ? "text-timo-gray-700" : "text-timo-black",
          )}
        >
          {title}
        </p>
      </div>
      <PlayButton
        variant={isRunning ? "stop" : "play"}
        size="sm"
        disabled={completed}
        onClick={onTogglePlay}
      >
        {completed ? (
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
        completed ? "bg-timo-gray-200" : "bg-white",
      )}
    >
      {subtaskTitle ? (
        <div className="flex w-full flex-col items-start gap-1">
          {titleRow}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isSubtaskCompleted}
              onChange={(checked) => onToggleSubtaskCompleted?.(checked)}
              disabled={completed}
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
            priority={completed ? "Disable" : PRIORITY_MAP[priority]}
          />
          {tagName && <TagIcon text={tagName} />}
          {hasMemo &&
            (completed ? (
              <MemoDisableIcon width={18} height={18} />
            ) : (
              <MemoOnIcon width={18} height={18} />
            ))}
          {isRepeated &&
            (completed ? (
              <RepeatTodoDisableIcon width={18} height={18} />
            ) : (
              <RepeatTodoOnIcon width={18} height={18} />
            ))}
        </div>
        <span
          className={cn(
            "typo-body-sb-12 shrink-0 whitespace-nowrap",
            completed ? "text-timo-gray-700" : "text-timo-gray-900",
          )}
        >
          {convertDurationToTimeText(durationSeconds)}
        </span>
      </div>
    </article>
  );
};
