"use client";

import { Modal } from "@repo/timo-design-system/ui";
import { useEffect, useRef } from "react";

import { TimerSwitchModalPanel } from "@/components/timer/TimerSwitchModalPanel";

export interface TimerSwitchModalContainerProps {
  pendingToken: number | null;
  onConfirm: () => void;
}

export const TimerSwitchModalContainer = ({
  pendingToken,
  onConfirm,
}: TimerSwitchModalContainerProps) => {
  const hiddenTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pendingToken === null) return;

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
        <TimerSwitchModalPanel onSwitch={onConfirm} />
      </Modal.Panel>
    </Modal>
  );
};
