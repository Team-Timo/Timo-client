"use client";

import {
  CalendarDisableIcon,
  CalendarOnIcon,
  ClockDisableIcon,
  ClockOnIcon,
  HamburgerGrayIcon,
  HamburgerIcon,
  MemoDisableIcon,
  MemoOnIcon,
  PlayDisabledIcon,
  PlayIcon,
  RepeatTodoDisableIcon,
  RepeatTodoOnIcon,
  TrashDisableIcon,
  TrashOnIcon,
} from "@repo/timo-design-system/icons";
import {
  Checkbox,
  PlayButton,
  PriorityIcon,
  TagIcon,
} from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

import type { ComponentProps, ReactNode } from "react";

type Priority = ComponentProps<typeof PriorityIcon>["priority"];

const CARD_STYLE = {
  active: {
    card: "bg-white",
    title: "text-timo-gray-900",
    subText: "text-timo-gray-700",
    meta: "text-timo-gray-900",
  },
  done: {
    card: "bg-timo-gray-200",
    title: "text-timo-gray-700",
    subText: "text-timo-gray-700",
    meta: "text-timo-gray-700",
  },
} as const;

export interface SubTodo {
  id: string;
  text: string;
  isDone?: boolean;
}

export interface TodayTodoCardProps {
  title: string;
  isDone?: boolean;
  isDraggable?: boolean;
  icon?: ReactNode;
  onIconClick?: () => void;
  subTodos?: SubTodo[];
  date?: string;
  time?: string;
  priority?: Priority;
  tag?: string;
  hasMemo?: boolean;
  hasRepeat?: boolean;
  onCheck?: () => void;
  onPlay?: () => void;
  onDelete?: () => void;
  onSubTodoCheck?: (id: string) => void;
}

export const TodayTodoCard = ({
  title,
  isDone = false,
  isDraggable = false,
  icon,
  onIconClick,
  subTodos,
  date,
  time,
  priority,
  tag,
  hasMemo,
  hasRepeat,
  onCheck,
  onPlay,
  onDelete,
  onSubTodoCheck,
}: TodayTodoCardProps) => {
  const style = CARD_STYLE[isDone ? "done" : "active"];

  return (
    <div
      className={cn(
        "border-timo-gray-500 flex w-full flex-col gap-1 rounded-[4px] border px-5 py-4",
        style.card,
      )}
    >
      {/* Title row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Checkbox
            checked={isDone}
            onChange={() => onCheck?.()}
            disabled={isDone}
          />
          {isDraggable &&
            (isDone ? (
              <HamburgerGrayIcon className="shrink-0" />
            ) : (
              <HamburgerIcon className="shrink-0" />
            ))}
          {(icon || onIconClick) && (
            <button
              type="button"
              onClick={onIconClick}
              className="shrink-0"
              aria-label="아이콘 선택"
            >
              {icon}
            </button>
          )}
          <span
            className={cn("typo-headline-b-14 min-w-0 truncate", style.title)}
          >
            {title}
          </span>
        </div>
        <PlayButton variant="play" size="lg" disabled={isDone} onClick={onPlay}>
          {isDone ? (
            <PlayDisabledIcon width={24} height={24} />
          ) : (
            <PlayIcon width={24} height={24} />
          )}
        </PlayButton>
      </div>

      {/* Sub-todos */}
      {subTodos && subTodos.length > 0 && (
        <div className="flex flex-col gap-1 pl-8">
          {subTodos.map((sub) => (
            <div key={sub.id} className="flex items-center gap-2">
              <Checkbox
                checked={sub.isDone ?? false}
                onChange={() => onSubTodoCheck?.(sub.id)}
                disabled={isDone}
              />
              <span className={cn("typo-body-r-12", style.subText)}>
                {sub.text}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-end gap-2">
        {date && (
          <button
            type="button"
            className="flex items-center gap-0.5"
            aria-label="날짜"
          >
            {isDone ? <CalendarDisableIcon /> : <CalendarOnIcon />}
            <span className={cn("typo-caption-r-10", style.meta)}>{date}</span>
          </button>
        )}
        {time && (
          <button
            type="button"
            className="flex items-center gap-0.5"
            aria-label="시간"
          >
            {isDone ? <ClockDisableIcon /> : <ClockOnIcon />}
            <span className={cn("typo-caption-r-10", style.meta)}>{time}</span>
          </button>
        )}
        {priority && <PriorityIcon priority={isDone ? "Disable" : priority} />}
        {tag && <TagIcon text={tag} />}
        {hasMemo && (isDone ? <MemoDisableIcon /> : <MemoOnIcon />)}
        {hasRepeat &&
          (isDone ? <RepeatTodoDisableIcon /> : <RepeatTodoOnIcon />)}
        <button
          type="button"
          onClick={onDelete}
          disabled={isDone}
          aria-label="삭제"
          className={cn(isDone && "cursor-not-allowed")}
        >
          {isDone ? <TrashDisableIcon /> : <TrashOnIcon />}
        </button>
      </div>
    </div>
  );
};
