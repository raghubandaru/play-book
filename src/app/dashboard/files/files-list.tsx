"use client";

import { useState, useEffect } from "react";
import styles from "./files-list.module.css";

export type FileItem = {
  id: string;
  filename: string;
  size: number;
  createdAt: string;
  url: string;
};

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function FilesList({ files }: { files: FileItem[] }) {
  const [selected, setSelected] = useState<FileItem | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <ul className={styles.list}>
        {files.map((file) => (
          <li
            key={file.id}
            className={styles.row}
            onClick={() => setSelected(file)}
          >
            <img
              src={file.url}
              alt=""
              className={styles.rowThumb}
              aria-hidden="true"
            />
            <span className={styles.rowName}>{file.filename}</span>
            <span className={styles.rowSize}>{formatSize(file.size)}</span>
            <span className={styles.rowDate}>{formatDate(file.createdAt)}</span>
          </li>
        ))}
      </ul>

      {selected && (
        <div
          className={styles.overlay}
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.filename}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setSelected(null)}
              aria-label="Close preview"
            >
              ×
            </button>

            <div className={styles.modalImageWrap}>
              <img
                src={selected.url}
                alt={selected.filename}
                className={styles.modalImage}
              />
            </div>

            <div className={styles.modalFooter}>
              <span className={styles.modalFilename}>{selected.filename}</span>
              <span className={styles.modalDetail}>
                {formatSize(selected.size)} · {formatDate(selected.createdAt)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
