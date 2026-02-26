"use client";

import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/hooks/use-require-auth";

export default function Upload() {
  const router = useRouter();
  const { accessToken, isLoading } = useRequireAuth();

  async function upload(file: File) {
    //
    // step 1: get presigned url
    //

    const res = await fetch("/api/upload-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
      }),
    });

    const { uploadUrl, fileUrl, key } = await res.json();

    //
    // step 2: upload directly to s3
    //

    await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    //
    // step 3: notify backend
    //

    await fetch("/api/save-file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        key,
        fileUrl,
        filename: file.name,
        size: file.size,
      }),
    });

    router.push("/files");
  }

  if (isLoading) return null;

  return <input type="file" onChange={(e) => upload(e.target.files![0])} />;
}
