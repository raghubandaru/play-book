import { getFiles } from "@/services/file-service/service";

export const dynamic = "force-dynamic";

export default async function FilesList() {
  const files = await getFiles();

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
