// src/App.tsx
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { COUNTRIES_QUERY } from "./queries";
import {
  Container,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { CountriesQueryResult } from "./queries"; // Türü içe aktarın

const colors = ["#FF5733", "#33FFC0", "#334CFF", "#FFFF33", "#33FF89"];

function App() {
  const { loading, error, data } =
    useQuery<CountriesQueryResult>(COUNTRIES_QUERY); // Türü belirtin
  const [filterText, setFilterText] = useState("");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  // Filtreleme ve gruplama işlemini ele alın
  const filteredCountries = data?.countries
    .filter((country) =>
      country.name.toLowerCase().includes(filterText.toLowerCase())
    )
    .reduce((groups, country) => {
      const groupKey = country.size || "Büyüklük Belirtilmemiş"; // Eğer bir boyut yoksa varsayılan grup
      groups[groupKey] = groups[groupKey] || [];
      groups[groupKey].push(country);
      return groups;
    }, {} as { [key: string]: typeof data.countries });

  // Otomatik olarak 10. öğeyi (veya en sonuncusunu) seçin
  React.useEffect(() => {
    if (data?.countries) {
      const indexToSelect = Math.min(9, data.countries.length - 1);
      setSelectedItem(indexToSelect);
    }
  }, [data?.countries]);

  return (
    <Container>
      <TextField
        label="Filtrele ve Grupla"
        fullWidth
        variant="outlined"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <List>
        {loading && <p>Yükleniyor...</p>}
        {error && <p>Hata: {error.message}</p>}
        {filteredCountries &&
          Object.entries(filteredCountries).map(([group, countries], idx) => (
            <React.Fragment key={group}>
              <ListItem>
                <ListItemText primary={group} />
              </ListItem>
              {countries.map((country, index) => (
                <ListItem
                  key={country.code}
                  onClick={() => setSelectedItem(index)}
                  style={{
                    backgroundColor:
                      selectedItem === index
                        ? colors[index % colors.length]
                        : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <ListItemText primary={country.name} />
                </ListItem>
              ))}
            </React.Fragment>
          ))}
      </List>
    </Container>
  );
}

export default App;
