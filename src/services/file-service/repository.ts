import { WithId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export type FileDoc = {
  key: string;
  url: string;
  filename: string;
  size: number;
  createdAt: Date;
};

export async function findFiles(limit = 50): Promise<WithId<FileDoc>[]> {
  const client = await clientPromise;
  return client
    .db("files")
    .collection<FileDoc>("uploads")
    .find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
}

export async function insertFile(data: Omit<FileDoc, "createdAt">) {
  const client = await clientPromise;
  return client
    .db("files")
    .collection<FileDoc>("uploads")
    .insertOne({ ...data, createdAt: new Date() });
}
