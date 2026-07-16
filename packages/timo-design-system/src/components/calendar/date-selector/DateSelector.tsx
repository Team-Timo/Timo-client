import { useRef, useState } from "react";

import { Dropdown } from "../../layout/dropdown/Dropdown";
import { Calendar } from "../Calendar";

import type { ReactNode } from "react";

export interface DateSelectorProps {
  trigger: ReactNode | ((isOpen: boolean) => ReactNode);
  value?: Date;
  onChange?: (date: Date) => void;
}

const isSameCalendarDate = (a?: Date, b?: Date) => {
  if (!a || !b) return a === b;

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const DateSelector = ({
  trigger,
  value,
  onChange,
}: DateSelectorProps) => {
  const [draftDate, setDraftDate] = useState(value);
  const draftDateRef = useRef(value);

  const selectDraft = (date: Date) => {
    draftDateRef.current = date;
    setDraftDate(date);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      draftDateRef.current = value;
      setDraftDate(value);
      return;
    }

    if (
      draftDateRef.current &&
      !isSameCalendarDate(draftDateRef.current, value)
    ) {
      onChange?.(draftDateRef.current);
    }
  };

  return (
    <Dropdown className="flex justify-center" onOpenChange={handleOpenChange}>
      <Dropdown.Trigger aria-haspopup="dialog">{trigger}</Dropdown.Trigger>

      <Dropdown.Panel className="p-0">
        <Calendar value={draftDate} onChange={selectDraft} />
      </Dropdown.Panel>
    </Dropdown>
  );
};
