import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import PokemonCard from "./PokemonCard.jsx";
import SkeletonCard from "./SkeletonCard.jsx";
import EmptyState from "./EmptyState.jsx";
import ErrorState from "./ErrorState.jsx";
import { Grid, LoadingMore, Sentinel } from "./PokemonList.styles.js";

function PokemonList({
  items,
  isInitialLoading,
  isError,
  hasMore,
  onLoadMore,
  onRetry,
  emptyTitle = "No encontramos Pokemon",
  emptySubtitle = "Probá con otro nombre o ajustá los filtros.",
}) {
  const { ref, inView } = useInView({ rootMargin: "300px" });

  useEffect(() => {
    if (inView && hasMore && !isInitialLoading) {
      onLoadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore, isInitialLoading]);

  if (isError) {
    return (
      <ErrorState
        onRetry={onRetry}
        message="No pudimos cargar la Pokedex. Revisá tu conexión."
      />
    );
  }

  if (isInitialLoading) {
    return (
      <Grid>
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </Grid>
    );
  }

  if (!items.length) {
    return <EmptyState icon="🔎" title={emptyTitle} subtitle={emptySubtitle} />;
  }

  return (
    <>
      <Grid>
        {items.map((item) => (
          <PokemonCard key={item.name} name={item.name} />
        ))}
      </Grid>
      {hasMore && (
        <>
          <Sentinel ref={ref} />
          <LoadingMore>Cargando más Pokemon...</LoadingMore>
        </>
      )}
    </>
  );
}

export default PokemonList;
