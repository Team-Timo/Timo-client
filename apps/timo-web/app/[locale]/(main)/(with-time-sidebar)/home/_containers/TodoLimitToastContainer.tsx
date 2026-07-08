"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { AnimatedToast } from "@/components/toast/AnimatedToast";

export const TodoLimitToastContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const t = useTranslations("Toast");

  return (
    <AnimatedToast
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      message={
        <>
          <p className="mb-0">
            {t.rich("todoLimitLine1", {
              blue: (chunks) => (
                <span className="text-timo-blue-300">{chunks}</span>
              ),
            })}
          </p>
          <p>{t("todoLimitLine2")}</p>
        </>
      }
    />
  );
};
