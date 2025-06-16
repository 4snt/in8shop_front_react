"use client";

import { getCurrentUser, loginServer, logoutServer } from "@/app/actions/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  setCurrentUser: () => {},
  logout: async () => {},
  login: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    fetchUser();
  }, []);

  const logout = async () => {
    await logoutServer();
    setCurrentUser(null);
  };

  const login = async (email: string, password: string) => {
    await loginServer({ email, password });
    const user = await getCurrentUser();
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
