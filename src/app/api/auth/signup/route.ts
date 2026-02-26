import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signup } from "@/services/auth-service/service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { accessToken, refreshToken, user } = await signup(
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
  } catch (e: unknown) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
