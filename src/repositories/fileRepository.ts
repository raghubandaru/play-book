import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import clientPromise from "@/lib/mongodb";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_RES!,
    secretAccessKey: process.env.AWS_SECRET_KEY_RES!,
  },
});

type FileDoc = {
  key: string;
  url: string;
  filename: string;
  size: number;
  createdAt: Date;
};

export async function findFiles(limit = 50) {
  const client = await clientPromise;
  const db = client.db("files");

  const files = await db
    .collection<FileDoc>("uploads")
    .find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return Promise.all(
    files.map(async (file) => {
      const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: file.key,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      return { ...file, url };
    }),
  );
}
