import {
  CalendarOnIcon,
  ClockOnIcon,
  PlayIcon,
  StopIcon,
} from "@repo/timo-design-system/icons";
import { Checkbox, PlayButton } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

import type { FocusTaskSubtask } from "@/app/[locale]/(main)/focus/_types/task-type";

export interface FocusTaskCardProps {
  dayNumber: string;
  dayOfWeek: string;
  title: string;
  completed: boolean;
  dateText: string;
  durationText: string;
  isRunning: boolean;
  subtasks: FocusTaskSubtask[];
  memo?: string;
  onToggleCompleted: (completed: boolean) => void;
  onTogglePlay: () => void;
  onToggleSubtaskCompleted: (subtaskId: number, completed: boolean) => void;
}

export const FocusTaskCard = ({
  dayNumber,
  dayOfWeek,
  title,
  completed,
  dateText,
  durationText,
  isRunning,
  subtasks,
  memo,
  onToggleCompleted,
  onTogglePlay,
  onToggleSubtaskCompleted,
}: FocusTaskCardProps) => {
  return (
    <div className="flex w-full min-w-80 flex-col items-start gap-5 px-[34.5px] pb-8">
      <div className="text-timo-gray-900 flex flex-col items-start">
        <p className="typo-headline-b-30">{dayNumber}</p>
        <p className="typo-headline-m-14">{dayOfWeek}</p>
      </div>

      <div className="flex w-full items-center gap-2.5">
        <Checkbox checked={completed} onChange={onToggleCompleted} />
        <p className="typo-headline-b-22 text-timo-black min-w-0 flex-1 wrap-break-word">
          {title}
        </p>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <CalendarOnIcon width={22} height={22} />
            <span className="typo-caption-r-10 text-timo-gray-900 whitespace-nowrap">
              {dateText}
            </span>
          </div>

          <div className="flex items-center gap-0.5">
            <ClockOnIcon width={22} height={22} />
            <span className="typo-caption-r-10 text-timo-gray-900 w-9 text-center whitespace-nowrap">
              {durationText}
            </span>
          </div>
        </div>

        <PlayButton
          variant={isRunning ? "stop" : "play"}
          size="lg"
          onClick={onTogglePlay}
        >
          {isRunning ? (
            <StopIcon width={24} height={24} />
          ) : (
            <PlayIcon width={24} height={24} />
          )}
        </PlayButton>
      </div>

      <div className="border-timo-gray-500 flex min-h-26 w-full min-w-0 flex-col gap-3 border-t pt-3">
        {subtasks.map((subtask) => (
          <div key={subtask.subtaskId} className="flex items-center gap-2">
            <Checkbox
              checked={subtask.completed}
              onChange={(checked) =>
                onToggleSubtaskCompleted(subtask.subtaskId, checked)
              }
            />
            <p
              className={cn(
                "typo-body-r-12 min-w-0 flex-1 wrap-break-word",
                subtask.completed ? "text-timo-gray-700" : "text-timo-black",
              )}
            >
              {subtask.content}
            </p>
          </div>
        ))}

        {memo && (
          <p className="typo-body-r-12 text-timo-gray-800 min-w-0 wrap-break-word">
            {memo}
          </p>
        )}
      </div>
    </div>
  );
};
