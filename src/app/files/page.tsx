import { redirect } from "next/navigation";
import { getSessionUserId } from "@/services/auth-service/server";
import { getFiles } from "@/services/file-service/service";

export const dynamic = "force-dynamic";

export default async function FilesList() {
  const userId = await getSessionUserId();

  if (!userId) redirect("/login");

  const files = await getFiles(userId);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 200px)",
        gap: "20px",
      }}
    >
      {files.map((file) => {
        return (
          <img
            key={file._id.toString()}
            src={file.url}
            alt={file.filename}
            width={200}
          />
        );
      })}
    </div>
  );
}
