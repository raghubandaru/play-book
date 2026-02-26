"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "@/services/auth-service/service";

export async function logoutAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) await logout(refreshToken);

  cookieStore.delete("refreshToken");

  redirect("/login");
}
