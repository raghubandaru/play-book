import { z } from "zod";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const uploadRequestSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  contentType: z.string().min(1, "Content type is required"),
  size: z.number().max(MAX_FILE_SIZE, "File size must be 5 MB or less"),
});
