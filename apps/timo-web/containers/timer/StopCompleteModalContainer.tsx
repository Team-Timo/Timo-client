"use client";

import { Modal } from "@repo/timo-design-system/ui";
import { useEffect, useRef, useState } from "react";

import { TimerCompleteModalPanel } from "@/components/timer/TimerCompleteModalPanel";
import { TimerStopModalPanel } from "@/components/timer/TimerStopModalPanel";

export interface StopCompleteModalContainerProps {
  pendingToken: number | null;
  plannedMinutes: number;
  actualMinutes: number;
  feedbackText?: string;
  onConfirm: () => void;
}

export const StopCompleteModalContainer = ({
  pendingToken,
  plannedMinutes,
  actualMinutes,
  feedbackText,
  onConfirm,
}: StopCompleteModalContainerProps) => {
  const [step, setStep] = useState<"stop" | "complete">("stop");
  const hiddenTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pendingToken === null) return;

    setStep("stop");
    hiddenTriggerRef.current?.click();
  }, [pendingToken]);

  return (
    <Modal>
      <Modal.Trigger
        ref={hiddenTriggerRef}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
      <Modal.Overlay />
      <Modal.Panel>
        {step === "stop" ? (
          <TimerStopModalPanel
            minutes={actualMinutes}
            onSwitch={() => setStep("complete")}
          />
        ) : (
          <TimerCompleteModalPanel
            plannedMinutes={plannedMinutes}
            actualMinutes={actualMinutes}
            feedbackText={feedbackText}
            onComplete={onConfirm}
          />
        )}
      </Modal.Panel>
    </Modal>
  );
};
