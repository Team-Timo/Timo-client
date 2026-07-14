"use client";

import timoTimerLogo from "@repo/timo-design-system/assets/images/logo/timo-timer.svg";
import { Modal, TogglePanel } from "@repo/timo-design-system/ui";
import Image from "next/image";
import { useRef, useState } from "react";

import type {
  SettingsLanguage,
  SettingsProfileLabels,
} from "@/app/[locale]/(main)/settings/_types/account/profile-type";

export interface SettingsLanguageSectionContainerProps {
  language: SettingsLanguage;
  labels: SettingsProfileLabels;
  onChangeLanguage: (language: SettingsLanguage) => void;
}

export const SettingsLanguageSectionContainer = ({
  language,
  labels,
  onChangeLanguage,
}: SettingsLanguageSectionContainerProps) => {
  const [pendingLanguage, setPendingLanguage] =
    useState<SettingsLanguage | null>(null);
  const modalTriggerRef = useRef<HTMLButtonElement>(null);

  const handleSelectLanguage = (next: SettingsLanguage) => {
    if (next === language) return;
    setPendingLanguage(next);
    modalTriggerRef.current?.click();
  };

  const handleConfirmLanguage = () => {
    if (pendingLanguage) onChangeLanguage(pendingLanguage);
  };

  return (
    <section className="flex w-67 flex-col gap-3">
      <h2 className="typo-headline-b-16 text-timo-gray-900">
        {labels.languageSection}
      </h2>
      <Modal>
        <TogglePanel
          id="settings-language"
          value={language}
          onChange={(value) => handleSelectLanguage(value as SettingsLanguage)}
          options={[
            { value: "ko", label: labels.languageKorean },
            { value: "en", label: labels.languageEnglish },
          ]}
        />
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
          <Modal.Title>{labels.languageConfirmTitle}</Modal.Title>
          <Modal.Description>
            {labels.languageConfirmDescription}
          </Modal.Description>
          <Modal.Footer>
            <Modal.BorderButton>
              {labels.languageConfirmCancel}
            </Modal.BorderButton>
            <Modal.FillButton onClick={handleConfirmLanguage}>
              {labels.languageConfirmConfirm}
            </Modal.FillButton>
          </Modal.Footer>
        </Modal.Panel>
      </Modal>
    </section>
  );
};
