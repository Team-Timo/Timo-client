import { ChevronUpIcon } from "@repo/timo-design-system/icons";
import { IconGraphic, IconSelector } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";
import { useEffect, useState } from "react";

import type { TodoIconValue } from "@repo/timo-design-system/ui";

const PANEL_EXIT_ANIMATION_DURATION = 160;

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
  const [shouldRenderPanel, setShouldRenderPanel] = useState(isIconPanelOpen);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  useEffect(() => {
    if (isIconPanelOpen) {
      setShouldRenderPanel(true);
      const showFrame = requestAnimationFrame(() => setIsPanelVisible(true));
      return () => cancelAnimationFrame(showFrame);
    }

    setIsPanelVisible(false);
    const hideTimer = setTimeout(
      () => setShouldRenderPanel(false),
      PANEL_EXIT_ANIMATION_DURATION,
    );
    return () => clearTimeout(hideTimer);
  }, [isIconPanelOpen]);

  return (
    <div className="flex w-full flex-col items-start gap-2">
      {!isIconPanelOpen && !shouldRenderPanel && icon ? (
        <button
          type="button"
          onClick={onOpenPanel}
          aria-label={addIconLabel}
          className="flex size-6 shrink-0 items-center justify-center rounded-[4px] transition-opacity duration-150 ease-out"
        >
          <IconGraphic icon={icon} />
        </button>
      ) : (
        <button
          type="button"
          onClick={onTogglePanel}
          aria-expanded={isIconPanelOpen}
          className="bg-timo-gray-200 flex items-center gap-1 rounded-[4px] px-1.5 py-0.5 transition-opacity duration-150 ease-out"
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

      {shouldRenderPanel && (
        <div
          className={cn(
            "origin-top",
            isPanelVisible
              ? "translate-y-0 scale-100 opacity-100 transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              : "-translate-y-1.5 scale-95 opacity-0 transition-all duration-[160ms] ease-in",
          )}
        >
          <IconSelector
            selected={icon}
            onSelect={onSelectIcon}
            onRemove={onRemoveIcon}
          />
        </div>
      )}
    </div>
  );
};
