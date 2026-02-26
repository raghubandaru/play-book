import { redirect } from "next/navigation";
import { getSessionUserId } from "@/services/auth-service/server";
import { getUser } from "@/services/user-service/service";

export default async function Me() {
  const userId = await getSessionUserId();

  if (!userId) redirect("/login");

  const user = await getUser(userId);

  return user.email;
}
