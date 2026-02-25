import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("files");

  const result = await db.collection("uploads").insertOne({
    key: body.key,
    url: body.fileUrl,
    filename: body.filename,
    size: body.size,
    createdAt: new Date(),
  });

  return NextResponse.json(result);
}
