import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// Load Mona Sans font
const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  display: "swap",
});

// App metadata
export const metadata: Metadata = {
  title: {
    default: "DebateAI",
    template: "%s | DebateAI",
  },
  description: "An AI-powered debate platform where ideas meet intelligence.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.variable} antialiased min-h-screen bg-gray-950 text-gray-100 pattern`}
      >
        {/* Global Wrapper */}
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>

        {/* Notifications */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
