"use client";

import { useTranslations } from "next-intl";
import { overlay } from "overlay-kit";
import { useState } from "react";

import type { SettingsWithdrawalLabels } from "@/app/[locale]/(main)/settings/_types/withdrawal/withdrawal-type";

import { SettingsWithdrawalView } from "@/app/[locale]/(main)/settings/_components/withdrawal/SettingsWithdrawalView";
import { SettingsWithdrawModalContainer } from "@/app/[locale]/(main)/settings/_containers/withdrawal/SettingsWithdrawModalContainer";
import { useWithdrawAction } from "@/app/[locale]/(main)/settings/_queries/withdrawal/use-withdraw";
import { AnimatedToast } from "@/components/toast/AnimatedToast";

export const SettingsWithdrawalContainer = () => {
  const t = useTranslations("Settings.withdrawal");
  const { mutate: withdrawMutate, isPending } = useWithdrawAction();
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);

  const labels: SettingsWithdrawalLabels = {
    title: t("title"),
    guideTitle: t("guideTitle"),
    guideDescription: t("guideDescription"),
    warningTitle: t("warningTitle"),
    warnings: [
      t("warningSchedule"),
      t("warningCalendar"),
      t("warningIrreversible"),
    ],
    withdraw: t("withdraw"),
  };

  const handleWithdraw = () => {
    if (isPending) return;

    overlay.open(({ isOpen, close, unmount }) => (
      <SettingsWithdrawModalContainer
        isOpen={isOpen}
        onClose={close}
        onExited={unmount}
        onWithdraw={() =>
          withdrawMutate(undefined, {
            onError: () => setIsErrorToastOpen(true),
          })
        }
      />
    ));
  };

  return (
    <>
      <SettingsWithdrawalView labels={labels} onWithdraw={handleWithdraw} />
      <AnimatedToast
        isOpen={isErrorToastOpen}
        onClose={() => setIsErrorToastOpen(false)}
        message={t("withdrawError")}
      />
    </>
  );
};
