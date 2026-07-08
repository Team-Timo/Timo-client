"use client";

import {
  HamburgerGrayIcon,
  HamburgerIcon,
  PlayDisabledIcon,
  PlayIcon,
  StopIcon,
} from "@repo/timo-design-system/icons";
import {
  Checkbox,
  PlayButton,
  PriorityIcon,
} from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

import type { ComponentProps, ReactNode } from "react";

import { CreateTodoToolbar } from "@/components/CreateTodoToolbar";

type Priority = ComponentProps<typeof PriorityIcon>["priority"];

const CARD_STYLE = {
  active: {
    card: "bg-white",
    title: "text-timo-gray-900",
    subText: "text-timo-gray-700",
  },
  done: {
    card: "bg-timo-gray-200",
    title: "text-timo-gray-700",
    subText: "text-timo-gray-700",
  },
} as const;

export interface SubTodo {
  id: string;
  text: string;
  isDone?: boolean;
}

export interface TodayTodoCardToolbar {
  date: string;
  time: string;
  priority: Priority;
  tag?: string;
  memo: boolean;
  repeat: boolean;
}

export interface TodayTodoCardProps {
  title: string;
  isDone: boolean;
  isDimmed: boolean;
  isPlaying: boolean;
  isDraggable?: boolean;
  icon?: ReactNode;
  onIconClick?: () => void;
  subTodos: SubTodo[];
  toolbar: TodayTodoCardToolbar;
  onCheck: () => void;
  onPlay: () => void;
  onDelete: () => void;
  onSubTodoCheck: (id: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const TodayTodoCard = ({
  title,
  isDone,
  isDimmed,
  isPlaying,
  isDraggable = false,
  icon,
  onIconClick,
  subTodos,
  toolbar,
  onCheck,
  onPlay,
  onDelete,
  onSubTodoCheck,
  onMouseEnter,
  onMouseLeave,
}: TodayTodoCardProps) => {
  const style = CARD_STYLE[isDimmed ? "done" : "active"];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "border-timo-gray-500 flex w-full flex-col gap-1 rounded-[4px] border px-5 py-4",
        style.card,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Checkbox checked={isDone} onChange={() => onCheck()} />
          {isDraggable &&
            (isDimmed ? (
              <HamburgerGrayIcon className="shrink-0" />
            ) : (
              <HamburgerIcon className="shrink-0" />
            ))}
          {icon && (
            <button
              type="button"
              onClick={onIconClick}
              className="shrink-0"
              aria-label="아이콘 선택"
            >
              {icon}
            </button>
          )}
          <span className={cn("typo-headline-b-14 min-w-0", style.title)}>
            {title}
          </span>
        </div>
        <PlayButton
          variant={isPlaying ? "stop" : "play"}
          size="lg"
          disabled={isDone}
          onClick={onPlay}
        >
          {isDone ? (
            <PlayDisabledIcon width={24} height={24} />
          ) : isPlaying ? (
            <StopIcon width={24} height={24} />
          ) : (
            <PlayIcon width={24} height={24} />
          )}
        </PlayButton>
      </div>

      {subTodos.length > 0 && (
        <ul className="flex flex-col gap-1 pl-8">
          {subTodos.map((sub) => (
            <li key={sub.id} className="flex items-center gap-2">
              <Checkbox
                checked={sub.isDone ?? false}
                onChange={() => onSubTodoCheck(sub.id)}
              />
              <span className={cn("typo-body-r-12", style.subText)}>
                {sub.text}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-end">
        <CreateTodoToolbar
          date={isDimmed ? undefined : toolbar.date}
          time={isDimmed ? undefined : toolbar.time}
          priority={isDimmed ? undefined : toolbar.priority}
          tag={isDimmed ? undefined : toolbar.tag}
          memo={!isDimmed && toolbar.memo}
          repeat={!isDimmed && toolbar.repeat}
          delete={!isDimmed}
          onDeleteClick={onDelete}
        />
      </div>
    </div>
  );
};
