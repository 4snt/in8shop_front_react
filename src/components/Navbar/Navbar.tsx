"use client";

import { useThemeContext } from "@/Providers/ThemeContext";
import { useCartDrawer } from "@/hooks/useCartDrawer";
import { Menu, X } from "lucide-react"; // Ícones
import { Noto_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FloatingCartDrawer from "../Cart/FloatingCartDrawer";
import Container from "../Container";
import FilterDrawer from "../products/FilterDrawer";
import SearchBar from "../products/SearchBar";
import CartCount from "./CartCount";
import ThemeSwitch from "./ThemeSwitch";
import UserMenu from "./UserMenu";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "700"],
});

const NavBar = () => {
  const { theme } = useThemeContext();
  const [mounted, setMounted] = useState(false);
  const { isOpen, closeDrawer } = useCartDrawer();
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
    setMenuOpen(false); // Fecha o menu ao buscar
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    theme === "dark" ? "/logo-square-dark.png" : "/logo-square-light.png";

  return (
    <>
      <div
        className="sticky top-0 w-full z-30 shadow-sm"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          borderColor: "var(--border)",
        }}
      >
        <div className="py-4 border-b border-[var(--border)]">
          <Container>
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                {mounted && (
                  <Image
                    src={logoSrc}
                    alt="AcheiShop Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                    priority
                  />
                )}
                <span className={`${notoSans.className} text-xl font-semibold`}>
                  achei<span className="text-primary">shop!</span>
                </span>
              </Link>

              {/* 🔍 Barra de busca em desktop */}
              <div className="hidden md:flex flex-1 max-w-lg">
                <div>
                  <div className="flex gap-2 w-full">
                    <SearchBar onSearch={handleSearch} defaultValue={query} />
                    <FilterDrawer />
                  </div>
                </div>
              </div>

              {/* Ícones */}
              <div className="flex items-center gap-5">
                <CartCount />
                <ThemeSwitch />
                <UserMenu />

                {/* Menu Hambúrguer no mobile */}
                <button
                  className="md:hidden"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </Container>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden px-4 pt-4 pb-6 flex flex-col gap-4 border-t border-[var(--border)]">
              <SearchBar onSearch={handleSearch} defaultValue={query} />
              <Link
                href="/"
                className="text-sm hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                href="/"
                className="text-sm hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Produtos
              </Link>
            </div>
          )}
        </div>
      </div>

      <FloatingCartDrawer isOpen={isOpen} onClose={closeDrawer} />
    </>
  );
};

export default NavBar;
