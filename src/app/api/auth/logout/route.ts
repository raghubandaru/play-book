import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import { logout } from "@/services/auth-service/service";

export async function POST() {
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  if (refreshToken) await logout(refreshToken);

  (await cookies()).delete("refreshToken");

  return NextResponse.json({
    success: true,
  });
}
