"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextValue {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;
  setAuth: (accessToken: string, user: User) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const refreshRes = await fetch("/api/auth/refresh", { method: "POST" });
        if (!refreshRes.ok) return;

        const { accessToken: newToken } = await refreshRes.json();

        const meRes = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${newToken}` },
        });
        if (!meRes.ok) return;

        const userData = await meRes.json();
        setAccessToken(newToken);
        setUser(userData);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  function setAuth(token: string, user: User) {
    setAccessToken(token);
    setUser(user);
  }

  function clearAuth() {
    setAccessToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ accessToken, user, isLoading, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
