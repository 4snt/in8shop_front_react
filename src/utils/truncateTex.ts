export const truncateText = (str?: string) => {
  if (!str) return ""; // Se for undefined ou null retorna vazio
  if (str.length < 25) return str;
  return str.substring(0, 25) + "...";
};
