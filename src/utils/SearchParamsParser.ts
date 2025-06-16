export class SearchParamsParser {
  private params: { [key: string]: string | string[] | undefined };

  constructor(searchParams: { [key: string]: string | string[] | undefined }) {
    this.params = searchParams;
  }

  getString(key: string, fallback = ""): string {
    const value = this.params[key];

    if (Array.isArray(value)) return value[0] || fallback;
    if (typeof value === "string" && value.trim() !== "") return value;
    return fallback;
  }

  getNumber(key: string, fallback = 0): number {
    const value = this.getString(key);
    if (value === "") return fallback;

    const parsed = Number(value);
    return isNaN(parsed) ? fallback : parsed;
  }

  getInt(key: string, fallback = 0): number {
    const value = this.getString(key);
    if (value === "") return fallback;

    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
  }

  getFloat(key: string, fallback = 0): number {
    const value = this.getString(key);
    if (value === "") return fallback;

    const parsed = parseFloat(value);
    return isNaN(parsed) ? fallback : parsed;
  }

  getBoolean(key: string, fallback = false): boolean {
    const value = this.getString(key).toLowerCase();

    if (value === "true") return true;
    if (value === "false") return false;
    return fallback;
  }

  getArray(key: string): string[] {
    const value = this.params[key];
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.trim() !== "") return [value];
    return [];
  }

  getEnum<T extends string>(key: string, allowed: T[], fallback: T): T {
    const value = this.getString(key);
    return allowed.includes(value as T) ? (value as T) : fallback;
  }
}
