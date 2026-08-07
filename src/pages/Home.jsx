import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import SearchBar from "../components/SearchBar.jsx";
import FilterPanel from "../components/FilterPanel.jsx";
import PokemonList from "../components/PokemonList.jsx";
import {
  useGetGenerationDetailQuery,
  useGetPokemonMasterListQuery,
  pokemonApi,
} from "../api/pokemonApi";
import { useTypeIntersection } from "../hooks/useTypeIntersection";
import {
  hydrateFromUrl,
  selectFilters,
  selectHasActiveFilters,
  setGeneration,
  setSearch,
  toggleType,
  clearFilters,
} from "../features/filters/filtersSlice";
import { Layout, RefreshButton, StatusLine, TopBar } from "./Home.styles.js";

const PAGE_SIZE = 24;

function Home() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useSelector(selectFilters);
  const hasActiveFilters = useSelector(selectHasActiveFilters);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const hydrated = useRef(false);

  // 1. On mount, read the URL and seed redux — this is what makes a shared
  // link reproduce the same search + filters.
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    dispatch(
      hydrateFromUrl({
        search: searchParams.get("search") || "",
        types: searchParams.get("types")
          ? searchParams.get("types").split(",")
          : [],
        generation: searchParams.get("gen")
          ? Number(searchParams.get("gen"))
          : null,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Whenever filters change, mirror them back into the URL query params.
  useEffect(() => {
    if (!hydrated.current) return;
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.types.length) params.types = filters.types.join(",");
    if (filters.generation) params.gen = String(filters.generation);
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.types, filters.generation]);

  // Reset pagination whenever the active filters change.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters.search, filters.types, filters.generation]);

  const {
    data: masterList = [],
    isLoading: isMasterLoading,
    isFetching: isMasterFetching,
    isError: isMasterError,
    refetch: refetchMaster,
    fulfilledTimeStamp,
  } = useGetPokemonMasterListQuery();

  const typeIntersection = useTypeIntersection(filters.types);

  const { data: generationSpecies, isLoading: isGenLoading } =
    useGetGenerationDetailQuery(filters.generation, {
      skip: !filters.generation,
    });

  const generationNames = useMemo(
    () =>
      generationSpecies ? new Set(generationSpecies.map((s) => s.name)) : null,
    [generationSpecies],
  );

  const filteredList = useMemo(() => {
    let list = masterList;
    const term = filters.search.trim().toLowerCase();
    if (term) list = list.filter((p) => p.name.includes(term));
    if (typeIntersection.data)
      list = list.filter((p) => typeIntersection.data.has(p.name));
    if (generationNames) list = list.filter((p) => generationNames.has(p.name));
    return list;
  }, [masterList, filters.search, typeIntersection.data, generationNames]);

  const visibleList = filteredList.slice(0, visibleCount);
  const hasMore = visibleCount < filteredList.length;

  const isInitialLoading =
    isMasterLoading ||
    (filters.types.length > 0 && typeIntersection.isLoading) ||
    (filters.generation && isGenLoading);

  const isError = isMasterError || typeIntersection.isError;

  const handleRetry = () => {
    refetchMaster();
  };

  const handleForceRefresh = () => {
    dispatch(
      pokemonApi.util.invalidateTags(["MasterList", "Types", "Generations"]),
    );
  };

  return (
    <div>
      <TopBar>
        <SearchBar
          value={filters.search}
          onChange={(v) => dispatch(setSearch(v))}
        />
        <RefreshButton type="button" onClick={handleForceRefresh}>
          Actualizar
        </RefreshButton>
      </TopBar>

      <StatusLine>
        {isMasterFetching
          ? "Actualizando datos..."
          : fulfilledTimeStamp
            ? `Datos en caché · última actualización ${new Date(fulfilledTimeStamp).toLocaleTimeString()}`
            : null}
        {!isMasterFetching && !isMasterError && (
          <span>
            · Mostrando {filteredList.length} de {masterList.length} Pokemon
          </span>
        )}
      </StatusLine>

      <Layout>
        <FilterPanel
          selectedTypes={filters.types}
          onToggleType={(t) => dispatch(toggleType(t))}
          generation={filters.generation}
          onGenerationChange={(g) => dispatch(setGeneration(g))}
          onClear={() => dispatch(clearFilters())}
          hasActiveFilters={hasActiveFilters}
        />
        <PokemonList
          items={visibleList}
          isInitialLoading={isInitialLoading}
          isError={isError}
          hasMore={hasMore}
          onLoadMore={() => setVisibleCount((c) => c + PAGE_SIZE)}
          onRetry={handleRetry}
          emptyTitle="Sin resultados"
          emptySubtitle="No hay Pokemon que coincidan con la búsqueda y los filtros aplicados."
        />
      </Layout>
    </div>
  );
}

export default Home;
