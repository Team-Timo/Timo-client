"use client";

import { useTranslations } from "next-intl";

import type { SettingsWithdrawalLabels } from "@/app/[locale]/(main)/settings/withdrawal/_types/withdrawal-type";

import { SettingsWithdrawalView } from "@/app/[locale]/(main)/settings/withdrawal/_components/SettingsWithdrawalView";

export const SettingsWithdrawalContainer = () => {
  const t = useTranslations("Settings.withdrawal");

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
    // TODO: 실제 확인 모달로 교체
    const confirmed = window.confirm(t("confirmMessage"));
    if (!confirmed) return;

    // TODO: API - 회원 탈퇴 및 데이터 영구 삭제
    console.log("회원 탈퇴 API를 호출합니다.");
  };

  return <SettingsWithdrawalView labels={labels} onWithdraw={handleWithdraw} />;
};
