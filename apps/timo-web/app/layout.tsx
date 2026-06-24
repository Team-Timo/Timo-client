import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timo",
  description: "Timo web",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
