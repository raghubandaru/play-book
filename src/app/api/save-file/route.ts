import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { saveFile } from "@/services/file-service/service";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await saveFile(body);
  revalidatePath("/files");
  return NextResponse.json(result);
}
