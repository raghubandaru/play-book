import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/services/auth-service/middleware";
import { saveFile } from "@/services/file-service/service";

export async function POST(req: NextRequest) {
  try {
    const userId = requireAuth(req);
    const body = await req.json();
    const result = await saveFile(userId, body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
