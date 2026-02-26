import dbPromise from "@/lib/mongoose";
import { User } from "@/models/User";
import { UserDocument } from "./types";

export async function createUser(
  email: string,
  password: string,
): Promise<UserDocument> {
  await dbPromise;

  const user = await User.create({ email, password });

  return {
    _id: user._id.toString(),
    email: user.email,
    password: user.password,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function findUserByEmail(
  email: string,
): Promise<UserDocument | null> {
  await dbPromise;

  const user = await User.findOne({ email }).lean();

  if (!user) return null;

  return {
    ...user,
    _id: user._id.toString(),
  };
}

export async function findUserById(id: string): Promise<UserDocument | null> {
  await dbPromise;

  const user = await User.findById(id).lean();

  if (!user) return null;

  return {
    ...user,
    _id: user._id.toString(),
  };
}
