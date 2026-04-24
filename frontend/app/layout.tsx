import type { Metadata } from "next";
import { Chivo, Chivo_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
import Header from "@/components/Header";

const chivoSans = Chivo({
  variable: "--font-chivo",
    display: "swap",
  subsets: ["latin"],
});

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
    display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lokum Meet",
  description: "Best social app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = useMessages();

  return (
    <html>
      <body
        className={`${chivoSans.className} ${chivoMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <Header />
          { children }
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
