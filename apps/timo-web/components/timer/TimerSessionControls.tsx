"use client";

import { Modal } from "@repo/timo-design-system/ui";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import { TimerCompleteModalPanel } from "@/components/timer/TimerCompleteModalPanel";
import { TimerControls } from "@/components/timer/TimerControls";
import { TimerEndModalPanel } from "@/components/timer/TimerEndModalPanel";
import {
  TimerExtendModalPanel,
  type ExtendTimePreset,
} from "@/components/timer/TimerExtendModalPanel";
import { TimerStopModalPanel } from "@/components/timer/TimerStopModalPanel";

type TimerModalStep = "end" | "stop" | "extend" | "complete";

export interface TimerSessionControlsHandle {
  openStopModal: () => void;
}

export interface TimerSessionControlsProps {
  isRunning: boolean;
  onTogglePlay: () => void;
  plannedMinutes: number;
  actualMinutes: number;
  feedbackText?: string;
  onExtend: (minutes: number) => void;
  onComplete: () => void;
  disabled?: boolean;
}

export const TimerSessionControls = forwardRef<
  TimerSessionControlsHandle,
  TimerSessionControlsProps
>(function TimerSessionControls(
  {
    isRunning,
    onTogglePlay,
    plannedMinutes,
    actualMinutes,
    feedbackText,
    onExtend,
    onComplete,
    disabled = false,
  },
  ref,
) {
  const [step, setStep] = useState<TimerModalStep>("end");
  const stopModalTriggerRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    openStopModal: () => {
      setStep("stop");
      stopModalTriggerRef.current?.click();
    },
  }));
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
        onOpenEndModal={() => setStep(isRunning ? "stop" : "end")}
        onOpenExtendModal={() => {
          resetExtendSelection();
          setStep("extend");
        }}
        disabled={disabled}
      />
      <Modal.Trigger
        ref={stopModalTriggerRef}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
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
        {step === "stop" && (
          <TimerStopModalPanel
            minutes={actualMinutes}
            onSwitch={() => setStep("complete")}
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
});
