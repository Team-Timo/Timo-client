import {
  CalendarBlueIcon,
  CalendarDisableIcon,
  CalendarOnIcon,
  ClockBlueIcon,
  ClockDisableIcon,
  ClockOnIcon,
  MemoDisableIcon,
  MemoOnIcon,
  RepeatBlueIcon,
  RepeatDisableIcon,
  RepeatOnIcon,
} from "../../../icons";
import { cn } from "../../../lib";
import { DateSelector } from "../../calendar/date-selector/DateSelector";
import { PriorityIcon } from "../../priority/priority-icon/PriorityIcon";
import {
  PrioritySelector,
  type PriorityLevel,
} from "../../priority/priority-selector/PrioritySelector";
import {
  RepeatSelector,
  type RepeatSelectorProps,
} from "../../repeat/repeat-selector/RepeatSelector";
import { TagIcon } from "../../tag/tag-icon/TagIcon";
import { TagSelector } from "../../tag/tag-selector/TagSelector";
import {
  TimeSelector,
  type TimeOption,
  type TimeSelection,
} from "../../time/time-selector/TimeSelector";

export interface TodoToolbarProps {
  dateLabel: string;
  date?: Date;
  isDateActive?: boolean;
  onDateChange?: (date: Date) => void;

  timeLabel: string;
  timeOptions: TimeOption[];
  time?: string;
  isTimeActive?: boolean;
  onTimeChange?: (time: string) => void;
  selectedTime?: TimeSelection;
  onSelectTime?: (value: TimeSelection) => void;
  onTimeOpen?: () => void;

  priority?: PriorityLevel;
  priorityLabels?: Record<PriorityLevel, string>;
  onSelectPriority?: (priority: PriorityLevel) => void;

  tagLabel: string;
  tags: string[];
  selectedTag?: string;
  addTagLabel?: string;
  onSelectTag?: (tag: string) => void;
  onAddTagClick?: () => void;

  hasMemo?: boolean;

  isRepeatActive?: boolean;
  repeat: Omit<RepeatSelectorProps, "trigger">;

  className?: string;
}

export const TodoToolbar = ({
  dateLabel,
  date,
  isDateActive = Boolean(date),
  onDateChange,
  timeLabel,
  timeOptions,
  time,
  isTimeActive = Boolean(time),
  onTimeChange,
  selectedTime,
  onSelectTime,
  onTimeOpen,
  priority,
  priorityLabels,
  onSelectPriority,
  tagLabel,
  tags,
  selectedTag,
  addTagLabel,
  onSelectTag,
  onAddTagClick,
  hasMemo = false,
  isRepeatActive = false,
  repeat,
  className,
}: TodoToolbarProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <DateSelector
        value={date}
        onChange={onDateChange}
        trigger={(isOpen) => (
          <span className="flex items-center gap-0.5">
            {isOpen ? (
              <CalendarBlueIcon />
            ) : isDateActive ? (
              <CalendarOnIcon />
            ) : (
              <CalendarDisableIcon />
            )}
            <span
              className={cn(
                "typo-caption-r-10 whitespace-nowrap",
                isOpen
                  ? "text-timo-blue-300"
                  : isDateActive
                    ? "text-timo-gray-900"
                    : "text-timo-gray-700",
              )}
            >
              {dateLabel}
            </span>
          </span>
        )}
      />

      <TimeSelector
        trigger={(isOpen) => (
          <span className="flex items-center">
            {isOpen ? (
              <ClockBlueIcon />
            ) : isTimeActive ? (
              <ClockOnIcon />
            ) : (
              <ClockDisableIcon />
            )}
            <span
              className={cn(
                "typo-caption-r-10 w-9 whitespace-nowrap",
                isOpen
                  ? "text-timo-blue-300"
                  : isTimeActive
                    ? "text-timo-gray-900"
                    : "text-timo-gray-700",
              )}
            >
              {timeLabel}
            </span>
          </span>
        )}
        time={time}
        onTimeChange={onTimeChange}
        times={timeOptions}
        selected={selectedTime}
        onSelect={onSelectTime}
        onOpen={onTimeOpen}
      />

      <PrioritySelector
        trigger={<PriorityIcon priority={priority ?? "Disable"} />}
        selected={priority}
        labels={priorityLabels}
        onSelect={onSelectPriority}
      />

      <TagSelector
        trigger={(isOpen) => (
          <TagIcon text={tagLabel} variant={isOpen ? "blue" : "disable"} />
        )}
        tags={tags}
        selected={selectedTag}
        addLabel={addTagLabel}
        onSelect={onSelectTag}
        onAddClick={onAddTagClick}
      />

      {hasMemo ? <MemoOnIcon /> : <MemoDisableIcon />}

      <RepeatSelector
        {...repeat}
        trigger={(isOpen) =>
          isOpen ? (
            <RepeatBlueIcon />
          ) : isRepeatActive ? (
            <RepeatOnIcon />
          ) : (
            <RepeatDisableIcon />
          )
        }
      />
    </div>
  );
};
