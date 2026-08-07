import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useGetPokemonByNameQuery } from "../api/pokemonApi";
import TypeBadge from "./TypeBadge.jsx";
import SkeletonCard from "./SkeletonCard.jsx";
import { capitalize, formatPokemonNumber } from "../utils/pokemonHelpers";
import {
  selectIsTeamFull,
  toggleTeamMember,
} from "../features/favorites/favoritesSlice";
import {
  Card,
  FavButton,
  Img,
  ImgWrap,
  Name,
  Number,
  Types,
} from "./PokemonCard.styles.js";

function PokemonCard({ name }) {
  const dispatch = useDispatch();
  const [imgLoaded, setImgLoaded] = useState(false);
  const { data, isLoading, isError } = useGetPokemonByNameQuery(name);
  const isInTeam = useSelector((state) =>
    state.favorites.team.some((p) => p.id === data?.id),
  );
  const isTeamFull = useSelector(selectIsTeamFull);

  if (isLoading || !data) return <SkeletonCard />;
  if (isError) return null;

  const sprite =
    data.sprites?.front_default ||
    data.sprites?.other?.["official-artwork"]?.front_default ||
    "";

  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInTeam && isTeamFull) {
      toast.warn(
        "Tu equipo ya tiene 6 Pokemon. Sacá uno antes de agregar otro.",
      );
      return;
    }
    dispatch(toggleTeamMember({ id: data.id, name: data.name }));
    toast[isInTeam ? "info" : "success"](
      isInTeam
        ? `${capitalize(data.name)} salió del equipo`
        : `${capitalize(data.name)} se unió al equipo`,
    );
  };

  return (
    <Card to={`/pokemon/${data.name}`}>
      <FavButton
        type="button"
        $active={isInTeam}
        onClick={handleFavClick}
        aria-label={isInTeam ? "Quitar de favoritos" : "Agregar a favoritos"}
        title={isInTeam ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {isInTeam ? "★" : "☆"}
      </FavButton>
      <ImgWrap>
        <Img
          src={sprite}
          alt={data.name}
          loading="lazy"
          $loaded={imgLoaded}
          onLoad={() => setImgLoaded(true)}
        />
      </ImgWrap>
      <Number>{formatPokemonNumber(data.id)}</Number>
      <Name>{capitalize(data.name)}</Name>
      <Types>
        {data.types.map((t) => (
          <TypeBadge key={t.type.name} type={t.type.name} />
        ))}
      </Types>
    </Card>
  );
}

export default PokemonCard;
