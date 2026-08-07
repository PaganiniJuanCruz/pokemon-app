import { useEffect, useState } from "react";

import { useDebounce } from "../hooks/useDebounce";
import { ClearButton, Input, Wrapper } from "./SearchBar.styles.js";

function SearchBar({
  value,
  onChange,
  placeholder = "Buscar Pokemon por nombre...",
}) {
  const [text, setText] = useState(value || "");
  const debounced = useDebounce(text, 300);

  // Keep the input in sync if the value is changed from outside (e.g. the
  // URL was loaded with a ?search= param, or "limpiar filtros" was clicked).
  useEffect(() => {
    setText(value || "");
  }, [value]);

  useEffect(() => {
    if (debounced !== value) {
      onChange(debounced);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <Wrapper>
      <Input
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        aria-label="Buscar Pokemon"
      />
      {text && (
        <ClearButton onClick={() => setText("")} aria-label="Limpiar búsqueda">
          ×
        </ClearButton>
      )}
    </Wrapper>
  );
}

export default SearchBar;
