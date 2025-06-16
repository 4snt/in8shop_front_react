export const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  const isLocal =
    typeof window === "undefined" &&
    (process.env.NODE_ENV === "development" ||
      process.env.HOST?.includes("localhost"));

  return isLocal
    ? "http://localhost:8080/api"
    : "https://backend-in8-nest-production.up.railway.app/api";
};
