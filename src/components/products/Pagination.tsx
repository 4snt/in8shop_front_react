"use client";

import { useEffect, useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const renderPageNumbers = () => {
    const pages = [];

    const maxPagesToShow = isMobile ? 3 : 7;
    const half = Math.floor(maxPagesToShow / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (end - start + 1 < maxPagesToShow) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxPagesToShow - 1);
      } else if (end === totalPages) {
        start = Math.max(1, end - maxPagesToShow + 1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded border transition ${
            i === currentPage
              ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--border)]"
              : "bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)] hover:opacity-80"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded border transition ${
          currentPage === 1
            ? "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)] cursor-not-allowed"
            : "bg-[var(--foreground)] text-[var(--background)] border-[var(--border)] hover:opacity-90"
        }`}
      >
        Anterior
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded border transition ${
          currentPage === totalPages
            ? "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)] cursor-not-allowed"
            : "bg-[var(--foreground)] text-[var(--background)] border-[var(--border)] hover:opacity-90"
        }`}
      >
        Próxima
      </button>
    </div>
  );
};

export default Pagination;
