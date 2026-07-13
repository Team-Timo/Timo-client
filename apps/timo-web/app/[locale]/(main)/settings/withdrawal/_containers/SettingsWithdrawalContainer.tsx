"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import type { SettingsWithdrawalLabels } from "@/app/[locale]/(main)/settings/withdrawal/_types/withdrawal-type";

import { SettingsWithdrawalView } from "@/app/[locale]/(main)/settings/withdrawal/_components/SettingsWithdrawalView";
import { useWithdrawAction } from "@/app/[locale]/(main)/settings/withdrawal/_queries/use-withdraw";
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
    // TODO: 실제 확인 모달로 교체
    const confirmed = window.confirm(t("confirmMessage"));
    if (!confirmed) return;

    withdrawMutate(undefined, {
      onError: () => {
        setIsErrorToastOpen(true);
      },
    });
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
