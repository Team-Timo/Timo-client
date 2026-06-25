import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timo",
  description: "Timo web",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
