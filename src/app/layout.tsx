import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getSessionUserId } from "@/services/auth-service/server";
import { LogoutButton } from "@/components/logout-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Play book",
  description: "Based on Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getSessionUserId();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          {userId ? (
            <>
              <Link href="/upload">Upload</Link>
              <Link href="/files">Files</Link>
              <Link href="/me">Me</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/signup">Sign up</Link>
              <Link href="/login">Login</Link>
            </>
          )}
        </nav>
        {children}
      </body>
    </html>
  );
}
