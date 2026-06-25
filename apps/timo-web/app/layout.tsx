import type { Metadata } from "next";
import { QueryProvider } from "@/providers/QueryProvider";

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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
