import { Checkbox } from "@repo/timo-design-system/ui";

import type { SubtaskInputEntry } from "@/utils/todo/subtask-input-list";
import type { KeyboardEvent } from "react";

const resizeTextarea = (element: HTMLTextAreaElement | null) => {
  if (!element) return;
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
};

export interface CreateTodoTaskFieldsProps {
  titleValue: string;
  titlePlaceholder: string;
  onTitleChange: (value: string) => void;
  subtaskInputs: SubtaskInputEntry[];
  subtaskPlaceholder: string;
  registerSubtaskInputRef: (
    index: number,
  ) => (element: HTMLTextAreaElement | null) => void;
  onSubtaskInputChange: (index: number, value: string) => void;
  onSubtaskInputKeyDown: (
    index: number,
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => void;
}

export const CreateTodoTaskFields = ({
  titleValue,
  titlePlaceholder,
  onTitleChange,
  subtaskInputs,
  subtaskPlaceholder,
  registerSubtaskInputRef,
  onSubtaskInputChange,
  onSubtaskInputKeyDown,
}: CreateTodoTaskFieldsProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-1.5">
      <div className="flex w-full items-center justify-center">
        <Checkbox checked={false} onChange={() => {}} />
        <textarea
          value={titleValue}
          ref={resizeTextarea}
          onChange={(event) => {
            onTitleChange(event.target.value);
            resizeTextarea(event.currentTarget);
          }}
          placeholder={titlePlaceholder}
          rows={1}
          className="typo-headline-b-14 text-timo-black min-w-0 flex-1 resize-none overflow-hidden wrap-break-word outline-none"
        />
      </div>

      {subtaskInputs.map((entry, index) => (
        <div key={entry.id} className="flex w-full items-center justify-center">
          <Checkbox checked={false} onChange={() => {}} />
          <textarea
            value={entry.value}
            ref={registerSubtaskInputRef(index)}
            onChange={(event) => {
              onSubtaskInputChange(index, event.target.value);
              resizeTextarea(event.currentTarget);
            }}
            onKeyDown={(event) => onSubtaskInputKeyDown(index, event)}
            placeholder={subtaskPlaceholder}
            rows={1}
            className="typo-body-r-12 text-timo-gray-800 min-w-0 flex-1 resize-none overflow-hidden wrap-break-word outline-none"
          />
        </div>
      ))}
    </div>
  );
};
