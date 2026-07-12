import {
  PlayDisabledIcon,
  PlayIcon,
  StopIcon,
} from "@repo/timo-design-system/icons";
import { Checkbox, PlayButton } from "@repo/timo-design-system/ui";

import type {
  TodoSubtask,
  TodoTimerStatusTypes,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

export interface DetailTodoTaskFieldsProps {
  title: string;
  isCompleted: boolean;
  timerStatus: TodoTimerStatusTypes;
  subtasks: TodoSubtask[];
  onToggleCompleted: (completed: boolean) => void;
  onTogglePlay: () => void;
  onToggleSubtaskCompleted: (subtaskId: number, completed: boolean) => void;
}

export const DetailTodoTaskFields = ({
  title,
  isCompleted,
  timerStatus,
  subtasks,
  onToggleCompleted,
  onTogglePlay,
  onToggleSubtaskCompleted,
}: DetailTodoTaskFieldsProps) => {
  return (
    <div className="mt-3 flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox checked={isCompleted} onChange={onToggleCompleted} />
          <p className="typo-headline-b-14 text-timo-black min-w-0 truncate">
            {title}
          </p>
        </div>

        <PlayButton
          variant={timerStatus === "RUNNING" ? "stop" : "play"}
          size="lg"
          disabled={isCompleted}
          onClick={onTogglePlay}
        >
          {isCompleted ? (
            <PlayDisabledIcon width={24} height={24} />
          ) : timerStatus === "RUNNING" ? (
            <StopIcon width={24} height={24} />
          ) : (
            <PlayIcon width={24} height={24} />
          )}
        </PlayButton>
      </div>

      {subtasks.length > 0 && (
        <div className="flex flex-col">
          {subtasks.map((subtask) => (
            <div key={subtask.subtaskId} className="flex items-center gap-2">
              <Checkbox
                checked={subtask.completed}
                onChange={(completed) =>
                  onToggleSubtaskCompleted(subtask.subtaskId, completed)
                }
              />
              <p className="typo-body-r-12 text-timo-gray-700 min-w-0 truncate">
                {subtask.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
