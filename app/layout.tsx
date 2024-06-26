import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WeatherApp",
  description: "WeatherApp for Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Reem+Kufi+Fun:wght@400..700&family=Tilt+Neon&display=swap"
        rel="stylesheet"/>
    </head>
    <body className={inter.className}>{children}</body>
    </html>
  );
}
