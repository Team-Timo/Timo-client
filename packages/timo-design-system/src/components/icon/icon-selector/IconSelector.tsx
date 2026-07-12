import { cn } from "../../../lib";
import {
  IconGraphic,
  TODO_ICON_LABEL,
  TODO_ICON_OPTIONS,
} from "../icon-graphic/IconGraphic";

import type { TodoIconValue } from "../icon-graphic/IconGraphic";

export type { TodoIconValue };

export interface IconSelectorProps {
  selected?: TodoIconValue | null;
  onSelect: (icon: TodoIconValue) => void;
  onRemove: () => void;
}

export const IconSelector = ({
  selected,
  onSelect,
  onRemove,
}: IconSelectorProps) => {
  return (
    <div className="flex w-full items-center gap-1">
      {TODO_ICON_OPTIONS.map((icon) => {
        const isSelected = icon === selected;

        return (
          <button
            key={icon}
            type="button"
            aria-pressed={isSelected}
            aria-label={TODO_ICON_LABEL[icon]}
            onClick={() => onSelect(icon)}
            className={cn(
              "rounded-4 flex size-6 shrink-0 items-center justify-center transition-colors duration-200 ease-in-out",
              isSelected && "bg-timo-blue-65",
            )}
          >
            <IconGraphic icon={icon} />
          </button>
        );
      })}

      <button
        type="button"
        onClick={onRemove}
        className="bg-timo-gray-300 rounded-4 flex shrink-0 items-center justify-center p-1"
      >
        <span className="typo-caption-r-10 text-timo-gray-800 whitespace-nowrap">
          아이콘 제거
        </span>
      </button>
    </div>
  );
};
