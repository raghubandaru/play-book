import * as userRepo from "./repository";

export async function getUser(userId: string) {
  const user = await userRepo.findUserById(userId);

  if (!user) throw new Error("Not found");

  return {
    id: user._id,
    email: user.email,
  };
}

export async function findUserByEmail(email: string) {
  return userRepo.findUserByEmail(email);
}

export async function createUser(email: string, hashedPassword: string) {
  return userRepo.createUser(email, hashedPassword);
}
