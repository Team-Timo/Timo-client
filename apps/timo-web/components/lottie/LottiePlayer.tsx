"use client";

import { cn } from "@repo/timo-design-system/utils";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export interface LottiePlayerProps {
  src: string;
  loop?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const LottiePlayer = ({
  src,
  loop = true,
  className,
  ariaLabel,
}: LottiePlayerProps) => {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(src, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Lottie 애니메이션 로드 실패: ${response.status}`);
        }
        return response.json();
      })
      .then(setAnimationData)
      .catch(() => {
        // 애니메이션 로드 실패 시 컨테이너만 비운 상태로 유지 (레이아웃 시프트 방지)
      });

    return () => controller.abort();
  }, [src]);

  return (
    <div className={cn(className)}>
      {animationData && (
        <Lottie
          animationData={animationData}
          loop={loop}
          role="img"
          aria-label={ariaLabel}
        />
      )}
    </div>
  );
};
