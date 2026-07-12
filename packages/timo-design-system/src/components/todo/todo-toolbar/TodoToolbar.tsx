import {
  CalendarDisableIcon,
  CalendarOnIcon,
  ClockDisableIcon,
  ClockOnIcon,
  MemoDisableIcon,
  MemoOnIcon,
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
  onDateChange?: (date: Date) => void;

  timeLabel: string;
  timeOptions: TimeOption[];
  time?: string;
  onTimeChange?: (time: string) => void;
  selectedTime?: TimeSelection;
  onSelectTime?: (value: TimeSelection) => void;

  priority?: PriorityLevel;
  onSelectPriority?: (priority: PriorityLevel) => void;

  tagLabel: string;
  tags: string[];
  selectedTag?: string;
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
  onDateChange,
  timeLabel,
  timeOptions,
  time,
  onTimeChange,
  selectedTime,
  onSelectTime,
  priority,
  onSelectPriority,
  tagLabel,
  tags,
  selectedTag,
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
        trigger={
          <span className="flex items-center gap-0.5">
            {date ? <CalendarOnIcon /> : <CalendarDisableIcon />}
            <span
              className={cn(
                "typo-caption-r-10 whitespace-nowrap",
                date ? "text-timo-gray-900" : "text-timo-gray-700",
              )}
            >
              {dateLabel}
            </span>
          </span>
        }
      />

      <TimeSelector
        trigger={
          <span className="flex items-center">
            {time ? <ClockOnIcon /> : <ClockDisableIcon />}
            <span
              className={cn(
                "typo-caption-r-10 w-9 whitespace-nowrap",
                time ? "text-timo-gray-900" : "text-timo-gray-700",
              )}
            >
              {timeLabel}
            </span>
          </span>
        }
        time={time}
        onTimeChange={onTimeChange}
        times={timeOptions}
        selected={selectedTime}
        onSelect={onSelectTime}
      />

      <PrioritySelector
        trigger={<PriorityIcon priority={priority ?? "Disable"} />}
        selected={priority}
        onSelect={onSelectPriority}
      />

      <TagSelector
        trigger={<TagIcon text={tagLabel} />}
        tags={tags}
        selected={selectedTag}
        onSelect={onSelectTag}
        onAddClick={onAddTagClick}
      />

      {hasMemo ? <MemoOnIcon /> : <MemoDisableIcon />}

      <RepeatSelector
        {...repeat}
        trigger={isRepeatActive ? <RepeatOnIcon /> : <RepeatDisableIcon />}
      />
    </div>
  );
};
