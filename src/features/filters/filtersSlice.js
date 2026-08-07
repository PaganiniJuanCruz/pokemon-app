import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  types: [],
  generation: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    toggleType(state, action) {
      const type = action.payload;
      state.types = state.types.includes(type)
        ? state.types.filter((t) => t !== type)
        : [...state.types, type];
    },
    setGeneration(state, action) {
      state.generation = action.payload;
    },
    clearFilters(state) {
      state.search = "";
      state.types = [];
      state.generation = null;
    },
    hydrateFromUrl(state, action) {
      const { search, types, generation } = action.payload;
      state.search = search ?? "";
      state.types = types ?? [];
      state.generation = generation ?? null;
    },
  },
});

export const {
  setSearch,
  toggleType,
  setGeneration,
  clearFilters,
  hydrateFromUrl,
} = filtersSlice.actions;

export const selectFilters = (state) => state.filters;
export const selectHasActiveFilters = (state) =>
  Boolean(
    state.filters.search ||
    state.filters.types.length ||
    state.filters.generation,
  );

export default filtersSlice.reducer;
