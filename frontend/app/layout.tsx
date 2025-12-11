import type { Metadata } from "next";
import { Chivo, Chivo_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

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
  return (
    <html lang="en">
      <body
        className={`${chivoSans.className} ${chivoMono.variable} antialiased`}
      >
        <Layout>
            {children}
        </Layout>
      </body>
    </html>
  );
}
