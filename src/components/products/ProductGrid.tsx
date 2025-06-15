"use client";

import { getProducts } from "@/actions/products";
import { Product } from "@/types/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FormWrap from "../FormWrap";
import FilterDrawer from "./FilterDrawer";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const PRODUCTS_PER_PAGE = 18;

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      const data = await getProducts({
        query: searchParams.get("query") || undefined,
        provider: searchParams.get("provider") || undefined,
        category: searchParams.get("category") || undefined,
        hasDiscount:
          searchParams.get("hasDiscount") === "true" ? true : undefined,
        minPrice: searchParams.get("minPrice")
          ? Number(searchParams.get("minPrice"))
          : undefined,
        maxPrice: searchParams.get("maxPrice")
          ? Number(searchParams.get("maxPrice"))
          : undefined,
      });

      if (!data.length) {
        toast.error("Nenhum produto encontrado, retornando à página inicial.");
        router.push("/");
        return;
      }

      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, [searchParams, router]);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div className="w-full flex flex-col gap-1">
      {/* 🔍 Barra de busca + Filtros */}
      <FormWrap className="p-1">
        <div className="flex gap-2 w-full">
          <SearchBar onSearch={handleSearch} defaultValue={query} />
          <FilterDrawer />
        </div>
      </FormWrap>

      {/* GRID */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          gap-6
        "
      >
        {currentProducts.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>

      {/* PAGINAÇÃO */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
