import { generations } from "../styles/theme";

export function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
}

export function formatPokemonNumber(id) {
  return `#${String(id).padStart(3, "0")}`;
}

// PokeAPI list endpoints return items as { name, url } where the url looks like
// https://pokeapi.co/api/v2/pokemon/25/ — we pull the numeric id out of it.
export function getIdFromUrl(url = "") {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
}

export function getGenerationForId(id) {
  return generations.find((g) => id >= g.range[0] && id <= g.range[1]);
}

export function formatHeight(decimetres) {
  const metres = decimetres / 10;
  return `${metres.toFixed(1)} m`;
}

export function formatWeight(hectograms) {
  const kg = hectograms / 10;
  return `${kg.toFixed(1)} kg`;
}

export const STAT_LABELS = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataq. Esp.",
  "special-defense": "Def. Esp.",
  speed: "Velocidad",
};

export const MAX_STAT_VALUE = 255;
