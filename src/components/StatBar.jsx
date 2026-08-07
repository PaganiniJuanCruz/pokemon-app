import { MAX_STAT_VALUE, STAT_LABELS } from "../utils/pokemonHelpers";
import { Fill, Label, Row, Track, Value } from "./StatBar.styles.js";

function StatBar({ name, value }) {
  const pct = Math.min(100, Math.round((value / MAX_STAT_VALUE) * 100));
  return (
    <Row>
      <Label>{STAT_LABELS[name] || name}</Label>
      <Value>{value}</Value>
      <Track>
        <Fill $pct={pct} />
      </Track>
    </Row>
  );
}

export default StatBar;
