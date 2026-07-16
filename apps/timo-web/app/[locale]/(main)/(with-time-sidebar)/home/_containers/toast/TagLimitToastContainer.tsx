"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { AnimatedToast } from "@/components/toast/AnimatedToast";

interface TagLimitToastContainerProps {
  count?: number;
  onClose?: () => void;
}

export const TagLimitToastContainer = ({
  count = 8,
  onClose,
}: TagLimitToastContainerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const t = useTranslations("Toast");

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <AnimatedToast
      isOpen={isOpen}
      onClose={handleClose}
      message={
        <p className="mb-0">
          {t.rich("tagLimit", {
            count,
            blue: (chunks) => (
              <span className="text-timo-blue-300">{chunks}</span>
            ),
          })}
        </p>
      }
    />
  );
};
