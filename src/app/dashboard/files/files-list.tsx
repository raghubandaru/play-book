"use client";

import { useState, useEffect, useRef } from "react";
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  // Move focus into modal on open; restore to trigger on close
  useEffect(() => {
    if (selected) {
      closeButtonRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [selected]);

  function openModal(file: FileItem, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setSelected(file);
  }

  function closeModal() {
    setSelected(null);
  }

  function handleModalKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      closeModal();
      return;
    }
    if (e.key === "Tab" && modalRef.current) {
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  return (
    <>
      <ul className={styles.list}>
        {files.map((file) => (
          <li
            key={file.id}
            className={styles.row}
            role="button"
            tabIndex={0}
            aria-label={`Preview ${file.filename}`}
            onClick={(e) => openModal(file, e.currentTarget)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(file, e.currentTarget);
              }
            }}
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
        <div className={styles.overlay} onClick={closeModal}>
          <div
            ref={modalRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-filename"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleModalKeyDown}
          >
            <button
              ref={closeButtonRef}
              className={styles.modalClose}
              onClick={closeModal}
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
              <span id="modal-filename" className={styles.modalFilename}>
                {selected.filename}
              </span>
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
