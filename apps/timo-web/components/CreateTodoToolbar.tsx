"use client";

import {
  CalendarBlueIcon,
  CalendarDisableIcon,
  CalendarOnIcon,
  ClockBlueIcon,
  ClockDisableIcon,
  ClockOnIcon,
  MemoBlueIcon,
  MemoDisableIcon,
  MemoOnIcon,
  RepeatBlueIcon,
  RepeatTodoDisableIcon,
  RepeatTodoOnIcon,
  TrashBlueIcon,
  TrashDisableIcon,
  TrashOnIcon,
} from "@repo/timo-design-system/icons";
import { PriorityIcon, TagIcon } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

import type { ComponentProps } from "react";

type Priority = ComponentProps<typeof PriorityIcon>["priority"];

type ActiveItem =
  | "date"
  | "time"
  | "priority"
  | "tag"
  | "memo"
  | "repeat"
  | "delete";

export interface CreateTodoToolbarProps {
  date: string;
  time: string;
  priority: Priority;
  tag: string;
  hasMemo: boolean;
  hasRepeat?: boolean;
  hasDelete?: boolean;
  isDimmed?: boolean;
  activeItem?: ActiveItem;
  onDateClick: () => void;
  onTimeClick: () => void;
  onPriorityClick: () => void;
  onTagClick: () => void;
  onMemoClick: () => void;
  onRepeatClick?: () => void;
  onDeleteClick?: () => void;
}

export const CreateTodoToolbar = ({
  date,
  time,
  priority,
  tag,
  hasMemo,
  hasRepeat,
  hasDelete,
  isDimmed,
  activeItem,
  onDateClick,
  onTimeClick,
  onPriorityClick,
  onTagClick,
  onMemoClick,
  onRepeatClick,
  onDeleteClick,
}: CreateTodoToolbarProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDateClick}
        className="flex items-center gap-0.5"
        aria-label="날짜"
      >
        {activeItem === "date" ? (
          <CalendarBlueIcon />
        ) : date && !isDimmed ? (
          <CalendarOnIcon />
        ) : (
          <CalendarDisableIcon />
        )}
        {date && (
          <span
            className={cn(
              "typo-caption-r-10",
              activeItem === "date"
                ? "text-timo-blue-300"
                : isDimmed
                  ? "text-timo-gray-700"
                  : "text-timo-gray-900",
            )}
          >
            {date}
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={onTimeClick}
        className="flex items-center"
        aria-label="시간"
      >
        {activeItem === "time" ? (
          <ClockBlueIcon />
        ) : time && !isDimmed ? (
          <ClockOnIcon />
        ) : (
          <ClockDisableIcon />
        )}
        {time && (
          <span
            className={cn(
              "typo-caption-r-10 w-9 text-center",
              activeItem === "time"
                ? "text-timo-blue-300"
                : isDimmed
                  ? "text-timo-gray-700"
                  : "text-timo-gray-900",
            )}
          >
            {time}
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={onPriorityClick}
        aria-label="우선순위"
        className="flex size-5.5 items-center justify-center"
      >
        <PriorityIcon
          priority={
            activeItem === "priority"
              ? "blue"
              : isDimmed
                ? "Disable"
                : (priority ?? "Disable")
          }
        />
      </button>

      <button type="button" onClick={onTagClick} aria-label="태그">
        <TagIcon
          text={tag ?? "태그"}
          variant={
            activeItem === "tag"
              ? "blue"
              : isDimmed
                ? "disable"
                : tag
                  ? "default"
                  : "disable"
          }
        />
      </button>

      <button type="button" onClick={onMemoClick} aria-label="메모">
        {activeItem === "memo" ? (
          <MemoBlueIcon />
        ) : hasMemo && !isDimmed ? (
          <MemoOnIcon />
        ) : (
          <MemoDisableIcon />
        )}
      </button>

      <button type="button" onClick={onRepeatClick} aria-label="반복">
        {activeItem === "repeat" ? (
          <RepeatBlueIcon />
        ) : hasRepeat && !isDimmed ? (
          <RepeatTodoOnIcon />
        ) : (
          <RepeatTodoDisableIcon />
        )}
      </button>

      <button type="button" onClick={onDeleteClick} aria-label="삭제">
        {activeItem === "delete" ? (
          <TrashBlueIcon />
        ) : hasDelete && !isDimmed ? (
          <TrashOnIcon />
        ) : (
          <TrashDisableIcon />
        )}
      </button>
    </div>
  );
};
