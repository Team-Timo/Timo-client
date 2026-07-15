import { useState } from "react";

import type { TodoUpdateRequest } from "@/api/generated/models";
import type { UpdateTodoSubmitHandlers } from "@/hooks/todo-modal/detail/use-update-todo-submit";
import type { TodoIconValue } from "@repo/timo-design-system/ui";

export interface UseDetailTodoIconSubmitParams {
  icon: TodoIconValue | null;
  selectIcon: (icon: TodoIconValue) => void;
  removeIcon: () => void;
  onUpdate: (
    data: TodoUpdateRequest,
    handlers?: UpdateTodoSubmitHandlers,
  ) => void;
}

export const useDetailTodoIconSubmit = ({
  icon,
  selectIcon,
  removeIcon,
  onUpdate,
}: UseDetailTodoIconSubmitParams) => {
  const [isIconPanelOpen, setIsIconPanelOpen] = useState(false);

  const handleOpenIconPanel = () => setIsIconPanelOpen(true);
  const handleToggleIconPanel = () => setIsIconPanelOpen((prev) => !prev);

  const handleSelectIcon = (nextIcon: TodoIconValue) => {
    if (nextIcon === icon) {
      setIsIconPanelOpen(false);
      return;
    }

    onUpdate(
      { icon: nextIcon },
      {
        onSuccess: () => {
          selectIcon(nextIcon);
          setIsIconPanelOpen(false);
        },
      },
    );
  };

  const handleRemoveIcon = () => {
    onUpdate(
      { icon: "NONE" },
      {
        onSuccess: () => {
          removeIcon();
          setIsIconPanelOpen(false);
        },
      },
    );
  };

  return {
    icon,
    isIconPanelOpen,
    handleOpenIconPanel,
    handleToggleIconPanel,
    handleSelectIcon,
    handleRemoveIcon,
  };
};
