"use client";

import timoTimerLogo from "@repo/timo-design-system/assets/images/logo/timo-timer.svg";
import { PlusIcon } from "@repo/timo-design-system/icons";
import { Modal, PillButton, TagChip } from "@repo/timo-design-system/ui";
import Image from "next/image";
import { useRef, useState } from "react";

import type {
  SettingsProfileLabels,
  SettingsTagItem,
} from "@/app/[locale]/(main)/settings/_types/account/profile-type";

const MAX_SETTING_CUSTOM_TAG_COUNT = 4;

export interface SettingsTagsSectionContainerProps {
  tags: SettingsTagItem[];
  labels: SettingsProfileLabels;
  onAddTag: () => void;
  onRemoveTag: (tagId: number) => void;
}

export const SettingsTagsSectionContainer = ({
  tags,
  labels,
  onAddTag,
  onRemoveTag,
}: SettingsTagsSectionContainerProps) => {
  const [pendingTagId, setPendingTagId] = useState<number | null>(null);
  const modalTriggerRef = useRef<HTMLButtonElement>(null);
  const canAddTag =
    tags.filter((tag) => !tag.isDefault).length < MAX_SETTING_CUSTOM_TAG_COUNT;

  const handleRequestRemoveTag = (tagId: number) => {
    setPendingTagId(tagId);
    modalTriggerRef.current?.click();
  };

  const handleConfirmRemoveTag = () => {
    if (pendingTagId !== null) onRemoveTag(pendingTagId);
  };

  return (
    <section className="flex w-full flex-col gap-3">
      <h2 className="typo-headline-b-16 text-timo-gray-900">
        {labels.tagsSection}
      </h2>
      <Modal>
        <div className="flex flex-wrap items-center gap-3">
          {tags.map((tag) => (
            <TagChip
              key={tag.id}
              onRemove={
                tag.isDefault ? undefined : () => handleRequestRemoveTag(tag.id)
              }
              removeLabel={labels.removeTag(tag.label)}
            >
              {tag.label}
            </TagChip>
          ))}

          {canAddTag && (
            <PillButton
              icon={<PlusIcon width={20} height={20} />}
              onClick={onAddTag}
            >
              {labels.addTag}
            </PillButton>
          )}
        </div>
        <Modal.Trigger
          ref={modalTriggerRef}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />
        <Modal.Overlay />
        <Modal.Panel>
          <Modal.Icon>
            <Image src={timoTimerLogo} alt="" width={40} height={40} />
          </Modal.Icon>
          <Modal.Title>{labels.tagDeleteConfirmTitle}</Modal.Title>
          <Modal.Description>
            {labels.tagDeleteConfirmDescription}
          </Modal.Description>
          <Modal.Footer>
            <Modal.BorderButton>
              {labels.tagDeleteConfirmCancel}
            </Modal.BorderButton>
            <Modal.FillButton onClick={handleConfirmRemoveTag}>
              {labels.tagDeleteConfirmConfirm}
            </Modal.FillButton>
          </Modal.Footer>
        </Modal.Panel>
      </Modal>
    </section>
  );
};
