import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import PokemonSelect from "../components/PokemonSelect.jsx";
import TypeBadge from "../components/TypeBadge.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { useGetPokemonByNameQuery } from "../api/pokemonApi";
import {
  capitalize,
  formatHeight,
  formatPokemonNumber,
  formatWeight,
  STAT_LABELS,
} from "../utils/pokemonHelpers";
import {
  CompareCard,
  ErrorText,
  Field,
  FieldLabel,
  FormGrid,
  Head,
  Heads,
  Name,
  NumberTag,
  PhysicalRow,
  Row,
  SplitFillLeft,
  SplitFillRight,
  SplitTrack,
  Sprite,
  StatLabel,
  StatRow,
  StatTable,
  StatValue,
  SubmitButton,
  Subtitle,
  Title,
  Vs,
} from "./Compare.styles.js";

const validationSchema = Yup.object({
  pokemon1: Yup.string().required("Elegí el primer Pokemon"),
  pokemon2: Yup.string()
    .required("Elegí el segundo Pokemon")
    .test(
      "different",
      "No podés comparar un Pokemon consigo mismo",
      function (value) {
        return !value || value !== this.parent.pokemon1;
      },
    ),
});

function ResultBlock({ nameA, nameB }) {
  const a = useGetPokemonByNameQuery(nameA);
  const b = useGetPokemonByNameQuery(nameB);

  if (a.isLoading || b.isLoading) return <p>Cargando comparación...</p>;
  if (a.isError || b.isError) {
    return (
      <ErrorState
        onRetry={() => {
          a.refetch();
          b.refetch();
        }}
        message="No pudimos cargar alguno de los Pokemon."
      />
    );
  }

  const pokeA = a.data;
  const pokeB = b.data;
  const statsA = pokeA.stats;
  const statsB = pokeB.stats;

  return (
    <CompareCard>
      <Heads>
        <Head>
          <Sprite src={pokeA.sprites.front_default} alt={pokeA.name} />
          <NumberTag>{formatPokemonNumber(pokeA.id)}</NumberTag>
          <Name>{capitalize(pokeA.name)}</Name>
          <Row>
            {pokeA.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </Row>
          <PhysicalRow>
            <span>{formatHeight(pokeA.height)}</span>
            <span>{formatWeight(pokeA.weight)}</span>
          </PhysicalRow>
        </Head>
        <Head>
          <Sprite src={pokeB.sprites.front_default} alt={pokeB.name} />
          <NumberTag>{formatPokemonNumber(pokeB.id)}</NumberTag>
          <Name>{capitalize(pokeB.name)}</Name>
          <Row>
            {pokeB.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </Row>
          <PhysicalRow>
            <span>{formatHeight(pokeB.height)}</span>
            <span>{formatWeight(pokeB.weight)}</span>
          </PhysicalRow>
        </Head>
      </Heads>

      <StatTable>
        {statsA.map((statA, i) => {
          const statB = statsB[i];
          const valueA = statA.base_stat;
          const valueB = statB.base_stat;
          const total = valueA + valueB || 1;
          return (
            <StatRow key={statA.stat.name}>
              <StatValue $side="left" $winner={valueA > valueB}>
                {valueA}
              </StatValue>
              <div>
                <StatLabel>
                  {STAT_LABELS[statA.stat.name] || statA.stat.name}
                </StatLabel>
                <SplitTrack>
                  <SplitFillLeft $pct={(valueA / total) * 100} />
                  <SplitFillRight $pct={(valueB / total) * 100} />
                </SplitTrack>
              </div>
              <StatValue $side="right" $winner={valueB > valueA}>
                {valueB}
              </StatValue>
            </StatRow>
          );
        })}
      </StatTable>
    </CompareCard>
  );
}

function Compare() {
  const [comparison, setComparison] = useState(null);

  return (
    <div>
      <Title>Comparar Pokemon</Title>
      <Subtitle>
        Elegí dos Pokemon distintos para ver sus estadísticas lado a lado.
      </Subtitle>

      <Formik
        initialValues={{ pokemon1: "", pokemon2: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => setComparison(values)}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
          <FormGrid>
            <Field>
              <FieldLabel>Pokemon 1</FieldLabel>
              <PokemonSelect
                name="pokemon1"
                value={values.pokemon1}
                onChange={(v) => setFieldValue("pokemon1", v)}
                onBlur={() => setFieldTouched("pokemon1", true)}
                error={touched.pokemon1 && errors.pokemon1}
              />
              {touched.pokemon1 && errors.pokemon1 && (
                <ErrorText>{errors.pokemon1}</ErrorText>
              )}
            </Field>

            <Vs>VS</Vs>

            <Field>
              <FieldLabel>Pokemon 2</FieldLabel>
              <PokemonSelect
                name="pokemon2"
                value={values.pokemon2}
                onChange={(v) => setFieldValue("pokemon2", v)}
                onBlur={() => setFieldTouched("pokemon2", true)}
                error={touched.pokemon2 && errors.pokemon2}
              />
              {touched.pokemon2 && errors.pokemon2 && (
                <ErrorText>{errors.pokemon2}</ErrorText>
              )}
            </Field>

            <SubmitButton type="submit">Comparar</SubmitButton>
          </FormGrid>
        )}
      </Formik>

      {comparison && (
        <ResultBlock nameA={comparison.pokemon1} nameB={comparison.pokemon2} />
      )}
    </div>
  );
}

export default Compare;
