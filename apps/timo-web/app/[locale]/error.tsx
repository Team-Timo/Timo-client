"use client";

import * as Sentry from "@sentry/nextjs";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { StatusScreen } from "@/components/status-screen/StatusScreen";
import { Link } from "@/i18n/navigation";

interface ErrorPageProps {
  error: Error & { digest?: string };
}

export default function ErrorPage({ error }: ErrorPageProps) {
  const t = useTranslations("Error");

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <StatusScreen
      lottieSrc="/lottie/500.json"
      title={t("title")}
      description={t("description")}
      action={
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="typo-headline-m-16 rounded-[8px] border border-gray-500 px-4 py-2.5 text-gray-900"
          >
            {t("homeButton")}
          </Link>
        </div>
      }
    />
  );
}
