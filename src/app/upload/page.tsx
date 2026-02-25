"use client";

import { useState } from "react";

export default function Upload() {
  const [progress, setProgress] = useState(0);

  async function upload(file: File) {
    //
    // step 1: get presigned url
    //

    const res = await fetch("/api/upload-url", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
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
      },

      body: JSON.stringify({
        key,

        fileUrl,

        filename: file.name,

        size: file.size,
      }),
    });

    alert("Upload complete");
  }

  return <input type="file" onChange={(e) => upload(e.target.files![0])} />;
}
