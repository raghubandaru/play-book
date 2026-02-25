import { findFiles } from "@/repositories/fileRepository";

export async function getFiles() {
  return findFiles();
}
