import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { pokemonApi } from "../api/pokemonApi";

export function useTypeIntersection(types) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    data: null,
    isLoading: false,
    isError: false,
  });
  const key = types.join(",");

  useEffect(() => {
    if (!types.length) {
      setState({ data: null, isLoading: false, isError: false });
      return undefined;
    }

    let cancelled = false;
    setState((s) => ({ ...s, isLoading: true, isError: false }));

    const subscriptions = types.map((type) =>
      dispatch(pokemonApi.endpoints.getPokemonByType.initiate(type)),
    );

    Promise.all(subscriptions.map((sub) => sub.unwrap()))
      .then((results) => {
        if (cancelled) return;
        const sets = results.map((list) => new Set(list.map((p) => p.name)));
        const intersection = sets.reduce(
          (acc, set) => new Set([...acc].filter((name) => set.has(name))),
        );
        setState({ data: intersection, isLoading: false, isError: false });
      })
      .catch(() => {
        if (!cancelled)
          setState({ data: null, isLoading: false, isError: true });
      });

    return () => {
      cancelled = true;
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, dispatch]);

  return state;
}
