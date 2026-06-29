import "./globals.css";
import localFont from "next/font/local";

import type { Metadata } from "next";

import { QueryProvider } from "@/providers/QueryProvider";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-family-pretendard",
  weight: "45 920",
  display: "swap",
});

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
