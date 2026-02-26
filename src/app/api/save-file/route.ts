import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/services/auth-service/server";
import { saveFile } from "@/services/file-service/service";

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const result = await saveFile(userId, body);
  return NextResponse.json(result);
}
