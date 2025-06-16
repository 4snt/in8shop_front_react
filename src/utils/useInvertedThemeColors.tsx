import { useThemeContext } from "@/Providers/ThemeContext";

export const useInvertedThemeColors = () => {
  const { theme } = useThemeContext();

  const light = {
    background: "#ffffff",
    foreground: "#111111",
  };

  const dark = {
    background: "#111111",
    foreground: "#f3f4f6",
  };

  return theme === "light" ? dark : light;
};
