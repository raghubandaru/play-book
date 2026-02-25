import { NextRequest, NextResponse } from "next/server";

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI!);

export async function POST(req: NextRequest) {
  const body = await req.json();

  await client.connect();

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
