export class SearchParamsParser {
  private params: { [key: string]: string | string[] | undefined };

  constructor(searchParams: { [key: string]: string | string[] | undefined }) {
    this.params = searchParams;
  }

  getString(key: string, fallback = ""): string {
    const value = this.params[key];
    return typeof value === "string" ? value : fallback;
  }

  getNumber(key: string, fallback = 0): number {
    const value = this.getString(key);
    const parsed = Number(value);
    return isNaN(parsed) ? fallback : parsed;
  }

  getInt(key: string, fallback = 0): number {
    const parsed = parseInt(this.getString(key), 10);
    return isNaN(parsed) ? fallback : parsed;
  }

  getFloat(key: string, fallback = 0): number {
    const parsed = parseFloat(this.getString(key));
    return isNaN(parsed) ? fallback : parsed;
  }

  getBoolean(key: string, fallback = false): boolean {
    const value = this.getString(key);
    if (value === "true") return true;
    if (value === "false") return false;
    return fallback;
  }

  getArray(key: string): string[] {
    const value = this.params[key];
    if (Array.isArray(value)) return value;
    if (typeof value === "string") return [value];
    return [];
  }

  getEnum<T extends string>(key: string, allowed: T[], fallback: T): T {
    const value = this.getString(key);
    return allowed.includes(value as T) ? (value as T) : fallback;
  }
}
