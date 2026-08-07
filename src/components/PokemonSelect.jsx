import { useEffect, useMemo, useRef, useState } from "react";

import { useGetPokemonMasterListQuery } from "../api/pokemonApi";
import { capitalize, getIdFromUrl } from "../utils/pokemonHelpers";
import {
  Dropdown,
  EmptyOption,
  Input,
  Option,
  Wrapper,
} from "./PokemonSelect.styles.js";

function PokemonSelect({
  value,
  onChange,
  onBlur,
  placeholder = "Elegí un Pokemon...",
  error,
  name,
}) {
  const { data: masterList = [] } = useGetPokemonMasterListQuery();
  const [text, setText] = useState(value ? capitalize(value) : "");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setText(value ? capitalize(value) : "");
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setText(value ? capitalize(value) : "");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  const options = useMemo(() => {
    const term = text.trim().toLowerCase();
    if (!term || term === (value || "").toLowerCase())
      return masterList.slice(0, 20);
    return masterList.filter((p) => p.name.includes(term)).slice(0, 20);
  }, [text, masterList, value]);

  const handleSelect = (pokemonName) => {
    onChange(pokemonName);
    setText(capitalize(pokemonName));
    setIsOpen(false);
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Input
        name={name}
        value={text}
        placeholder={placeholder}
        $error={error}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setText(e.target.value);
          setIsOpen(true);
          if (!e.target.value) onChange("");
        }}
        onBlur={onBlur}
        autoComplete="off"
      />
      {isOpen && (
        <Dropdown>
          {options.length ? (
            options.map((p) => (
              <Option key={p.name} onMouseDown={() => handleSelect(p.name)}>
                #{String(getIdFromUrl(p.url)).padStart(3, "0")}{" "}
                {capitalize(p.name)}
              </Option>
            ))
          ) : (
            <EmptyOption>Sin coincidencias</EmptyOption>
          )}
        </Dropdown>
      )}
    </Wrapper>
  );
}

export default PokemonSelect;
