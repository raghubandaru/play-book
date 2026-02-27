import { redirect } from "next/navigation";
import { getSessionUserId } from "@/services/auth-service/server";
import { getUser } from "@/services/user-service/service";

export default async function Profile() {
  const userId = await getSessionUserId();

  if (!userId) redirect("/auth/login");

  const user = await getUser(userId);

  return user.email;
}
