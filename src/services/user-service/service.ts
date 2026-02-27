import * as userRepo from "./repository";
import { deleteUserFiles } from "@/services/file-service/service";
import { deleteSessionsByUserId } from "@/services/auth-service/repository";

export async function getUser(userId: string) {
  const user = await userRepo.findUserById(userId);

  if (!user) throw new Error("Not found");

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
}

export async function findUserByEmail(email: string) {
  return userRepo.findUserByEmail(email);
}

export async function createUser(
  name: string,
  email: string,
  hashedPassword: string,
) {
  return userRepo.createUser(name, email, hashedPassword);
}

export async function deleteUser(userId: string) {
  // Best-effort cleanup: failures are logged but do not abort the deletion.
  // S3 objects are inaccessible without a valid presigned URL once the user
  // is gone; sessions have a TTL index and expire on their own.
  try {
    await deleteUserFiles(userId);
  } catch (e) {
    console.error(`[deleteUser] Failed to delete files for user ${userId}:`, e);
  }

  try {
    await deleteSessionsByUserId(userId);
  } catch (e) {
    console.error(`[deleteUser] Failed to delete sessions for user ${userId}:`, e);
  }

  // Critical step — if this throws the API returns 500 and the user is NOT
  // deleted, leaving the account intact and safe to retry.
  await userRepo.deleteUserById(userId);
}
