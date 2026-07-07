import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ko"],
  defaultLocale: "en",
  localePrefix: "always", // as-needed 로 추후 변경
});
