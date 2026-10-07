import { Button, Modal } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";

import { extendTimerBodyExtendMinutesMax } from "@/generated/endpoints/timer/timer.zod";

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

// JSX 안에 인라인으로 두면 리렌더마다 다시 포커스되므로 컴포넌트 밖에 둔다
const focusOnMount = (element: HTMLInputElement | null) => {
  element?.focus();
};

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
          <Button
            key={preset}
            variant="secondary"
            appearance="fill"
            size="m"
            className="text-timo-black"
            aria-pressed={selectedPreset === preset}
            onClick={() => onSelectPreset(preset)}
          >
            {t(labelKey)}
          </Button>
        ))}

        {isCustomSelected ? (
          <div className="border-timo-blue-300 focus-within:ring-timo-blue-300 flex h-8.5 items-center justify-center rounded-[4px] border px-2 focus-within:ring-2 focus-within:ring-offset-2">
            <input
              ref={focusOnMount}
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
          <Button
            variant="secondary"
            appearance="fill"
            size="m"
            className="text-timo-black"
            onClick={() => onSelectPreset("custom")}
          >
            {t("customPreset")}
          </Button>
        )}
      </div>

      <div className="mt-2.5 flex w-full gap-1.5">
        {canGoBack ? (
          <Button
            variant="secondary"
            appearance="outline"
            size="lg"
            className="flex-1"
            onClick={onClose}
          >
            {t("closeButton")}
          </Button>
        ) : (
          <Modal.BorderButton onClick={onClose}>
            {t("closeButton")}
          </Modal.BorderButton>
        )}
        <Modal.FillButton disabled={!canSubmit} onClick={onSubmit}>
          {t("submitButton")}
        </Modal.FillButton>
      </div>
    </>
  );
};
