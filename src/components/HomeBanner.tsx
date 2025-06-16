"use client";

import { useThemeContext } from "@/Providers/ThemeContext";
import { useInvertedThemeColors } from "@/utils/useInvertedThemeColors";
import Image from "next/image";

const HomeBanner = () => {
  const { theme } = useThemeContext();
  const { background, foreground } = useInvertedThemeColors();

  const lightImage = "/banner/summer-light.png";
  const darkImage = "/banner/summer-dark.png";

  return (
    <div
      className="
        relative
        mb-8
        rounded-xl
        shadow-md
        transition-all
      "
      style={{
        backgroundColor: background,
        color: foreground,
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
          <p className="text-2xl font-semibold mt-2 text-blue-400 dark:text-blue-500">
            Get 50% off
          </p>
        </div>

        {/* Imagem do banner */}
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
