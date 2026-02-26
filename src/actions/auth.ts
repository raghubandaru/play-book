"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login, logout, signup } from "@/services/auth-service/service";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { refreshToken } = await login(email, password);

  (await cookies()).set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  redirect("/me");
}

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { refreshToken } = await signup(email, password);

  (await cookies()).set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  redirect("/me");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) await logout(refreshToken);

  cookieStore.delete("refreshToken");

  redirect("/login");
}
