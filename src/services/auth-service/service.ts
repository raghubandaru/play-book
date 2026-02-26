import * as userService from "@/services/user-service/service";
import * as sessionRepo from "./repository";

import { hashPassword, comparePassword } from "./hash";

import { createAccessToken, generateRefreshToken } from "./jwt";

const REFRESH_DAYS = 30;

export async function signup(email: string, password: string) {
  const existing = await userService.findUserByEmail(email);
  if (existing) throw new Error("User exists");

  const hashed = await hashPassword(password);

  const user = await userService.createUser(email, hashed);

  const { accessToken, refreshToken } = await createSession(user._id!);

  return {
    accessToken,
    refreshToken,
    user: { id: user._id!, email: user.email },
  };
}

export async function login(email: string, password: string) {
  const user = await userService.findUserByEmail(email);

  if (!user) throw new Error("Invalid credentials");

  const valid = await comparePassword(password, user.password);

  if (!valid) throw new Error("Invalid credentials");

  const { accessToken, refreshToken } = await createSession(user._id!);

  return {
    accessToken,
    refreshToken,
    user: { id: user._id!, email: user.email },
  };
}

async function createSession(userId: string) {
  const accessToken = createAccessToken(userId);

  const refreshToken = generateRefreshToken();

  const expires = new Date();

  expires.setDate(expires.getDate() + REFRESH_DAYS);

  await sessionRepo.createSession(userId, refreshToken, expires);

  return {
    accessToken,
    refreshToken,
  };
}

export async function refreshSession(oldRefreshToken: string) {
  const session = await sessionRepo.findSession(oldRefreshToken);

  if (!session) throw new Error("Invalid session");

  if (new Date(session.expiresAt) < new Date()) throw new Error("Expired");

  const userId = session.userId.toString();

  // rotation
  await sessionRepo.deleteSession(oldRefreshToken);

  const newRefreshToken = generateRefreshToken();

  const expires = new Date();

  expires.setDate(expires.getDate() + REFRESH_DAYS);

  await sessionRepo.createSession(userId, newRefreshToken, expires);

  const accessToken = createAccessToken(userId);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
}

export async function logout(refreshToken: string) {
  await sessionRepo.deleteSession(refreshToken);
}
