import { routing } from "@/i18n/routing";
import en from "@/messages/en.json";

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof en;
  }
}
