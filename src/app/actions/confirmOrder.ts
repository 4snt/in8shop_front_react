"use server";

import { cookies } from "next/headers";

export async function confirmOrder(orderId: string) {
  const token = cookies().get("token")?.value;
  if (!token) throw new Error("Usuário não autenticado");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/payment`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? `Erro ao confirmar (status ${res.status})`);
  }
}
