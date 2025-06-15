"use client";

import { useThemeContext } from "@/Providers/ThemeContext"; // Hook personalizado para acessar o tema atual
import Image from "next/image";

const HomeBanner = () => {
  // Obtém o tema atual ('light' ou 'dark') do ThemeContext
  const { theme } = useThemeContext();

  // Caminhos para as imagens do banner com base no tema
  const lightImage = "/banner/summer-light.png";
  const darkImage = "/banner/summer-dark.png";

  return (
    <div
      className="
        relative
        text-white
        dark:text-[#1f2937]
        mb-8
        rounded-xl
        shadow-md
        transition-all
      "
      style={{
        // Essas cores vêm das variáveis CSS definidas por data-theme
        background: "var(--foreground)", // cor de fundo dinâmica (inverte entre claro e escuro)
        color: "var(--surface)", // cor do texto dinâmica
      }}
    >
      <div
        className="
          mx-auto
          px-8
          py-16
          flex
          flex-col gap-4
          md:flex-row
          items-center
          justify-evenly
        "
      >
        {/* Texto do banner */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Summer Sale
          </h1>
          <p className="mt-4 text-lg">Enjoy discounts on selected items</p>
          <p className="text-2xl font-semibold mt-2 text-blue-300 dark:text-blue-600">
            Get 50% off
          </p>
        </div>

        {/* Imagem do banner adaptada ao tema */}
        <div className="w-full md:w-1/3 flex justify-center items-center">
          <div className="relative h-[160px] w-[260px] md:h-[200px] md:w-[320px]">
            <Image
              src={theme === "dark" ? darkImage : lightImage}
              alt="Summer promo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
