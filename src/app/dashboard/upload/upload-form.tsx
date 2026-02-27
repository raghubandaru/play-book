"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form } from "@ds";
import { MAX_FILE_SIZE } from "@/lib/schemas/upload";
import styles from "./upload-form.module.css";

type Status = "idle" | "preview" | "uploading";

export function UploadForm() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function handleFile(f: File) {
    if (f.size > MAX_FILE_SIZE) {
      setError("File size must be 5 MB or less.");
      return;
    }
    setError(null);
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
    setStatus("preview");
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave() {
    setIsDragOver(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  }

  function handleClear() {
    setFile(null);
    setPreview(null);
    setStatus("idle");
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!file) return;
    setStatus("uploading");

    const res = await fetch("/api/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, contentType: file.type, size: file.size }),
    });

    if (!res.ok) {
      const { error: msg } = await res.json();
      setError(msg ?? "Upload failed.");
      setStatus("preview");
      return;
    }

    const { uploadUrl, fileUrl, key } = await res.json();

    await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    await fetch("/api/save-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key,
        fileUrl,
        filename: file.name,
        size: file.size,
      }),
    });

    router.push("/dashboard/files");
  }

  if (status === "uploading") {
    return (
      <div className={styles.container}>
        <div className={styles.uploading}>
          <p>Uploading…</p>
        </div>
      </div>
    );
  }

  return (
    <Form className={styles.container} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}

      <div
        className={`${styles.dropzone} ${isDragOver ? styles.active : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className={styles.hiddenInput}
          onChange={handleInputChange}
        />
        {preview ? (
          <img src={preview} alt="Preview" className={styles.previewImage} />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.uploadIcon}>↑</span>
            <p>Drag &amp; drop a file here, or click to browse</p>
          </div>
        )}
      </div>

      {file && (
        <div className={styles.meta}>
          <span className={styles.filename}>{file.name}</span>
          <span className={styles.size}>
            {(file.size / 1024).toFixed(1)} KB
          </span>
        </div>
      )}

      {file && (
        <div className={styles.actions}>
          <Button type="submit">Upload</Button>
          <Button type="button" variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      )}
    </Form>
  );
}
