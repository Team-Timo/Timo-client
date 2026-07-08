import { WarningWhiteIcon } from "../../icons";

import type { ReactNode } from "react";

export interface ToastProps {
  message: ReactNode;
}

export const Toast = ({ message }: ToastProps) => {
  return (
    <div
      role="alert"
      className="bg-timo-gray-900 shadow-timo-gray-700 flex w-122.5 items-center gap-2 rounded-[4px] px-4 py-2"
    >
      <WarningWhiteIcon className="size-6 shrink-0" />
      <div className="typo-headline-m-14 wrap-break-word text-white">
        {message}
      </div>
    </div>
  );
};
