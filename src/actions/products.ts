"use server";

import { Product } from "@/types/product";

type GetProductsParams = {
  query?: string;
  provider?: string;
  category?: string;
  hasDiscount?: boolean;
  minPrice?: number;
  maxPrice?: number;
  [key: string]: string | number | boolean | undefined;
};

const buildUrlWithParams = (path: string, params?: GetProductsParams) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== "" &&
        value !== null &&
        !(typeof value === "number" && Number.isNaN(value))
      ) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
};

export async function getProducts(
  params?: GetProductsParams
): Promise<Product[]> {
  try {
    const url = buildUrlWithParams("/products", params);

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Erro HTTP:", res.status, res.statusText);
      throw new Error("Falha ao buscar os produtos");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}

export async function getProductById(
  productId: string
): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Erro HTTP:", res.status, res.statusText);
      throw new Error("Falha ao buscar o produto");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Erro ao buscar o produto ${productId}:`, error);
    return null;
  }
}
