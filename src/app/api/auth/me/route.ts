import { NextResponse } from "next/server";
import { requireAuth } from "@/services/auth-service/middleware";
import { getUser } from "@/services/user-service/service";

export async function GET(request: Request) {
  try {
    const userId = requireAuth(request);

    const user = await getUser(userId);

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
