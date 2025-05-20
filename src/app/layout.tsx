//wrapper de todas nuestras pantallas
//children es cualquier codigo
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Header/Header";
import { GuestSessionProvider } from "@/providers/GuestSessionContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Movies App for React course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
      <GuestSessionProvider>
      <Header />
        <main className="p-6 mt-16">{children}</main>
      </GuestSessionProvider>
      </body>
    </html>
  );
}


