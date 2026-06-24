import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import "@my-ui/ui/globals.css";
import "./sandbox.css";
import { Providers } from "./providers";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  description: "Component sandbox and live theme editor for @my-ui/ui.",
  title: "my-ui sandbox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scrollbar-gutter-stable bg-background"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} min-h-svh font-sans text-foreground antialiased relative`}
      >
        <div className="root min-h-svh">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
