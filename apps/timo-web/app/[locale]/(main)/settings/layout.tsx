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

      <div className="flex flex-1 overflow-y-auto">
        <SettingsNavContainer />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
