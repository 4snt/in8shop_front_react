"use client";

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
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Erro ao registrar");
  }

  return await res.json();
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Erro ao fazer login");
  }

  return await res.json();
}

export async function getCurrentUserClient() {
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar usuário (client):", error);
    return null;
  }
}
export async function logoutClient() {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
