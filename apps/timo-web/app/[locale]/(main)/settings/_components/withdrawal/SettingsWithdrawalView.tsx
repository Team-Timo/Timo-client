import { WarningGrayIcon } from "@repo/timo-design-system/icons";
import { Button } from "@repo/timo-design-system/ui";

import type { SettingsWithdrawalLabels } from "@/app/[locale]/(main)/settings/_types/withdrawal/withdrawal-type";

export interface SettingsWithdrawalViewProps {
  labels: SettingsWithdrawalLabels;
  onWithdraw: () => void;
}

export const SettingsWithdrawalView = ({
  labels,
  onWithdraw,
}: SettingsWithdrawalViewProps) => {
  return (
    <div className="flex flex-col gap-5 px-15 pt-7.5">
      <h1 className="typo-headline-m-16 text-timo-gray-900">{labels.title}</h1>
      <hr className="border-timo-gray-500" />

      <div className="flex w-106.25 flex-col gap-7.5">
        <div className="flex flex-col gap-1.5">
          <p className="typo-headline-b-18 text-timo-gray-900">
            {labels.guideTitle}
          </p>
          <p className="typo-headline-m-14 text-timo-gray-900">
            {labels.guideDescription}
          </p>
        </div>

        <div className="bg-timo-gray-200 flex flex-col gap-3 rounded-lg py-7.5 pr-45 pl-7.5">
          <p className="typo-headline-b-16 text-timo-gray-900">
            {labels.warningTitle}
          </p>
          <div className="flex flex-col gap-1.5">
            {labels.warnings.map((warning) => (
              <div key={warning} className="flex items-start gap-2">
                <WarningGrayIcon className="shrink-0" />
                <p className="typo-headline-m-14 text-timo-gray-900">
                  {warning}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="secondary"
          appearance="fill"
          size="m"
          onClick={onWithdraw}
          className="w-20"
        >
          {labels.withdraw}
        </Button>
      </div>
    </div>
  );
};
