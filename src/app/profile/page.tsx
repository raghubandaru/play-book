import { redirect } from "next/navigation";
import { getSessionUserId } from "@/services/auth-service/server";
import { getUser } from "@/services/user-service/service";

export default async function Profile() {
  const userId = await getSessionUserId();

  if (!userId) redirect("/auth/login");

  const user = await getUser(userId);

  return (
    <div>
      <h2>{user.name}</h2>
      <i>{user.email}</i>
    </div>
  );
}
