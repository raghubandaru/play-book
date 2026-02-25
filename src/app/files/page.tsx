import { getFiles } from "@/services/file-service/service";

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

// "use client";

// import { useEffect, useState } from "react";

// type FileType = {
//   _id: string;

//   url: string;

//   filename: string;

//   createdAt: string;
// };

// export default function FilesPage() {
//   const [files, setFiles] = useState<FileType[]>([]);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/files")
//       .then((res) => res.json())

//       .then((data) => {
//         setFiles(data);

//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Uploaded Files</h2>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, 200px)",
//           gap: "20px",
//         }}
//       >
//         {files.map((file) => (
//           <div key={file._id}>
//             <img src={file.url} width={200} />

//             <p>{file.filename}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
