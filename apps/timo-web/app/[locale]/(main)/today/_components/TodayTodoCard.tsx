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
import { useEffect, useState } from "react";

import type { ComponentProps, ReactNode } from "react";

import { CreateTodoToolbar } from "@/components/CreateTodoToolbar";


type Priority = ComponentProps<typeof PriorityIcon>["priority"];

function truncateTitle(text: string): string {
  let korean = 0;
  let other = 0;

  for (let i = 0; i < text.length; i++) {
    if (/[가-힣]/.test(text.charAt(i))) {
      korean++;
    } else {
      other++;
    }
    if (korean / 20 + other / 30 > 1) {
      return text.slice(0, i) + "…";
    }
  }
  return text;
}

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
  date?: string;
  time?: string;
  priority?: Priority;
  tag?: string;
  memo?: boolean;
  repeat?: boolean;
}

export interface TodayTodoCardProps {
  title: string;
  isDone?: boolean;
  isDraggable?: boolean;
  icon?: ReactNode;
  onIconClick?: () => void;
  subTodos?: SubTodo[];
  toolbar?: TodayTodoCardToolbar;
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
  toolbar,
  onCheck,
  onPlay,
  onDelete,
  onSubTodoCheck,
}: TodayTodoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isDimmed = isDone && !isHovered;

  useEffect(() => {
    if (isDone && isPlaying) {
      setIsPlaying(false);
      onPlay?.();
    }
    // isDone 변경 시점의 isPlaying/onPlay를 참조하는 것이 의도된 동작
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone]);
  const style = CARD_STYLE[isDimmed ? "done" : "active"];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "border-timo-gray-500 flex w-full flex-col gap-1 rounded-[4px] border px-5 py-4",
        style.card,
      )}
    >
      {/* Title row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Checkbox checked={isDone} onChange={() => onCheck?.()} />
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
            {truncateTitle(title)}
          </span>
        </div>
        <PlayButton
          variant={isPlaying ? "stop" : "play"}
          size="lg"
          disabled={isDone}
          onClick={() => {
            setIsPlaying((prev) => !prev);
            onPlay?.();
          }}
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

      {/* Sub-todos */}
      {subTodos && subTodos.length > 0 && (
        <div className="flex flex-col gap-1 pl-8">
          {subTodos.map((sub) => (
            <div key={sub.id} className="flex items-center gap-2">
              <Checkbox
                checked={sub.isDone ?? false}
                onChange={() => onSubTodoCheck?.(sub.id)}
              />
              <span className={cn("typo-body-r-12", style.subText)}>
                {sub.text}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex justify-end">
        <CreateTodoToolbar
          date={isDimmed ? undefined : toolbar?.date}
          time={isDimmed ? undefined : toolbar?.time}
          priority={isDimmed ? undefined : toolbar?.priority}
          tag={isDimmed ? undefined : toolbar?.tag}
          memo={!isDimmed && toolbar?.memo}
          repeat={!isDimmed && toolbar?.repeat}
          delete={!isDimmed}
          onDeleteClick={onDelete}
        />
      </div>
    </div>
  );
};
