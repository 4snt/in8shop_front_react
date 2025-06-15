"use client";

import { useThemeContext } from "@/Providers/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useThemeContext();

  // Aplica o tema inicial no <html data-theme="">
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.dataset.theme = newTheme;
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle Theme"
      className={`
        relative w-16 h-8 rounded-full border border-current overflow-hidden
        bg-[var(--background)] text-[var(--foreground)] transition-colors
        flex items-center justify-center
      `}
    >
      {/* Bolinha por trás dos ícones */}
      <span
        className={`
          absolute top-0 left-0 h-full w-1/2 rounded-full transition-all duration-300
          ${
            theme === "dark"
              ? "translate-x-full bg-white"
              : "translate-x-0 bg-black"
          }
          z-0
        `}
      />

      {/* Ícones sempre visíveis e por cima */}
      <div className="absolute inset-0 flex items-center justify-between px-2 z-10">
        <Sun size={16} className="text-yellow-400" />
        <Moon size={16} className="text-purple-400" />
      </div>
    </button>
  );
};

export default ThemeSwitch;
