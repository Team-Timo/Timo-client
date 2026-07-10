"use client";

import { Modal } from "@repo/timo-design-system/ui";
import { useState } from "react";

import { TimerCompleteModalPanel } from "@/components/timer/TimerCompleteModalPanel";
import { TimerControls } from "@/components/timer/TimerControls";
import { TimerEndModalPanel } from "@/components/timer/TimerEndModalPanel";
import {
  TimerExtendModalPanel,
  type ExtendTimePreset,
} from "@/components/timer/TimerExtendModalPanel";

type TimerModalStep = "end" | "extend" | "complete";

const DEFAULT_COMPLETE_FEEDBACK_TEXT = "이번 작업을 완료했어요. 수고하셨어요!";

export interface TimerSessionControlsProps {
  isRunning: boolean;
  onTogglePlay: () => void;
  plannedMinutes: number;
  actualMinutes: number;
  feedbackText?: string;
  onExtend: (minutes: number) => void;
  onComplete: () => void;
}

export const TimerSessionControls = ({
  isRunning,
  onTogglePlay,
  plannedMinutes,
  actualMinutes,
  feedbackText = DEFAULT_COMPLETE_FEEDBACK_TEXT,
  onExtend,
  onComplete,
}: TimerSessionControlsProps) => {
  const [step, setStep] = useState<TimerModalStep>("end");
  const [selectedPreset, setSelectedPreset] = useState<ExtendTimePreset | null>(
    null,
  );
  const [customMinutes, setCustomMinutes] = useState("");

  const resetExtendSelection = () => {
    setSelectedPreset(null);
    setCustomMinutes("");
  };

  const handleSubmitExtend = () => {
    const minutes =
      selectedPreset === "custom"
        ? Number(customMinutes)
        : (selectedPreset ?? 0);

    if (minutes > 0) onExtend(minutes);

    resetExtendSelection();
  };

  const canSubmitExtend =
    selectedPreset !== null &&
    (selectedPreset !== "custom" || Number(customMinutes) > 0);

  return (
    <Modal>
      <TimerControls
        isRunning={isRunning}
        onTogglePlay={onTogglePlay}
        onOpenEndModal={() => setStep("end")}
        onOpenExtendModal={() => {
          resetExtendSelection();
          setStep("extend");
        }}
      />
      <Modal.Overlay />
      <Modal.Panel>
        {step === "end" && (
          <TimerEndModalPanel
            onContinue={() => {
              resetExtendSelection();
              setStep("extend");
            }}
            onComplete={() => setStep("complete")}
          />
        )}
        {step === "extend" && (
          <TimerExtendModalPanel
            selectedPreset={selectedPreset}
            customMinutes={customMinutes}
            onSelectPreset={(preset) => {
              setSelectedPreset(preset);
              if (preset !== "custom") setCustomMinutes("");
            }}
            onCustomMinutesChange={setCustomMinutes}
            onClose={resetExtendSelection}
            onSubmit={handleSubmitExtend}
            canSubmit={canSubmitExtend}
          />
        )}
        {step === "complete" && (
          <TimerCompleteModalPanel
            plannedMinutes={plannedMinutes}
            actualMinutes={actualMinutes}
            feedbackText={feedbackText}
            onComplete={onComplete}
          />
        )}
      </Modal.Panel>
    </Modal>
  );
};
