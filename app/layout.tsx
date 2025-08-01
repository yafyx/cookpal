import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "CookPal - Your Cooking Companion",
  description:
    "A mobile-first cooking companion app to help you discover, plan, and cook delicious meals",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CookPal",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${inter.variable} min-h-screen bg-gray-100 font-sans text-foreground antialiased`}
      >
        <div className="mx-auto min-h-screen max-w-md bg-background shadow-xl">
          <div className="flex min-h-screen flex-col">{children}</div>
        </div>
      </body>
    </html>
  );
}
