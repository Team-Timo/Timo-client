import "./globals.css";
import { pretendard } from "./fonts";

import type { Metadata } from "next";

import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Timo",
  description: "Timo web",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" className={pretendard.variable}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
