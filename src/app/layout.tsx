import "@/styles/globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { getSessionUserId } from "@/services/auth-service/server";
import Navbar from "@/components/molecules/Navbar/Navbar";
import LogoutButton from "@/features/components/LogoutButton/LogoutButton";

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
      <body>
        <Navbar>
          {userId ? (
            <>
              <Link href="/dashboard/upload">Upload</Link>
              <Link href="/dashboard/files">Files</Link>
              <Link href="/profile">Profile</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/auth/signup">Sign up</Link>
              <Link href="/auth/login">Login</Link>
            </>
          )}
        </Navbar>
        {children}
      </body>
    </html>
  );
}
