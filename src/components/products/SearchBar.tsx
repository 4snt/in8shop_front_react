"use client";

import { ReactNode, useState } from "react";

interface SearchBarProps {
  onSearch: (value: string) => void;
  defaultValue?: string;
  children?: ReactNode; // 🔥 Slot para botão de filtro
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  defaultValue,
  children,
}) => {
  const [value, setValue] = useState(defaultValue || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full gap-2 sm:gap-3 items-center"
      aria-label="Barra de busca"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar produtos..."
        className="
          flex-1
          rounded-md
          px-4
          py-2
          bg-[var(--background)]
          text-[var(--foreground)]
          border
          border-[var(--border)]
          focus:outline-none
          focus:ring-2
          focus:ring-[var(--foreground)]
          transition
        "
      />
      <button
        type="submit"
        className="
          px-4
          py-2
          rounded-md
          bg-[var(--foreground)]
          text-[var(--background)]
          hover:opacity-90
          active:scale-[0.98]
          border
          border-[var(--border)]
          transition
        "
      >
        Buscar
      </button>
      {children}
    </form>
  );
};

export default SearchBar;
