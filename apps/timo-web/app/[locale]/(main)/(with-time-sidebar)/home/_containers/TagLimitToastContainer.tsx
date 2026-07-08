"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { AnimatedToast } from "@/components/toast/AnimatedToast";

export const TagLimitToastContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const t = useTranslations("Toast");

  return (
    <AnimatedToast
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      message={
        <p className="mb-0">
          {t.rich("tagLimit", {
            blue: (chunks) => (
              <span className="text-timo-blue-300">{chunks}</span>
            ),
          })}
        </p>
      }
    />
  );
};
