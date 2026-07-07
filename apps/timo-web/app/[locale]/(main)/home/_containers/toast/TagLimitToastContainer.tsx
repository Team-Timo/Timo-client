"use client";

import { useState } from "react";

import { AnimatedToast } from "@/components/toast/AnimatedToast";

export const TagLimitToastContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // TODO: 영문 ver
  return (
    <AnimatedToast
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      message={
        <>
          <p className="mb-0">
            태그는 <span className="text-timo-blue-300">최대 8개</span>
            까지 만들 수 있으며, 추가하려면 기존 태그를 삭제해 주세요.
          </p>
        </>
      }
    />
  );
};
