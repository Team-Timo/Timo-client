import type { ReactNode } from "react";

import { AnimatedToast } from "@/components/toast/AnimatedToast";

export interface FocusSessionLayoutProps {
  header?: ReactNode;
  isErrorToastOpen: boolean;
  onCloseErrorToast: () => void;
  errorToastMessage: string;
  taskItem: ReactNode;
  timer: ReactNode;
  controls: ReactNode;
}

export const FocusSessionLayout = ({
  header,
  isErrorToastOpen,
  onCloseErrorToast,
  errorToastMessage,
  taskItem,
  timer,
  controls,
}: FocusSessionLayoutProps) => {
  return (
    <div className="flex h-full flex-col">
      {header}
      <AnimatedToast
        isOpen={isErrorToastOpen}
        onClose={onCloseErrorToast}
        message={errorToastMessage}
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row md:overflow-x-auto md:overflow-y-hidden">
        <div className="flex flex-col md:flex-1">{taskItem}</div>

        <section className="border-timo-gray-500 flex w-full shrink-0 items-center justify-center border-t bg-white py-8 md:h-full md:w-136.5 md:justify-start md:border-t-0 md:border-l md:py-0">
          <div className="flex w-full flex-col items-center gap-11.25">
            {timer}
            {controls}
          </div>
        </section>
      </div>
    </div>
  );
};
