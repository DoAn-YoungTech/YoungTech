import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutSite from "@/components/layout/layoutSite";

const geistSans = Geist({
  variable: "--font-geist-sans", 
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"], 
});

export const metadata = {
  title: "YoungTech || Dashboard",
  description: "Quản lý website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutSite>
          {children}
        </LayoutSite>
      </body>
    </html>
  );
}
