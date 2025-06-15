"use client";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Registro no client
export async function registerUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
  });

  return res.data;
}

// ✅ Login no client → token vai para localStorage
export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });

  const { token } = res.data;

  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }

  return token;
}

// ✅ Obter usuário no client a partir do token no localStorage
export async function getCurrentUserClient() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) return null;

  try {
    const res = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Erro ao buscar usuário (client):", error);
    return null;
  }
}

// ✅ Logout client → remove token do localStorage
export function logoutClient() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}
