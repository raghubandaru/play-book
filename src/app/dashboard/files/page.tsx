import { redirect } from "next/navigation";
import { getSessionUserId } from "@/services/auth-service/server";
import { getFiles } from "@/services/file-service/service";
import { FilesList, type FileItem } from "./files-list";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function FilesPage() {
  const userId = await getSessionUserId();

  if (!userId) redirect("/auth/login");

  const rawFiles = await getFiles(userId);

  if (rawFiles.length === 0) {
    return <p className={styles.empty}>No files yet. Upload one!</p>;
  }

  const files: FileItem[] = rawFiles.map((f) => ({
    id: f._id.toString(),
    filename: f.filename,
    size: f.size,
    createdAt: f.createdAt.toISOString(),
    url: f.url,
  }));

  return <FilesList files={files} />;
}
