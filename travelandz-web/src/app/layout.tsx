import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "@/fonts";

export const metadata: Metadata = {
  title: "Travelandz",
  description: "Web App for Travelandz challenge",
  authors: {
    name: "aavaldez64",
    url: "https://github.com/aavaldez64",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={montserrat.className + " min-h-screen w-screen"}>
        {children}
      </body>
    </html>
  );
}
