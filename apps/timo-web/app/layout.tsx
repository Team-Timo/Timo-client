import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timo",
  description: "Timo web",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
