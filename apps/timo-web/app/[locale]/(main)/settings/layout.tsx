import { SettingsHeaderContainer } from "@/app/[locale]/(main)/settings/_containers/SettingsHeaderContainer";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SettingsHeaderContainer />
      {children}
    </>
  );
}
