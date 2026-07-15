"use client";

import timoTimerLogo from "@repo/timo-design-system/assets/images/logo/timo-timer.svg";
import { ModalButton } from "@repo/timo-design-system/ui";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { OverlayModal } from "@/components/modal/OverlayModal";

export interface SettingsWithdrawModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
  onWithdraw: () => void;
}

export const SettingsWithdrawModalContainer = ({
  isOpen,
  onClose,
  onExited,
  onWithdraw,
}: SettingsWithdrawModalContainerProps) => {
  const t = useTranslations("Settings.withdrawal");

  return (
    <OverlayModal
      isOpen={isOpen}
      onClose={onClose}
      onExited={onExited}
      ariaLabel={t("withdrawConfirmTitle")}
      className="w-100 p-5.5"
    >
      <div className="mb-4 size-10 shrink-0">
        <Image src={timoTimerLogo} alt="" width={40} height={40} />
      </div>
      <p className="typo-headline-b-18 text-timo-black">
        {t.rich("withdrawConfirmTitle", {
          red: (chunks) => (
            <span className="text-timo-red">{chunks}</span>
          ),
        })}
      </p>
      <p className="typo-headline-r-14 text-timo-gray-900 mt-1">
        {t("withdrawConfirmDescription")}
      </p>
      <div className="mt-6 flex w-full gap-3">
        <ModalButton
          variant="border"
          className="flex-1 px-0"
          onClick={onClose}
        >
          {t("withdrawConfirmCancel")}
        </ModalButton>
        <ModalButton
          variant="fill"
          className="flex-1 px-0"
          onClick={() => {
            onWithdraw();
            onClose();
          }}
        >
          {t("withdrawConfirmConfirm")}
        </ModalButton>
      </div>
    </OverlayModal>
  );
};
