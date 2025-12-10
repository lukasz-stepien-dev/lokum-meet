import type { Metadata } from "next";
import { Chivo, Chivo_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

const chivo = Chivo({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Lokum Meet",
    description: "An event app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body 
                className={`${chivo.className}s bg-background min-h-screen antialiased`}
                suppressHydrationWarning={true}
            >
                <SessionProvider>
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}
