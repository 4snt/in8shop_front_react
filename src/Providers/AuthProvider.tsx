"use client";

import { loginServer, logoutServer } from "@/app/actions/auth";
import { createContext, useContext, useState } from "react";

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

export const AuthProvider = ({
  children,
  currentUser: initialUser,
}: {
  children: React.ReactNode;
  currentUser: User | null;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(initialUser);

  const logout = async () => {
    await logoutServer();
    setCurrentUser(null);
  };

  const login = async (email: string, password: string) => {
    await loginServer({ email, password });
    // Não precisa de getCurrentUser porque o server já setou o cookie
    setCurrentUser({
      id: 1, // 🔥 Você pode mockar ou buscar um endpoint opcional
      name: email.split("@")[0],
      email,
    });
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
