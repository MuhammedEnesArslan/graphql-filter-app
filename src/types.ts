// src/types.ts
export interface Country {
  code: string;
  name: string;
  size?: string | null; // size opsiyonel olabilir
  // Diğer alanları da burada tanımlayabilirsiniz
}

export interface CountriesData {
  countries: Country[];
}
