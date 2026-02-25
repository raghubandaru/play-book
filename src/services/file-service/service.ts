import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";
import s3 from "@/lib/s3";
import { findFiles, insertFile } from "./repository";

export async function getFiles() {
  const files = await findFiles();
  return Promise.all(
    files.map(async (file) => {
      const url = await getSignedUrl(
        s3,
        new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: file.key }),
        { expiresIn: 3600 },
      );
      return { ...file, url };
    }),
  );
}

export async function getUploadUrl(filename: string, contentType: string) {
  const key = `${uuid()}-${filename}`;
  const uploadUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: 60 },
  );
  const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  return { uploadUrl, fileUrl, key };
}

export async function saveFile(data: {
  key: string;
  fileUrl: string;
  filename: string;
  size: number;
}) {
  return insertFile({
    key: data.key,
    url: data.fileUrl,
    filename: data.filename,
    size: data.size,
  });
}
