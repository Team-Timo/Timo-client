import {
  PlayDisabledIcon,
  PlayIcon,
  StopIcon,
  TrashDisableIcon,
  TrashOnIcon,
} from "@repo/timo-design-system/icons";
import {
  Checkbox,
  PlayButton,
  TodoToolbar,
  type PriorityLevel,
} from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

import type { KeyboardEvent, ReactNode } from "react";

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
  id: number;
  text: string;
  isDone?: boolean;
}

export interface TodayTodoCardToolbar {
  date: string;
  dateValue: Date;
  time: string;
  priority?: PriorityLevel;
  tag?: string;
  hasMemo: boolean;
  hasRepeat: boolean;
}

export interface TodayTodoCardProps {
  title: string;
  isDone: boolean;
  isDimmed: boolean;
  isPlaying: boolean;
  icon?: ReactNode;
  subTodos: SubTodo[];
  toolbar: TodayTodoCardToolbar;
  onCardClick?: () => void;
  onCheck: () => void;
  onPlay: () => void;
  onSubTodoCheck: (id: number) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const stopPropagation = (e: { stopPropagation: () => void }) =>
  e.stopPropagation();

export const TodayTodoCard = ({
  title,
  isDone,
  isDimmed,
  isPlaying,
  icon,
  subTodos,
  toolbar,
  onCardClick,
  onCheck,
  onPlay,
  onSubTodoCheck,
  onMouseEnter,
  onMouseLeave,
}: TodayTodoCardProps) => {
  const style = CARD_STYLE[isDimmed ? "done" : "active"];

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCardClick?.();
    }
  };

  return (
    <div
      role={onCardClick ? "button" : undefined}
      tabIndex={onCardClick ? 0 : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onCardClick}
      onKeyDown={onCardClick ? handleCardKeyDown : undefined}
      className={cn(
        "border-timo-gray-500 flex w-full flex-col gap-1 rounded-[4px] border px-5 py-4",
        style.card,
        onCardClick && "cursor-pointer",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div
            role="none"
            onClick={stopPropagation}
            onKeyDown={stopPropagation}
          >
            <Checkbox checked={isDone} onChange={() => onCheck()} />
          </div>
          {icon && <span className="shrink-0">{icon}</span>}
          <span
            className={cn("typo-headline-b-14 min-w-0 truncate", style.title)}
          >
            {title}
          </span>
        </div>
        <div role="none" onClick={stopPropagation} onKeyDown={stopPropagation}>
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
      </div>

      {subTodos.length > 0 && (
        <ul className="flex flex-col gap-1 pl-8">
          {subTodos.map((sub) => (
            <li key={sub.id} className="flex items-center gap-2">
              <div
                role="none"
                onClick={stopPropagation}
                onKeyDown={stopPropagation}
              >
                <Checkbox
                  checked={sub.isDone ?? false}
                  onChange={() => onSubTodoCheck(sub.id)}
                />
              </div>
              <span className={cn("typo-body-r-12", style.subText)}>
                {sub.text}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-end gap-2">
        <div className="pointer-events-none">
          <TodoToolbar
            date={isDimmed ? undefined : toolbar.dateValue}
            dateLabel={toolbar.date}
            time={isDimmed ? undefined : toolbar.time}
            timeLabel={toolbar.time}
            timeOptions={[]}
            priority={toolbar.priority}
            tagLabel={toolbar.tag ?? "태그"}
            tags={[]}
            selectedTag={toolbar.tag}
            hasMemo={toolbar.hasMemo}
            isRepeatActive={toolbar.hasRepeat}
            repeat={{
              detailHeading: "상세 설정",
              options: [
                { frequency: "DAILY", label: "매일" },
                { frequency: "WEEKLY", label: "매주" },
                { frequency: "MONTHLY", label: "매월" },
              ],
              frequency: "DAILY",
              weekly: { weekdays: [], selectedWeekdayIds: [] },
              monthly: { repeatDayLabel: "일", repeatDay: "1" },
            }}
          />
        </div>
        <span>{isDimmed ? <TrashDisableIcon /> : <TrashOnIcon />}</span>
      </div>
    </div>
  );
};
