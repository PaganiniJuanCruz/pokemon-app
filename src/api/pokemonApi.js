import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://pokeapi.co/api/v2";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Pokemon", "MasterList", "Types", "Generations", "TypeFilter", "GenerationFilter"],
  // Static-ish data from PokeAPI rarely changes, so we can afford to keep it
  // around for a while and rely on cache instead of refetching constantly.
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    // Lightweight list of every pokemon (name + url) used as the base set for
    // client-side search/pagination. Cached "forever" for the session.
    getPokemonMasterList: builder.query({
      query: () => `/pokemon?limit=2000&offset=0`,
      transformResponse: (response) => response.results,
      keepUnusedDataFor: 60 * 60 * 6,
      providesTags: ["MasterList"],
    }),

    // Full detail for a single pokemon (sprites, types, stats, abilities...).
    // Shared between the list cards, the detail page and the comparator, so
    // RTK Query's cache means we only ever fetch each pokemon once.
    getPokemonByName: builder.query({
      query: (nameOrId) => `/pokemon/${nameOrId}`,
      keepUnusedDataFor: 60 * 60,
      providesTags: (result, error, arg) => [{ type: "Pokemon", id: arg }],
    }),

    getPokemonSpecies: builder.query({
      query: (nameOrId) => `/pokemon-species/${nameOrId}`,
      keepUnusedDataFor: 60 * 60,
      providesTags: (result, error, arg) => [{ type: "Pokemon", id: `species-${arg}` }],
    }),

    getTypesList: builder.query({
      query: () => `/type?limit=30`,
      transformResponse: (response) =>
        response.results.filter((t) => !["unknown", "shadow"].includes(t.name)),
      keepUnusedDataFor: 60 * 60 * 24,
      providesTags: ["Types"],
    }),

    getPokemonByType: builder.query({
      query: (typeName) => `/type/${typeName}`,
      transformResponse: (response) => response.pokemon.map((p) => p.pokemon),
      keepUnusedDataFor: 60 * 60,
      providesTags: (result, error, arg) => [{ type: "TypeFilter", id: arg }],
    }),

    getGenerationsList: builder.query({
      query: () => `/generation?limit=20`,
      keepUnusedDataFor: 60 * 60 * 24,
      providesTags: ["Generations"],
    }),

    getGenerationDetail: builder.query({
      query: (id) => `/generation/${id}`,
      transformResponse: (response) => response.pokemon_species,
      keepUnusedDataFor: 60 * 60,
      providesTags: (result, error, arg) => [{ type: "GenerationFilter", id: arg }],
    }),
  }),
});

export const {
  useGetPokemonMasterListQuery,
  useGetPokemonByNameQuery,
  useGetPokemonSpeciesQuery,
  useGetTypesListQuery,
  useGetPokemonByTypeQuery,
  useGetGenerationsListQuery,
  useGetGenerationDetailQuery,
} = pokemonApi;
