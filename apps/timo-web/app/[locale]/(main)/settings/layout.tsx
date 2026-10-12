import { SettingsHeaderContainer } from "@/app/[locale]/(main)/settings/_containers/SettingsHeaderContainer";
import { SettingsNavContainer } from "@/app/[locale]/(main)/settings/_containers/SettingsNavContainer";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <SettingsHeaderContainer />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
        <SettingsNavContainer />
        <section className="min-h-0 flex-1 overflow-y-auto">{children}</section>
      </div>
    </div>
  );
}
