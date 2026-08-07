import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useGetPokemonByNameQuery } from "../api/pokemonApi";
import TypeBadge from "../components/TypeBadge.jsx";
import EmptyState from "../components/EmptyState.jsx";
import {
  MAX_TEAM_SIZE,
  moveTeamMember,
  removeFromTeam,
  selectTeam,
} from "../features/favorites/favoritesSlice";
import { capitalize, formatPokemonNumber } from "../utils/pokemonHelpers";
import {
  Count,
  ExploreLink,
  Heading,
  List,
  NameLink,
  NumberTag,
  Order,
  OrderButton,
  RemoveButton,
  Row,
  Slot,
  Sprite,
  Subtitle,
  Title,
  Types,
} from "./Team.styles.js";

function TeamRow({ member, index, total }) {
  const dispatch = useDispatch();
  const { data } = useGetPokemonByNameQuery(member.name);

  const handleRemove = () => {
    dispatch(removeFromTeam(member.id));
    toast.info(`${capitalize(member.name)} salió del equipo`);
  };

  return (
    <Row>
      <Order>
        <OrderButton
          type="button"
          disabled={index === 0}
          onClick={() =>
            dispatch(moveTeamMember({ id: member.id, direction: -1 }))
          }
          aria-label="Subir"
        >
          ▲
        </OrderButton>
        <OrderButton
          type="button"
          disabled={index === total - 1}
          onClick={() =>
            dispatch(moveTeamMember({ id: member.id, direction: 1 }))
          }
          aria-label="Bajar"
        >
          ▼
        </OrderButton>
      </Order>
      <Slot>#{index + 1}</Slot>
      <Sprite src={data?.sprites?.front_default} alt={member.name} />
      <NumberTag>{data ? formatPokemonNumber(data.id) : "..."}</NumberTag>
      <NameLink to={`/pokemon/${member.name}`}>
        {capitalize(member.name)}
      </NameLink>
      <Types>
        {data?.types.map((t) => (
          <TypeBadge key={t.type.name} type={t.type.name} />
        ))}
      </Types>
      <RemoveButton type="button" onClick={handleRemove}>
        Quitar
      </RemoveButton>
    </Row>
  );
}

function Team() {
  const team = useSelector(selectTeam);
  const isFull = team.length >= MAX_TEAM_SIZE;

  return (
    <div>
      <Heading>
        <Title>Mi Equipo</Title>
        <Count $full={isFull}>
          {team.length}/{MAX_TEAM_SIZE}
        </Count>
      </Heading>
      <Subtitle>
        Armá tu equipo de hasta 6 Pokemon y reordenalos con las flechas.
      </Subtitle>

      {team.length === 0 ? (
        <EmptyState
          icon="🎒"
          title="Tu equipo está vacío"
          subtitle="Explorá la Pokédex y agregá tus favoritos con la estrella."
        >
          <ExploreLink to="/">Ir a la Pokédex</ExploreLink>
        </EmptyState>
      ) : (
        <List>
          {team.map((member, index) => (
            <TeamRow
              key={member.id}
              member={member}
              index={index}
              total={team.length}
            />
          ))}
        </List>
      )}
    </div>
  );
}

export default Team;
