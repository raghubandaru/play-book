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

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("files");

    const files = await db
      .collection("uploads")
      .find({})
      .sort({
        createdAt: -1,
      })
      .limit(50)
      .toArray();

    const filesWithSignedUrls = await Promise.all(
      files.map(async (file) => {
        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: file.key,
        });
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
        return { ...file, url: signedUrl };
      }),
    );

    return Response.json(filesWithSignedUrls);
  } catch (err) {
    return Response.json(
      {
        error: "Failed to fetch files",
      },
      { status: 500 },
    );
  }
}
