import { Modal } from "@repo/timo-design-system/ui";

export interface TimerCompleteModalPanelProps {
  plannedMinutes: number;
  actualMinutes: number;
  feedbackText: string;
  onComplete: () => void;
}

export const TimerCompleteModalPanel = ({
  plannedMinutes,
  actualMinutes,
  feedbackText,
  onComplete,
}: TimerCompleteModalPanelProps) => {
  return (
    <>
      <Modal.Title>테스크가 완료 되었어요!</Modal.Title>
      <p className="typo-headline-r-14 text-timo-black mt-3">{feedbackText}</p>

      <div className="bg-timo-gray-500 mt-4.5 h-px w-full" />

      <div className="mt-4 flex gap-6.5">
        <div className="flex flex-col gap-1">
          <span className="typo-body-m-12 text-timo-gray-900">계획</span>
          <span className="typo-headline-b-20 text-timo-gray-900">
            {plannedMinutes}m
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="typo-body-m-12 text-timo-blue-300">실제</span>
          <span className="typo-headline-m-20 text-timo-blue-300">
            {actualMinutes}m
          </span>
        </div>
      </div>

      <Modal.Footer>
        <Modal.FillButton className="flex-1 px-0" onClick={onComplete}>
          완료하기
        </Modal.FillButton>
      </Modal.Footer>
    </>
  );
};
