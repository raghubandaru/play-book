import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/services/auth-service/middleware";
import { getUploadUrl } from "@/services/file-service/service";

export async function POST(req: NextRequest) {
  try {
    requireAuth(req);
    const { filename, contentType } = await req.json();
    const result = await getUploadUrl(filename, contentType);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
