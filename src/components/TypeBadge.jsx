import { typeColors } from "../styles/theme";
import { capitalize } from "../utils/pokemonHelpers";
import { Badge } from "./TypeBadge.styles.js";

function TypeBadge({ type, ...rest }) {
  const color = typeColors[type] || "#68A090";
  return (
    <Badge $color={color} {...rest}>
      {capitalize(type)}
    </Badge>
  );
}

export default TypeBadge;
