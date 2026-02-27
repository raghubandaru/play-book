"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login, logout, signup } from "@/services/auth-service/service";
import { loginSchema, signupSchema, fieldErrors } from "@/lib/schemas/auth";
import type { ActionState } from "@/lib/action-state";

export async function loginAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = loginSchema.safeParse(raw);
  if (!result.success) return { errors: fieldErrors(result.error) };

  try {
    const { refreshToken } = await login(
      result.data.email,
      result.data.password,
    );

    (await cookies()).set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  } catch (e) {
    return {
      errors: {
        general: e instanceof Error ? e.message : "Something went wrong",
      },
    };
  }

  redirect("/user/profile");
}

export async function signupAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = signupSchema.safeParse(raw);
  if (!result.success) return { errors: fieldErrors(result.error) };

  try {
    const { refreshToken } = await signup(
      result.data.name,
      result.data.email,
      result.data.password,
    );

    (await cookies()).set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  } catch (e) {
    return {
      errors: {
        general: e instanceof Error ? e.message : "Something went wrong",
      },
    };
  }

  redirect("/user/profile");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) await logout(refreshToken);

  cookieStore.delete("refreshToken");

  redirect("/auth/login");
}
