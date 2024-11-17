'use client'

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PrelineScript from "@/components/PrelineScript";
import { Web3Provider } from "@/components/Web3Provider";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const metadata: Metadata = {
  title: "HorntDAO",
  description: "Public Goods for Horny People",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3Provider>
        {children}
        </Web3Provider>
      </body>
      <PrelineScript />
    </html>
  );
}
