import dbPromise from "@/lib/mongoose";
import { File } from "@/models/File";

export type FileDoc = {
  userId: string;
  key: string;
  url: string;
  filename: string;
  size: number;
  createdAt: Date;
};

export async function findFiles(userId: string, limit = 50) {
  await dbPromise;

  return File.find({ userId }).sort({ createdAt: -1 }).limit(limit).lean();
}

export async function insertFile(data: Omit<FileDoc, "createdAt">) {
  await dbPromise;

  return File.create(data);
}
