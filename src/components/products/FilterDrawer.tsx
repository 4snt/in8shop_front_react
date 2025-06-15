"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdFilterList } from "react-icons/md";
import Button from "../Button";

const FilterDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams);

  const [provider, setProvider] = useState(currentParams.get("provider") || "");
  const [category, setCategory] = useState(currentParams.get("category") || "");
  const [hasDiscount, setHasDiscount] = useState(
    currentParams.get("hasDiscount") === "true"
  );
  const [minPrice, setMinPrice] = useState(currentParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(currentParams.get("maxPrice") || "");

  const applyFilters = () => {
    const params = new URLSearchParams(currentParams);

    if (provider) {
      params.set("provider", provider);
    } else {
      params.delete("provider");
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    if (hasDiscount) {
      params.set("hasDiscount", "true");
    } else {
      params.delete("hasDiscount");
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    params.set("page", "1"); // 🔥 Sempre volta pra página 1

    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(currentParams);
    [
      "provider",
      "category",
      "hasDiscount",
      "minPrice",
      "maxPrice",
    ].forEach((key) => params.delete(key));
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);

    setProvider("");
    setCategory("");
    setHasDiscount(false);
    setMinPrice("");
    setMaxPrice("");
    setIsOpen(false);
  };

  return (
    <>
      <Button
        label="Filtrar"
        icon={MdFilterList}
        onClick={() => setIsOpen(true)}
        outline
        small
        custom="w-auto"
      />

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-[var(--background)] text-[var(--foreground)] w-[300px] sm:w-[400px] h-full shadow-lg flex flex-col p-6 gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl hover:opacity-70"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-sm">Fornecedor</label>
              <select
                className="w-full border rounded p-2 mt-1 bg-[var(--surface)] border-[var(--border)]"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="br">Brasil</option>
                <option value="eu">Europa</option>
              </select>
            </div>

            <div>
              <label className="text-sm">Categoria</label>
              <input
                className="w-full border rounded p-2 mt-1 bg-[var(--surface)] border-[var(--border)]"
                placeholder="Ex: roupas, eletrônicos"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={hasDiscount}
                onChange={(e) => setHasDiscount(e.target.checked)}
              />
              <label>Somente com desconto</label>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full border rounded p-2 bg-[var(--surface)] border-[var(--border)]"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full border rounded p-2 bg-[var(--surface)] border-[var(--border)]"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div className="mt-auto flex flex-col gap-2">
              <Button label="Aplicar" onClick={applyFilters} />
              <Button label="Limpar Filtros" onClick={clearFilters} outline />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterDrawer;
