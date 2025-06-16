"use client";

import { Product } from "@/types/product";
import { SearchParams } from "@/types/SearchParams";
import { SearchParamsParser } from "@/utils/SearchParamsParser";
import { usePathname, useRouter } from "next/navigation";
import FormWrap from "../FormWrap";
import FilterDrawer from "./FilterDrawer";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";

interface ProductGridProps {
  searchParams?: SearchParams;
  products: Product[];
}

export default function ProductGrid({
  searchParams,
  products,
}: ProductGridProps) {
  const router = useRouter();
  const pathname = usePathname();

  const parser = new SearchParamsParser(searchParams ?? {});

  const query = parser.getString("query");
  const currentPage = parser.getNumber("page", 1);

  const PRODUCTS_PER_PAGE = 18;

  const convertToUrlSearchParams = (params: {
    [key: string]: string | string[] | undefined;
  }) => {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => urlParams.append(key, v));
      } else if (value !== undefined) {
        urlParams.set(key, value);
      }
    });
    return urlParams;
  };

  const handleSearch = (value: string) => {
    const params = convertToUrlSearchParams(searchParams ?? {});
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = convertToUrlSearchParams(searchParams ?? {});
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="w-full flex flex-col gap-1">
      {/* 🔍 Barra de busca + Filtros */}
      <FormWrap className="p-1">
        <div className="flex gap-2 w-full">
          <SearchBar onSearch={handleSearch} defaultValue={query} />
          <FilterDrawer searchParams={searchParams ?? {}} />
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
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))
        ) : (
          <p className="text-center col-span-full">
            Nenhum produto encontrado.
          </p>
        )}
      </div>

      {/* PAGINAÇÃO */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
