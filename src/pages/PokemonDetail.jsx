import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useGetPokemonByNameQuery } from "../api/pokemonApi";
import TypeBadge from "../components/TypeBadge.jsx";
import StatBar from "../components/StatBar.jsx";
import ErrorState from "../components/ErrorState.jsx";
import {
  selectIsTeamFull,
  toggleTeamMember,
} from "../features/favorites/favoritesSlice";
import {
  capitalize,
  formatHeight,
  formatPokemonNumber,
  formatWeight,
} from "../utils/pokemonHelpers";
import {
  AbilityChip,
  Back,
  FavButton,
  Gallery,
  Info,
  LoadingText,
  MainImage,
  NameHeading,
  NumberTag,
  PhysicalGrid,
  PhysicalItem,
  PhysicalLabel,
  PhysicalValue,
  Row,
  Section,
  SectionTitle,
  Thumb,
  Thumbs,
  TitleRow,
  Wrapper,
} from "./PokemonDetail.styles.js";

function PokemonDetail() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, isError, refetch } = useGetPokemonByNameQuery(name);
  const isInTeam = useSelector((state) =>
    state.favorites.team.some((p) => p.id === data?.id),
  );
  const isTeamFull = useSelector(selectIsTeamFull);
  const [activeSprite, setActiveSprite] = useState(null);

  const spriteOptions = useMemo(() => {
    if (!data) return [];
    const s = data.sprites;
    const candidates = [
      { key: "default", label: "Normal", src: s.front_default },
      { key: "shiny", label: "Shiny", src: s.front_shiny },
      { key: "back", label: "Espalda", src: s.back_default },
      { key: "back_shiny", label: "Espalda shiny", src: s.back_shiny },
      {
        key: "artwork",
        label: "Arte oficial",
        src: s.other?.["official-artwork"]?.front_default,
      },
      { key: "home", label: "Home", src: s.other?.home?.front_default },
    ];
    return candidates.filter((c) => c.src);
  }, [data]);

  if (isLoading) return <LoadingText>Cargando Pokemon...</LoadingText>;
  if (isError || !data) {
    return (
      <ErrorState onRetry={refetch} message="No pudimos cargar este Pokemon." />
    );
  }

  const mainSprite =
    activeSprite ||
    spriteOptions.find((s) => s.key === "artwork")?.src ||
    spriteOptions[0]?.src;

  const handleFavClick = () => {
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
    <div>
      <Back to="/">← Volver a la Pokédex</Back>
      <Wrapper>
        <Gallery>
          <MainImage src={mainSprite} alt={data.name} />
          <Thumbs>
            {spriteOptions.map((s) => (
              <Thumb
                key={s.key}
                type="button"
                $active={mainSprite === s.src}
                title={s.label}
                onClick={() => setActiveSprite(s.src)}
              >
                <img src={s.src} alt={s.label} />
              </Thumb>
            ))}
          </Thumbs>
        </Gallery>

        <Info>
          <TitleRow>
            <div>
              <NumberTag>{formatPokemonNumber(data.id)}</NumberTag>
              <NameHeading>{capitalize(data.name)}</NameHeading>
            </div>
            <FavButton
              type="button"
              $active={isInTeam}
              onClick={handleFavClick}
            >
              {isInTeam ? "★ En el equipo" : "☆ Agregar al equipo"}
            </FavButton>
          </TitleRow>

          <Row>
            {data.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </Row>

          <Section>
            <SectionTitle>Datos físicos</SectionTitle>
            <PhysicalGrid>
              <PhysicalItem>
                <PhysicalLabel>Altura</PhysicalLabel>
                <PhysicalValue>{formatHeight(data.height)}</PhysicalValue>
              </PhysicalItem>
              <PhysicalItem>
                <PhysicalLabel>Peso</PhysicalLabel>
                <PhysicalValue>{formatWeight(data.weight)}</PhysicalValue>
              </PhysicalItem>
            </PhysicalGrid>
          </Section>

          <Section>
            <SectionTitle>Habilidades</SectionTitle>
            <Row>
              {data.abilities.map((a) => (
                <AbilityChip key={a.ability.name} $hidden={a.is_hidden}>
                  {capitalize(a.ability.name)}
                  {a.is_hidden ? " (oculta)" : ""}
                </AbilityChip>
              ))}
            </Row>
          </Section>

          <Section>
            <SectionTitle>Estadísticas base</SectionTitle>
            {data.stats.map((s) => (
              <StatBar
                key={s.stat.name}
                name={s.stat.name}
                value={s.base_stat}
              />
            ))}
          </Section>
        </Info>
      </Wrapper>
    </div>
  );
}

export default PokemonDetail;
