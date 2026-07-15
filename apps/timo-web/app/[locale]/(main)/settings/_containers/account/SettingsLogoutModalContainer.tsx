"use client";

import timoTimerLogo from "@repo/timo-design-system/assets/images/logo/timo-timer.svg";
import { Modal, PillButton } from "@repo/timo-design-system/ui";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import type { SettingsProfileLabels } from "@/app/[locale]/(main)/settings/_types/account/profile-type";

export interface SettingsLogoutModalContainerProps {
  labels: SettingsProfileLabels;
  onLogout: () => void;
}

export const SettingsLogoutModalContainer = ({
  labels,
  onLogout,
}: SettingsLogoutModalContainerProps) => {
  const tSettings = useTranslations("Settings");
  const modalTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Modal>
      <PillButton
        onClick={() => modalTriggerRef.current?.click()}
        className="w-fit"
      >
        {labels.logout}
      </PillButton>
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
        <Modal.Title>
          {tSettings.rich("profile.logoutConfirmTitle", {
            red: (chunks) => <span className="text-timo-red">{chunks}</span>,
          })}
        </Modal.Title>
        <Modal.Description className="whitespace-pre-line">
          {labels.logoutConfirmDescription}
        </Modal.Description>
        <Modal.Footer>
          <Modal.BorderButton>{labels.logoutConfirmCancel}</Modal.BorderButton>
          <Modal.FillButton onClick={onLogout}>
            {labels.logoutConfirmConfirm}
          </Modal.FillButton>
        </Modal.Footer>
      </Modal.Panel>
    </Modal>
  );
};
