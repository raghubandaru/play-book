import { redirect } from "next/navigation";
import { getSessionUserId } from "@/services/auth-service/server";
import { UploadForm } from "./upload-form";

export default async function Upload() {
  const userId = await getSessionUserId();

  if (!userId) redirect("/auth/login");

  return <UploadForm />;
}
