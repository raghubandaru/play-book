import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signup } from "@/services/auth-service/service";
import { signupSchema } from "@/lib/schemas/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const result = signupSchema.safeParse(body);

  if (!result.success) {
    const message = result.error.issues[0]?.message ?? "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    const { name, email, password } = result.data;
    const { accessToken, refreshToken, user } = await signup(name, email, password);

    (await cookies()).set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ accessToken, user });
  } catch (e: unknown) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
