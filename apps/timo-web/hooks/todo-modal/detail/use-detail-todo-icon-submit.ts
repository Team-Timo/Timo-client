import { useState } from "react";

import type { TodoUpdateRequest } from "@/api/generated/models";
import type { UpdateTodoSubmitHandlers } from "@/hooks/todo-modal/detail/use-update-todo-submit";
import type { TodoIconValue } from "@repo/timo-design-system/ui";

export interface UseDetailTodoIconSubmitParams {
  icon: TodoIconValue | null;
  selectIcon: (icon: TodoIconValue) => void;
  onUpdate: (
    data: TodoUpdateRequest,
    handlers?: UpdateTodoSubmitHandlers,
  ) => void;
}

export const useDetailTodoIconSubmit = ({
  icon,
  selectIcon,
  onUpdate,
}: UseDetailTodoIconSubmitParams) => {
  const [isIconPanelOpen, setIsIconPanelOpen] = useState(false);
  const [pendingIcon, setPendingIcon] = useState<TodoIconValue | null>(icon);

  const handleSelectIcon = (nextIcon: TodoIconValue) => {
    setPendingIcon(nextIcon);
  };

  const handleOpenIconPanel = () => {
    setPendingIcon(icon);
    setIsIconPanelOpen(true);
  };

  const handleSubmitIcon = () => {
    if (!pendingIcon || pendingIcon === icon) {
      setIsIconPanelOpen(false);
      return;
    }

    onUpdate(
      { icon: pendingIcon },
      {
        onSuccess: () => {
          selectIcon(pendingIcon);
          setIsIconPanelOpen(false);
        },
      },
    );
  };

  const handleToggleIconPanel = () => {
    if (isIconPanelOpen) {
      handleSubmitIcon();
      return;
    }

    handleOpenIconPanel();
  };

  const handleRemoveIcon = () => {
    setPendingIcon(null);
  };

  return {
    icon: isIconPanelOpen ? pendingIcon : icon,
    isIconPanelOpen,
    handleOpenIconPanel,
    handleToggleIconPanel,
    handleSelectIcon,
    handleRemoveIcon,
  };
};
