"use server";

import type { OrderDto } from "@/types/order";
import { cookies } from "next/headers";

export async function getMyOrders(): Promise<OrderDto[]> {
  const token = cookies().get("token")?.value;
  if (!token) throw new Error("Usuário não autenticado");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(errBody?.message || `Status ${res.status}`);
  }

  // já vem no formato do DTO definido em src/types/order.ts
  const orders = (await res.json()) as OrderDto[];
  return orders;
}
