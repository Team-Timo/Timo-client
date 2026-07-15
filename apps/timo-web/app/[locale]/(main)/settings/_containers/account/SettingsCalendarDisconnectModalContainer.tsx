"use client";

import timoTimerLogo from "@repo/timo-design-system/assets/images/logo/timo-timer.svg";
import { ModalButton } from "@repo/timo-design-system/ui";
import Image from "next/image";

import type { SettingsProfileLabels } from "@/app/[locale]/(main)/settings/_types/account/profile-type";

import { OverlayModal } from "@/components/modal/OverlayModal";

export interface SettingsCalendarDisconnectModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
  labels: SettingsProfileLabels;
  onDisconnect: () => void;
}

export const SettingsCalendarDisconnectModalContainer = ({
  isOpen,
  onClose,
  onExited,
  labels,
  onDisconnect,
}: SettingsCalendarDisconnectModalContainerProps) => {
  return (
    <OverlayModal
      isOpen={isOpen}
      onClose={onClose}
      onExited={onExited}
      ariaLabel={labels.calendarDisconnectConfirmTitle}
      className="w-100 p-5.5"
    >
      <div className="mb-4 size-10 shrink-0">
        <Image src={timoTimerLogo} alt="" width={40} height={40} />
      </div>
      <p className="typo-headline-b-18 text-timo-black">
        {labels.calendarDisconnectConfirmTitle}
      </p>
      <p className="typo-headline-r-14 text-timo-gray-900 mt-1">
        {labels.calendarDisconnectConfirmDescription}
      </p>
      <div className="mt-6 flex w-full gap-3">
        <ModalButton variant="border" className="flex-1 px-0" onClick={onClose}>
          {labels.calendarDisconnectConfirmCancel}
        </ModalButton>
        <ModalButton
          variant="fill"
          className="flex-1 px-0"
          onClick={() => {
            onDisconnect();
            onClose();
          }}
        >
          {labels.calendarDisconnectConfirmConfirm}
        </ModalButton>
      </div>
    </OverlayModal>
  );
};
