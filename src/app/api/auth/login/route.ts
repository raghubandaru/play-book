import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { login } from "@/services/auth-service/service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { accessToken, refreshToken, user } = await login(
      body.email,
      body.password,
    );

    (await cookies()).set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({
      accessToken,
      user,
    });
  } catch {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
