import type { Metadata } from "next";
import Providers from "../lib/providers";

export const metadata: Metadata = {
  title: "Timo",
  description: "Timo web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
