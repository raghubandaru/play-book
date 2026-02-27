import "@/styles/globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { getSessionUserId } from "@/services/auth-service/server";
import { Navbar } from "@ds";
import LogoutButton from "@/features/components/LogoutButton/LogoutButton";
import styles from "./layout.module.css";

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
              <Link href="/file/upload">Upload</Link>
              <Link href="/file/list">Files</Link>
              <Link href="/user/profile">Profile</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/auth/signup">Sign up</Link>
              <Link href="/auth/login">Login</Link>
            </>
          )}
        </Navbar>
        <main className={styles.container}>{children}</main>
      </body>
    </html>
  );
}
