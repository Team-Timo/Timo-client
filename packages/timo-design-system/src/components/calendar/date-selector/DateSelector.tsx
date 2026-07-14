import { Dropdown } from "../../layout/dropdown/Dropdown";
import { Calendar } from "../Calendar";

import type { ReactNode } from "react";

export interface DateSelectorProps {
  trigger: ReactNode | ((isOpen: boolean) => ReactNode);
  value?: Date;
  onChange?: (date: Date) => void;
}

export const DateSelector = ({
  trigger,
  value,
  onChange,
}: DateSelectorProps) => {
  return (
    <Dropdown className="flex justify-center">
      <Dropdown.Trigger aria-haspopup="dialog">{trigger}</Dropdown.Trigger>

      <Dropdown.Panel className="p-0">
        <Calendar value={value} onChange={onChange} />
      </Dropdown.Panel>
    </Dropdown>
  );
};
