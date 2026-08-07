import { useGetTypesListQuery } from "../api/pokemonApi";
import { generations, typeColors } from "../styles/theme";
import { capitalize } from "../utils/pokemonHelpers";
import {
  ClearLink,
  GenSelect,
  Panel,
  Section,
  SectionTitle,
  TypeChip,
  TypeGrid,
} from "./FilterPanel.styles.js";

function FilterPanel({ selectedTypes, onToggleType, generation, onGenerationChange, onClear, hasActiveFilters }) {
  const { data: types = [] } = useGetTypesListQuery();

  return (
    <Panel>
      <Section>
        <SectionTitle>Tipo</SectionTitle>
        <TypeGrid>
          {types.map((t) => (
            <TypeChip
              key={t.name}
              type="button"
              $active={selectedTypes.includes(t.name)}
              $color={typeColors[t.name] || "#68A090"}
              onClick={() => onToggleType(t.name)}
            >
              {capitalize(t.name)}
            </TypeChip>
          ))}
        </TypeGrid>
      </Section>

      <Section>
        <SectionTitle>Generación</SectionTitle>
        <GenSelect
          value={generation ?? ""}
          onChange={(e) => onGenerationChange(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Todas</option>
          {generations.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </GenSelect>
      </Section>

      {hasActiveFilters && (
        <ClearLink type="button" onClick={onClear}>
          Limpiar filtros
        </ClearLink>
      )}
    </Panel>
  );
}

export default FilterPanel;
