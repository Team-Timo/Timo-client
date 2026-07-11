"use client";

import { DeleteIcon } from "@repo/timo-design-system/icons";
import { CreateButton, TagNameInput } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Modal } from "@/components/modal/Modal";

const MAX_TAG_NAME_LENGTH = 10;

export interface CreateTagModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
  existingLabels: string[];
  onCreate: (label: string) => void;
}

export const CreateTagModalContainer = ({
  isOpen,
  onClose,
  onExited,
  existingLabels,
  onCreate,
}: CreateTagModalContainerProps) => {
  const t = useTranslations("Home");
  const [name, setName] = useState<string>("");

  const trimmedName = name.trim();
  const isDuplicate = existingLabels.includes(trimmedName);
  const isValid =
    trimmedName.length > 0 &&
    trimmedName.length <= MAX_TAG_NAME_LENGTH &&
    !isDuplicate;

  const handleCreate = () => {
    if (!isValid) return;

    onCreate(trimmedName);
    setName("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onExited={onExited}
      className="w-[490px] items-center gap-3 px-6 py-4"
    >
      <div className="flex w-full items-center justify-between">
        <p className="typo-body-sb-12 text-timo-blue-300">
          {t("createTagModal.title")}
        </p>
        <button
          type="button"
          aria-label={t("createModal.close")}
          onClick={onClose}
          className="shrink-0"
        >
          <DeleteIcon />
        </button>
      </div>

      <div className="flex w-full flex-col items-start gap-3">
        <p className="typo-headline-m-16 text-timo-black w-full">
          {t("createTagModal.nameLabel")}
        </p>

        <TagNameInput
          value={name}
          onChange={setName}
          maxLength={MAX_TAG_NAME_LENGTH}
          isError={isDuplicate}
          ariaLabel={t("createTagModal.nameLabel")}
          maxLengthHint={t("createTagModal.maxLengthHint")}
          duplicateHint={t("createTagModal.duplicateHint")}
        />
      </div>

      <div className="flex w-full items-center justify-end">
        <CreateButton
          label={t("createTagModal.create")}
          disabled={!isValid}
          onClick={handleCreate}
        />
      </div>
    </Modal>
  );
};
