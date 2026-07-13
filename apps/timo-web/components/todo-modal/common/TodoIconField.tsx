import { ChevronUpIcon } from "@repo/timo-design-system/icons";
import { IconGraphic, IconSelector } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

import type { TodoIconValue } from "@repo/timo-design-system/ui";

export interface TodoIconFieldProps {
  icon: TodoIconValue | null;
  isIconPanelOpen: boolean;
  addIconLabel: string;
  onOpenPanel: () => void;
  onTogglePanel: () => void;
  onSelectIcon: (icon: TodoIconValue) => void;
  onRemoveIcon: () => void;
}

export const TodoIconField = ({
  icon,
  isIconPanelOpen,
  addIconLabel,
  onOpenPanel,
  onTogglePanel,
  onSelectIcon,
  onRemoveIcon,
}: TodoIconFieldProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      {!isIconPanelOpen && icon ? (
        <button
          type="button"
          onClick={onOpenPanel}
          aria-label={addIconLabel}
          className="flex size-6 shrink-0 items-center justify-center rounded-[4px]"
        >
          <IconGraphic icon={icon} />
        </button>
      ) : (
        <button
          type="button"
          onClick={onTogglePanel}
          aria-expanded={isIconPanelOpen}
          className="bg-timo-gray-200 flex items-center gap-1 rounded-[4px] px-1.5 py-0.5"
        >
          <ChevronUpIcon
            width={18}
            height={18}
            className={cn(
              "shrink-0 transition-transform duration-200 ease-in-out",
              !isIconPanelOpen && "rotate-180",
            )}
          />
          <span className="typo-caption-r-10 text-timo-gray-700 whitespace-nowrap">
            {addIconLabel}
          </span>
        </button>
      )}

      {isIconPanelOpen && (
        <IconSelector
          selected={icon}
          onSelect={onSelectIcon}
          onRemove={onRemoveIcon}
        />
      )}
    </div>
  );
};
