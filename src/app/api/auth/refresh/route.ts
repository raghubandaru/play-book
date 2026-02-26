import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import { refreshSession } from "@/services/auth-service/service";

export async function POST() {
  try {
    const refreshToken = (await cookies()).get("refreshToken")?.value;

    if (!refreshToken) throw new Error();

    const { accessToken, refreshToken: newRefreshToken } =
      await refreshSession(refreshToken);

    (await cookies()).set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({
      accessToken,
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
