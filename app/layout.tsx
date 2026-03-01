import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Clicky Clicks - Best Photography & Rentals In Bangalore",
  description: "Bangalore's premier photography studio. Maternity, Wedding, Pre-Wedding, Modelling, Baby & Product shoots. Camera rentals by Nagarjun's Camera House.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}