"use client";

import { useAuth } from "@/context/auth";
import { logoutAction } from "@/actions/auth";

export function LogoutButton() {
  const { clearAuth } = useAuth();

  async function handleLogout() {
    clearAuth();
    await logoutAction();
  }

  return <button onClick={handleLogout}>Logout</button>;
}
