import { cookies } from "next/headers";
import { findSession } from "./repository";

export async function getSessionUserId(): Promise<string | null> {
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  if (!refreshToken) return null;

  const session = await findSession(refreshToken);

  if (!session) return null;

  if (new Date(session.expiresAt) < new Date()) return null;

  return session.userId.toString();
}
