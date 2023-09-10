// src/queries.ts
import { gql } from "@apollo/client";
import { CountriesData } from "./types"; // Türleri içe aktarın

export const COUNTRIES_QUERY = gql`
  query GetCountries {
    countries {
      code
      name
      size
      # Diğer alanları buraya ekleyin
    }
  }
`;

// Sorgu sonucu dönen verinin türünü belirtin
export interface CountriesQueryResult {
  data: CountriesData;
}
