import AxeWrapper from "@/axe/axeWrapper";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Sarala } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const saralaRegular = Sarala({
  variable: "--font-sarala-regular",
  subsets: ["latin"],
  weight: "400"
});

const saralaBold = Sarala({
  variable: "--font-sarala-bold",
  subsets: ["latin"],
  weight: "700"
});

export const metadata: Metadata = {
  title: "Forkflow",
  description: `Optimise your restaurant management tasks with everything in one place`
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${saralaRegular.variable} ${saralaBold.variable} antialiased app-body`}
      >
        <AxeWrapper>
            {children}
        </AxeWrapper>
      </body>
    </html>
  );
}
