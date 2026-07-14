import type { ReactNode } from "react";

import { LottiePlayer } from "@/components/lottie/LottiePlayer";

export interface StatusScreenProps {
  lottieSrc: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export const StatusScreen = ({
  lottieSrc,
  title,
  description,
  action,
}: StatusScreenProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-[90px] px-6 text-center">
      <LottiePlayer src={lottieSrc} className="w-[397px]" ariaLabel={title} />
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex flex-col gap-1.5">
          <h1 className="typo-headline-b-30 text-timo-black">{title}</h1>
          <p className="typo-body-r-12 text-timo-gray-900">{description}</p>
        </div>
        {action}
      </div>
    </div>
  );
};
