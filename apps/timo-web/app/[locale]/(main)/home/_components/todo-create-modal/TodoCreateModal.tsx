"use client";

import {
  CalendarDisableIcon,
  ChevronUpIcon,
  ClockDisableIcon,
  DeleteIcon,
  MemoDisableIcon,
  RepeatDisableIcon,
} from "@repo/timo-design-system/icons";
import {
  Checkbox,
  CreateButton,
  PriorityIcon,
  TagIcon,
} from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";
import { useId } from "react";

export type TodoSubtaskVariant = "filled" | "placeholder";

export interface TodoSubtaskItem {
  id: string;
  label: string;
  checked: boolean;
  variant?: TodoSubtaskVariant;
}

const SUBTASK_LABEL_STYLE: Record<TodoSubtaskVariant, string> = {
  filled: "typo-headline-b-14 text-timo-black",
  placeholder: "typo-body-r-12 text-timo-gray-700",
};

const DEFAULT_SUBTASKS: TodoSubtaskItem[] = [
  { id: "1", label: "Plan a new task", checked: false, variant: "filled" },
  {
    id: "2",
    label: "Add tasks in small units",
    checked: false,
    variant: "placeholder",
  },
];

export interface TodoCreateModalProps {
  subtasks?: TodoSubtaskItem[];
  onSubtaskToggle?: (id: string, checked: boolean) => void;
  note?: string;
  onNoteChange?: (note: string) => void;
  isIconPickerOpen?: boolean;
  onToggleIconPicker?: () => void;
  isCreateDisabled?: boolean;
  onCreate?: () => void;
  onClose?: () => void;
  onDateClick?: () => void;
  onTimeClick?: () => void;
  onPriorityClick?: () => void;
  onTagClick?: () => void;
  onMemoClick?: () => void;
  onRepeatClick?: () => void;
}

export const TodoCreateModal = ({
  subtasks = DEFAULT_SUBTASKS,
  onSubtaskToggle,
  note = "",
  onNoteChange,
  isIconPickerOpen = false,
  onToggleIconPicker,
  isCreateDisabled = true,
  onCreate,
  onClose,
  onDateClick,
  onTimeClick,
  onPriorityClick,
  onTagClick,
  onMemoClick,
  onRepeatClick,
}: TodoCreateModalProps) => {
  const noteId = useId();

  return (
    <div className="flex w-[490px] flex-col items-center justify-center gap-2.5 rounded-[4px] bg-white px-6 py-4">
      <div className="flex w-full items-center justify-between">
        <p className="typo-body-sb-12 text-timo-blue-300 whitespace-nowrap">
          Add a task
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="flex shrink-0 items-center justify-center"
        >
          <DeleteIcon />
        </button>
      </div>

      <div className="flex w-full flex-col items-start gap-3.5">
        <div className="flex w-full flex-col items-start gap-2">
          <button
            type="button"
            onClick={onToggleIconPicker}
            aria-expanded={isIconPickerOpen}
            className="bg-timo-gray-200 flex items-center gap-1 rounded-[4px] px-1.5 py-0.5"
          >
            <ChevronUpIcon width={18} height={18} />
            <span className="typo-caption-r-10 text-timo-gray-700 whitespace-nowrap">
              Add an icon
            </span>
          </button>

          <div className="flex w-full flex-col items-start gap-1.5">
            {subtasks.map((subtask) => (
              <div key={subtask.id} className="flex items-center gap-2">
                <Checkbox
                  checked={subtask.checked}
                  onChange={(checked) => onSubtaskToggle?.(subtask.id, checked)}
                />
                <p
                  className={cn(
                    "truncate",
                    SUBTASK_LABEL_STYLE[subtask.variant ?? "filled"],
                  )}
                >
                  {subtask.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex h-[35px] w-full items-start">
          <label htmlFor={noteId} className="sr-only">
            노트
          </label>
          <textarea
            id={noteId}
            value={note}
            onChange={(e) => onNoteChange?.(e.target.value)}
            placeholder="Please enter a note.."
            rows={1}
            className="typo-body-r-12 text-timo-gray-700 placeholder:text-timo-gray-700 w-full resize-none bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDateClick}
            className="flex items-center gap-0.5"
          >
            <CalendarDisableIcon />
            <span className="typo-caption-r-10 text-timo-gray-700 whitespace-nowrap">
              Date
            </span>
          </button>

          <button
            type="button"
            onClick={onTimeClick}
            className="flex items-center"
          >
            <ClockDisableIcon />
            <span className="typo-caption-r-10 text-timo-gray-700 flex w-9 items-center justify-center whitespace-nowrap">
              00 : 00
            </span>
          </button>

          <button
            type="button"
            onClick={onPriorityClick}
            aria-label="우선순위 설정"
            className="flex items-center justify-center p-1.5"
          >
            <PriorityIcon priority="Disable" />
          </button>

          <button type="button" onClick={onTagClick}>
            <TagIcon text="Tag" />
          </button>

          <button type="button" onClick={onMemoClick} aria-label="메모 추가">
            <MemoDisableIcon />
          </button>

          <button type="button" onClick={onRepeatClick} aria-label="반복 설정">
            <RepeatDisableIcon />
          </button>
        </div>

        <CreateButton
          label="Create"
          disabled={isCreateDisabled}
          onClick={onCreate}
        />
      </div>
    </div>
  );
};
