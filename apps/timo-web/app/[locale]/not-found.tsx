import { getTranslations } from "next-intl/server";

import { StatusScreen } from "@/components/status-screen/StatusScreen";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <StatusScreen
      lottieSrc="/lottie/404.json"
      title={t("title")}
      description={t("description")}
      action={
        <Link
          href="/"
          className="typo-headline-m-16 rounded-[8px] border border-gray-500 px-4 py-2.5 text-gray-900"
        >
          {t("homeButton")}
        </Link>
      }
    />
  );
}
