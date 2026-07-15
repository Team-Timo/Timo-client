import { useRef, useState } from "react";

import { PlusIcon } from "../../../icons";
import { cn } from "../../../lib";
import { Dropdown } from "../../layout/dropdown/Dropdown";

import type { ReactNode } from "react";

export interface TagSelectorProps {
  trigger: ReactNode | ((isOpen: boolean) => ReactNode);
  tags: string[];
  selected?: string;
  addLabel?: string;
  onSelect?: (tag: string) => void;
  onAddClick?: () => void;
}

export const TagSelector = ({
  trigger,
  tags,
  selected,
  addLabel = "추가",
  onSelect,
  onAddClick,
}: TagSelectorProps) => {
  const [draftTag, setDraftTag] = useState(selected);
  const draftTagRef = useRef(selected);

  const selectDraft = (tag: string) => {
    draftTagRef.current = tag;
    setDraftTag(tag);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      draftTagRef.current = selected;
      setDraftTag(selected);
      return;
    }

    if (draftTagRef.current && draftTagRef.current !== selected) {
      onSelect?.(draftTagRef.current);
    }
  };

  return (
    <Dropdown className="flex justify-center" onOpenChange={handleOpenChange}>
      <Dropdown.Trigger aria-haspopup="menu" className="p-1">
        {trigger}
      </Dropdown.Trigger>

      <Dropdown.Panel className="shadow-timo">
        {tags.map((tag) => {
          const isSelected = tag === draftTag;

          return (
            <Dropdown.Item
              key={tag}
              onClick={() => selectDraft(tag)}
              closeOnSelect={false}
              aria-pressed={isSelected}
              className={cn("px-1.5 py-1", isSelected && "bg-timo-gray-500")}
            >
              <span
                className={cn(
                  "typo-headline-r-14 whitespace-nowrap",
                  isSelected ? "text-timo-gray-900" : "text-timo-black",
                )}
              >
                {tag}
              </span>
            </Dropdown.Item>
          );
        })}

        <Dropdown.Item onClick={onAddClick} className="gap-1 px-1.5 py-1">
          <span className="typo-headline-r-14 text-timo-black whitespace-nowrap">
            {addLabel}
          </span>
          <PlusIcon className="shrink-0" />
        </Dropdown.Item>
      </Dropdown.Panel>
    </Dropdown>
  );
};
