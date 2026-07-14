import { Modal, ModalButton } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";
import { useTranslations } from "next-intl";

import { extendTimerBodyExtendMinutesMax } from "@/api/generated/endpoints/timer/timer.zod";

export type ExtendTimePreset = 10 | 30 | 60 | "custom";

type ExtendPresetLabelKey =
  | "presetTenMin"
  | "presetThirtyMin"
  | "presetOneHour";

const PRESET_OPTIONS: {
  preset: ExtendTimePreset;
  labelKey: ExtendPresetLabelKey;
}[] = [
  { preset: 10, labelKey: "presetTenMin" },
  { preset: 30, labelKey: "presetThirtyMin" },
  { preset: 60, labelKey: "presetOneHour" },
];

const CHIP_FOCUS_BORDER_CLASS =
  "border-2 border-transparent focus-visible:border-timo-blue-300 outline-none";

export interface TimerExtendModalPanelProps {
  selectedPreset: ExtendTimePreset | null;
  customMinutes: string;
  onSelectPreset: (preset: ExtendTimePreset) => void;
  onCustomMinutesChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  /** 이전에 노출되던 팝업(End 모달)으로 돌아갈 수 있는 경우에만 true — 이 경우 닫기 버튼이 모달 자체를 닫지 않고 onClose에서 이전 단계로 전환한다 */
  canGoBack: boolean;
}

export const TimerExtendModalPanel = ({
  selectedPreset,
  customMinutes,
  onSelectPreset,
  onCustomMinutesChange,
  onClose,
  onSubmit,
  canSubmit,
  canGoBack,
}: TimerExtendModalPanelProps) => {
  const t = useTranslations("Focus.extendModal");
  const isCustomSelected = selectedPreset === "custom";

  return (
    <>
      <Modal.Title>{t("title")}</Modal.Title>

      <div className="mt-5.75 grid w-full grid-cols-4 gap-1.25">
        {PRESET_OPTIONS.map(({ preset, labelKey }) => (
          <button
            key={preset}
            type="button"
            aria-pressed={selectedPreset === preset}
            onClick={() => onSelectPreset(preset)}
            className={cn(
              "typo-headline-r-14 flex h-[37px] items-center justify-center rounded-[4px]",
              CHIP_FOCUS_BORDER_CLASS,
              selectedPreset === preset
                ? "bg-timo-blue-300 text-white"
                : "bg-timo-gray-300 text-timo-black",
            )}
          >
            {t(labelKey)}
          </button>
        ))}

        {isCustomSelected ? (
          <div className="border-timo-gray-500 focus-within:border-timo-blue-300 flex h-[37px] items-center justify-center rounded-[4px] border px-2">
            <input
              type="text"
              inputMode="numeric"
              value={customMinutes}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, "");
                const clamped =
                  digitsOnly === ""
                    ? ""
                    : String(
                        Math.min(
                          Number(digitsOnly),
                          extendTimerBodyExtendMinutesMax,
                        ),
                      );

                onCustomMinutesChange(clamped);
              }}
              aria-label={t("customInputLabel")}
              style={{ width: `${Math.max(customMinutes.length, 1)}ch` }}
              className="typo-headline-r-14 text-timo-black shrink-0 text-center outline-none"
            />
            <span className="typo-headline-r-14 text-timo-black shrink-0">
              {t("customUnitSuffix")}
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onSelectPreset("custom")}
            className={cn(
              "typo-headline-r-14 text-timo-gray-700 bg-timo-gray-300 flex h-[37px] items-center justify-center rounded-[4px]",
              CHIP_FOCUS_BORDER_CLASS,
            )}
          >
            {t("customPreset")}
          </button>
        )}
      </div>

      <div className="mt-2.5 flex w-full gap-1.5">
        {canGoBack ? (
          <ModalButton
            variant="border"
            className="flex-1 px-0"
            onClick={onClose}
          >
            {t("closeButton")}
          </ModalButton>
        ) : (
          <Modal.BorderButton className="flex-1 px-0" onClick={onClose}>
            {t("closeButton")}
          </Modal.BorderButton>
        )}
        <Modal.FillButton
          className={cn(
            "flex-1 px-0",
            !canSubmit &&
              "border-timo-gray-500 text-timo-gray-700 border bg-white",
          )}
          disabled={!canSubmit}
          onClick={onSubmit}
        >
          {t("submitButton")}
        </Modal.FillButton>
      </div>
    </>
  );
};
