import { getFiles } from "@/services/fileService";

export async function GET() {
  try {
    const files = await getFiles();
    return Response.json(files);
  } catch (err) {
    return Response.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}
