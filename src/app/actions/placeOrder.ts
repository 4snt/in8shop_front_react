"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export const placeOrder = async ({
  userId,
  amount,
  currency,
  products,
  address,
}: {
  userId: number;
  amount: number;
  currency: string;
  products: { name: string; quantity: number; price: number }[];
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const paymentIntentId = uuidv4();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔥 Token JWT no header
      },
      body: JSON.stringify({
        userId,
        amount,
        currency,
        paymentIntentId,
        products,
        address,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erro ao criar pedido");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    throw error;
  }
};
