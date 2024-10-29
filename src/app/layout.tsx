import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import logo from "../../public/logo.svg";

const notoSans = localFont({
  src: "./fonts/NotoSansThai-VariableFont_wdth,wght.ttf",
  variable: "--font-noto-sans",
  weight: "400 500",
});

export const metadata: Metadata = {
  title: "Online Shop",
  description: "Ready for sport",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans} antialiased`}>
        <nav className="flex justify-center items-center py-3 grey-100 drop-shadow-sm bg-grey-100 ">
          <Image src={logo} alt="logo" />
        </nav>
        <main className="min-h-dvh">{children}</main>
        <footer className="flex justify-center py-2 body-2 bg-grey-90 text-grey-30">
          Copyright 2023 Online Shop
        </footer>
      </body>
    </html>
  );
}
