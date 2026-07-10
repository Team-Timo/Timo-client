import { Modal } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

export type ExtendTimePreset = 10 | 30 | 60 | "custom";

const PRESET_OPTIONS: { preset: ExtendTimePreset; label: string }[] = [
  { preset: 10, label: "+10M" },
  { preset: 30, label: "+30M" },
  { preset: 60, label: "+1H" },
];

const MAX_CUSTOM_MINUTES = 720;

export interface TimerExtendModalPanelProps {
  selectedPreset: ExtendTimePreset | null;
  customMinutes: string;
  onSelectPreset: (preset: ExtendTimePreset) => void;
  onCustomMinutesChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
}

export const TimerExtendModalPanel = ({
  selectedPreset,
  customMinutes,
  onSelectPreset,
  onCustomMinutesChange,
  onClose,
  onSubmit,
  canSubmit,
}: TimerExtendModalPanelProps) => {
  const isCustomSelected = selectedPreset === "custom";

  return (
    <>
      <Modal.Title>시간을 얼마나 추가할까요?</Modal.Title>

      <div className="mt-5.75 grid w-full grid-cols-4 gap-1.25">
        {PRESET_OPTIONS.map(({ preset, label }) => (
          <button
            key={preset}
            type="button"
            aria-pressed={selectedPreset === preset}
            onClick={() => onSelectPreset(preset)}
            className={cn(
              "typo-headline-r-14 flex h-[37px] items-center justify-center rounded-[4px]",
              selectedPreset === preset
                ? "bg-timo-blue-300 text-white"
                : "bg-timo-gray-300 text-timo-black",
            )}
          >
            {label}
          </button>
        ))}

        {isCustomSelected ? (
          <div className="border-timo-gray-500 flex h-[37px] items-center justify-center gap-0.5 rounded-[4px] border px-2">
            <input
              type="text"
              inputMode="numeric"
              value={customMinutes}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, "");
                const clamped =
                  digitsOnly === ""
                    ? ""
                    : String(Math.min(Number(digitsOnly), MAX_CUSTOM_MINUTES));

                onCustomMinutesChange(clamped);
              }}
              aria-label="직접 입력 시간(분)"
              className="typo-headline-r-14 text-timo-black min-w-0 flex-1 text-right outline-none"
            />
            <span className="typo-headline-r-14 text-timo-black shrink-0">
              분
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onSelectPreset("custom")}
            className="typo-headline-r-14 text-timo-gray-700 bg-timo-gray-300 flex h-[37px] items-center justify-center rounded-[4px]"
          >
            직접 입력
          </button>
        )}
      </div>

      <div className="mt-2.5 flex w-full gap-1.5">
        <Modal.BorderButton className="flex-1 px-0" onClick={onClose}>
          닫기
        </Modal.BorderButton>
        <Modal.FillButton
          className={cn(
            "flex-1 px-0",
            !canSubmit &&
              "border-timo-gray-500 text-timo-gray-700 border bg-white",
          )}
          disabled={!canSubmit}
          onClick={onSubmit}
        >
          시간 추가하기
        </Modal.FillButton>
      </div>
    </>
  );
};
