import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
import { useTranslations } from "next-intl";

import type {
  TodoPriorityTypes,
  TodoTimerStatusTypes,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";

import { convertDurationToTimeText } from "@/utils/todo/todo-time";

type PriorityLabelKeyTypes = "urgent" | "high" | "medium" | "low";

const PRIORITY_LABEL_KEY: Record<TodoPriorityTypes, PriorityLabelKeyTypes> = {
  VERY_HIGH: "urgent",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

const isInteractiveElement = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  Boolean(target.closest("button, input, label"));

export interface HomeTodoCardProps {
  todoId: number;
  title: string;
  isCompleted: boolean;
  durationSeconds: number;
  priority: TodoPriorityTypes;
  tagName?: string;
  hasMemo: boolean;
  isRepeated: boolean;
  timerStatus: TodoTimerStatusTypes;
  subtaskTitle?: string;
  isSubtaskCompleted?: boolean;
  onClickTodo?: () => void;
  onToggleCompleted: (completed: boolean) => void;
  onTogglePlay: () => void;
  onToggleSubtaskCompleted?: (completed: boolean) => void;
}

export const HomeTodoCard = ({
  todoId,
  title,
  isCompleted,
  durationSeconds,
  priority,
  tagName,
  hasMemo,
  isRepeated,
  timerStatus,
  subtaskTitle,
  isSubtaskCompleted = false,
  onClickTodo,
  onToggleCompleted,
  onTogglePlay,
  onToggleSubtaskCompleted,
}: HomeTodoCardProps) => {
  const tCommon = useTranslations("Common");

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todoId, disabled: isCompleted });

  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isRunning = timerStatus === "RUNNING";

  const priorityLabel = tCommon(`priority.${PRIORITY_LABEL_KEY[priority]}`);

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    if (isInteractiveElement(event.target)) return;

    onClickTodo?.();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (isInteractiveElement(event.target)) return;
    if (!onClickTodo) return;
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    onClickTodo();
  };

  const stopInteractiveEvent = (
    event: MouseEvent<HTMLButtonElement> | PointerEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
  };

  const handlePlayClick = (event: MouseEvent<HTMLButtonElement>) => {
    stopInteractiveEvent(event);
    onTogglePlay();
  };

  const titleRow = (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex min-w-0 flex-1 items-center gap-1">
        <Checkbox checked={isCompleted} onChange={onToggleCompleted} />
        <p
          className={cn(
            "typo-body-sb-12 min-w-0 flex-1 truncate",
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
        onClick={handlePlayClick}
        onPointerDown={stopInteractiveEvent}
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
    <div
      ref={setNodeRef}
      style={sortableStyle}
      {...attributes}
      {...listeners}
      role={onClickTodo ? "button" : attributes.role}
      tabIndex={onClickTodo ? 0 : attributes.tabIndex}
      onClick={onClickTodo ? handleCardClick : undefined}
      onKeyDown={onClickTodo ? handleCardKeyDown : undefined}
      className={cn(
        "border-timo-gray-500 flex w-full shrink-0 flex-col items-start gap-2 overflow-hidden rounded-[4px] border border-solid px-3.5 py-3",
        isCompleted ? "bg-timo-gray-200" : "bg-white",
        onClickTodo && "cursor-pointer",
      )}
    >
      {subtaskTitle ? (
        <div className="flex w-full flex-col items-start gap-1">
          {titleRow}
          <div className="flex w-full min-w-0 items-center gap-2">
            <Checkbox
              checked={isSubtaskCompleted}
              onChange={(checked) => onToggleSubtaskCompleted?.(checked)}
            />
            <p className="typo-body-r-12 text-timo-gray-700 min-w-0 flex-1 truncate">
              {subtaskTitle}
            </p>
          </div>
        </div>
      ) : (
        titleRow
      )}
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1">
          <PriorityIcon
            priority={isCompleted ? "Disable" : priority}
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
    </div>
  );
};
