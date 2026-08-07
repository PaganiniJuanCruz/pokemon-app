import { useSelector } from "react-redux";

import { useOnlineStatus } from "../hooks/useOnlineStatus";
import {
  MAX_TEAM_SIZE,
  selectTeam,
} from "../features/favorites/favoritesSlice";
import {
  Badge,
  Bar,
  Dot,
  Inner,
  Logo,
  Nav,
  NavItem,
  Status,
} from "./Header.styles.js";

function Header() {
  const isOnline = useOnlineStatus();
  const team = useSelector(selectTeam);

  return (
    <Bar>
      <Inner>
        <Logo to="/">PokeDeck</Logo>
        <Nav>
          <NavItem to="/" end>
            Pokedex
          </NavItem>
          <NavItem to="/team">
            Mi Equipo
            <Badge>
              {team.length}/{MAX_TEAM_SIZE}
            </Badge>
          </NavItem>
          <NavItem to="/compare">Comparar</NavItem>
        </Nav>
        <Status title={isOnline ? "Conectado" : "Sin conexión"}>
          <Dot $online={isOnline} />
          {isOnline ? "En línea" : "Sin conexión"}
        </Status>
      </Inner>
    </Bar>
  );
}

export default Header;
