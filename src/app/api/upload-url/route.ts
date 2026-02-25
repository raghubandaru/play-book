import { NextRequest, NextResponse } from "next/server";
import { getUploadUrl } from "@/services/file-service/service";

export async function POST(req: NextRequest) {
  const { filename, contentType } = await req.json();
  const result = await getUploadUrl(filename, contentType);
  return NextResponse.json(result);
}
