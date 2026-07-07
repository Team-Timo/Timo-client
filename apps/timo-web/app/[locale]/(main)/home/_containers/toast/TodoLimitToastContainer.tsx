"use client";

import { useState } from "react";

import { AnimatedToast } from "@/components/toast/AnimatedToast";

export const TodoLimitToastContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // TODO: 영문 ver
  return (
    <AnimatedToast
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      message={
        <>
          <p className="mb-0">
            완료되지 않은 투두는{" "}
            <span className="text-timo-blue-300">최대 20개</span>
            까지 추가할 수 있어요.
          </p>
          <p>새로운 투두를 추가하려면 기존 투두를 완료해주세요.</p>
        </>
      }
    />
  );
};
