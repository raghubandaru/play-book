import { NextRequest, NextResponse } from "next/server";
import { saveFile } from "@/services/file-service/service";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await saveFile(body);
  return NextResponse.json(result);
}
