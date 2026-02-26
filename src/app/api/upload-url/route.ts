import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/services/auth-service/server";
import { getUploadUrl } from "@/services/file-service/service";

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { filename, contentType } = await req.json();
  const result = await getUploadUrl(filename, contentType);
  return NextResponse.json(result);
}
