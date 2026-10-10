import {
  CalendarDisableIcon,
  CalendarOnIcon,
  ClockDisableIcon,
  ClockOnIcon,
  ControlPauseActiveIcon,
  ControlPlayActiveIcon,
  MemoDisableIcon,
  MemoOnIcon,
  PlayDisabledIcon,
  RepeatDisableIcon,
  RepeatOnIcon,
} from "@repo/timo-design-system/icons";
import {
  Checkbox,
  PlayButton,
  PriorityIcon,
  TagIcon,
  type PriorityLevel,
} from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";
import { useTranslations } from "next-intl";

import type { KeyboardEvent, ReactNode } from "react";

const CARD_STYLE = {
  active: {
    card: "bg-white",
    title: "text-timo-gray-900",
    subText: "text-timo-gray-700",
    toolbarText: "text-timo-gray-900",
  },
  done: {
    card: "bg-timo-gray-200",
    title: "text-timo-gray-700",
    subText: "text-timo-gray-700",
    toolbarText: "text-timo-gray-700",
  },
} as const;

const TOOLBAR_ICON_CLASS_NAME = "size-4.5 shrink-0 md:size-5.5";

export interface SubTodo {
  id: number;
  text: string;
  isDone?: boolean;
}

export interface TodayTodoCardToolbar {
  date: string;
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
  isPlayHighlighted: boolean;
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
  isPlayHighlighted,
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
  const t = useTranslations("Home.createModal");
  const tCommon = useTranslations("Common");
  const style = CARD_STYLE[isDimmed ? "done" : "active"];

  const priorityLabel = toolbar.priority
    ? tCommon(`priority.${toolbar.priority}`)
    : undefined;

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
        "border-timo-gray-500 flex w-full flex-col gap-1 overflow-hidden rounded-[4px] border px-3.5 py-3 md:min-w-80 md:px-5 md:py-4",
        style.card,
        onCardClick && "cursor-pointer",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div
            role="none"
            className="inline-flex items-center"
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
            active={isPlayHighlighted}
            onClick={(event) => {
              stopPropagation(event);
              onPlay();
            }}
            onPointerDown={stopPropagation}
          >
            {isDone ? (
              <PlayDisabledIcon width={24} height={24} />
            ) : isPlaying ? (
              <ControlPauseActiveIcon width={24} height={24} />
            ) : isPlayHighlighted ? (
              <ControlPlayActiveIcon width={24} height={24} />
            ) : (
              <PlayDisabledIcon width={24} height={24} />
            )}
          </PlayButton>
        </div>
      </div>

      {subTodos.length > 0 && (
        <ul className="flex flex-col gap-1">
          {subTodos.map((sub) => (
            <li key={sub.id} className="flex items-center gap-2">
              <div
                role="none"
                className="inline-flex items-center"
                onClick={stopPropagation}
                onKeyDown={stopPropagation}
              >
                <Checkbox
                  checked={sub.isDone ?? false}
                  onChange={() => onSubTodoCheck(sub.id)}
                />
              </div>
              <span
                className={cn(
                  "typo-body-r-12",
                  sub.isDone ? "text-timo-gray-500" : style.subText,
                )}
              >
                {sub.text}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between gap-2 md:justify-end">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex shrink-0 items-center gap-0.5">
            {isDimmed ? (
              <CalendarDisableIcon className={TOOLBAR_ICON_CLASS_NAME} />
            ) : (
              <CalendarOnIcon className={TOOLBAR_ICON_CLASS_NAME} />
            )}
            <span
              className={cn(
                "typo-caption-r-10 whitespace-nowrap",
                style.toolbarText,
              )}
            >
              {toolbar.date}
            </span>
          </span>
          <span className="hidden items-center gap-0.5 md:flex">
            {isDimmed ? <ClockDisableIcon /> : <ClockOnIcon />}
            <span
              className={cn(
                "typo-caption-r-10 whitespace-nowrap",
                style.toolbarText,
              )}
            >
              {toolbar.time}
            </span>
          </span>
          <span
            className={cn(
              "flex items-center justify-center md:size-5.5",
              !toolbar.priority && "hidden md:flex",
            )}
          >
            <PriorityIcon
              priority={
                isDimmed || !toolbar.priority ? "Disable" : toolbar.priority
              }
              label={priorityLabel}
            />
          </span>
          <span className={cn(!toolbar.tag && "hidden md:block")}>
            <TagIcon text={toolbar.tag ?? t("tagLabel")} />
          </span>
          <span className={cn(!toolbar.hasMemo && "hidden md:block")}>
            {isDimmed || !toolbar.hasMemo ? (
              <MemoDisableIcon className={TOOLBAR_ICON_CLASS_NAME} />
            ) : (
              <MemoOnIcon className={TOOLBAR_ICON_CLASS_NAME} />
            )}
          </span>
          <span className={cn(!toolbar.hasRepeat && "hidden md:block")}>
            {isDimmed || !toolbar.hasRepeat ? (
              <RepeatDisableIcon className={TOOLBAR_ICON_CLASS_NAME} />
            ) : (
              <RepeatOnIcon className={TOOLBAR_ICON_CLASS_NAME} />
            )}
          </span>
        </div>
        <span
          className={cn(
            "typo-body-sb-12 shrink-0 whitespace-nowrap md:hidden",
            style.toolbarText,
          )}
        >
          {toolbar.time}
        </span>
      </div>
    </div>
  );
};
