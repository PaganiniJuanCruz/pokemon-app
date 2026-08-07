# PokéDeck

Pokédex construida con React + Redux Toolkit (RTK Query) como challenge técnico. Permite explorar Pokémon con scroll infinito, buscar y filtrar por tipo/generación, armar un equipo de hasta 6 favoritos, y comparar dos Pokémon entre sí.

Consume la [PokeAPI](https://pokeapi.co/) pública (no requiere API key ni variables de entorno).

## Stack

- **React 18** + **Vite 5**
- **Redux Toolkit** + **RTK Query** para estado global y data fetching
- **redux-persist** para persistencia en `localStorage`
- **React Router v6**
- **Styled Components**
- **Formik** + **Yup** para el formulario de comparación
- JavaScript puro (sin TypeScript)

## Instalación y ejecución

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev       # entorno de desarrollo (http://localhost:5173)
```

Otros scripts disponibles:

```bash
npm run build     # build de producción en /dist
npm run preview   # sirve el build de /dist localmente
npm run lint      # corre ESLint sobre todo el proyecto
```

## Estructura del proyecto

```
src/
├── api/            # RTK Query: definición de endpoints (pokemonApi.js)
├── app/            # store de Redux (configuración + redux-persist)
├── components/     # componentes reutilizables (cada uno con su Nombre.styles.js)
├── features/       # slices de Redux (favorites, filters)
├── hooks/          # hooks propios (debounce, online status, intersección de tipos)
├── pages/          # una página por ruta (Home, PokemonDetail, Team, Compare)
├── routes/         # definición de rutas (React Router)
├── styles/         # theme, estilos globales y datos de generaciones/tipos
└── utils/          # helpers puros (formateo, mapeos)
```

Los estilos de cada componente/página viven co-ubicados junto a su archivo (`Header.jsx` + `Header.styles.js`), siguiendo el patrón que recomienda styled-components para proyectos que escalan. Solo lo que es realmente global (theme, estilos base) está centralizado en `src/styles/`.

## Decisiones técnicas

### Obtención de datos y filtros combinables

La PokeAPI no tiene un endpoint que devuelva sprites/tipos/stats junto con paginación y filtros combinados, así que se resolvió en dos capas:

1. **Listado base**: se trae una vez una lista liviana de `{name, url}` de todos los Pokémon (`getPokemonMasterList`) y se pagina del lado del cliente para el scroll infinito.
2. **Filtros**: tipo y generación se resuelven contra sus propios endpoints (`/type/{tipo}`, `/generation/{id}`) y se cruzan por intersección de nombres contra el listado base. Si se seleccionan varios tipos a la vez, el cruce es tipo **AND** (el Pokémon debe tener todos los tipos elegidos), igual que buscar un Pokémon dual-tipo en el juego real.
3. Los detalles (sprite, tipos, stats) de cada card se piden individualmente con `getPokemonByName`, que es la misma query que usa la vista de detalle y el comparador — por lo tanto, si ya se visitó/renderizó un Pokémon en cualquier parte de la app, no se vuelve a pedir.

Búsqueda y filtros se guardan en query params (`?search=&types=&gen=`) para que una URL sea compartible y reproduzca la misma vista.

### Cache con RTK Query

Cada endpoint tiene un `keepUnusedDataFor` ajustado a qué tan estático es ese dato:

| Endpoint | keepUnusedDataFor | Motivo |
|---|---|---|
| `getPokemonByName` / especie | 1 hora | Datos de un Pokémon puntual, prácticamente inmutables |
| `getPokemonByType`, `getGenerationDetail` | 1 hora | Cambian solo si la PokeAPI agrega Pokémon nuevos |
| `getPokemonMasterList` | 6 horas | Lista completa, muy pesada de recalcular |
| `getTypesList`, `getGenerationsList` | 24 horas | Catálogos fijos (18 tipos, 9 generaciones) |

Se usan **tags** (`Pokemon`, `MasterList`, `Types`, `Generations`, `TypeFilter`, `GenerationFilter`) para invalidación selectiva. El botón "Actualizar" en la Pokédex dispara `pokemonApi.util.invalidateTags(...)` como demostración de refetch manual, ya que en la práctica la PokeAPI casi no cambia.

### Persistencia (redux-persist)

- **Cache de RTK Query**: se persiste el slice completo de `pokemonApi` en `localStorage`, con un `transform` que elimina el campo `subscriptions` antes de guardarlo y lo repone vacío al rehidratar. Sin esto, RTK Query "recordaría" que había queries siendo escuchadas de una sesión anterior y nunca las limpiaría de memoria.
- **Favoritos (Mi Equipo)**: slice separado (`favoritesSlice`), persistido independientemente. Es intencional que esté separado del cache de la API: son datos del usuario, no datos remotos, y no queremos que compartan configuración de persistencia ni se borren si se decide limpiar el cache de la API.
- **Filtros**: a propósito **no** se persisten en `localStorage`. Su fuente de verdad es la URL (ver punto anterior), que es lo que permite compartir una búsqueda por link; persistirlos en dos lugares distintos generaría conflictos sobre cuál gana al cargar la página.

### Comparador

Validación con Formik + Yup: ambos campos son requeridos y hay una regla custom (`test`) que rechaza comparar un Pokémon consigo mismo. El selector de cada Pokémon es un combobox propio con búsqueda (no se sumó una librería tipo `react-select` para no agregar una dependencia más fuera del stack pedido). La comparación de stats se resolvió con barras enfrentadas hechas a mano en vez de sumar una librería de gráficos, ya que el enunciado la marcaba como opcional y el volumen de datos (6 stats) no lo justifica.

### Mi Equipo

El reordenamiento se implementó con botones ▲/▼ en lugar de drag & drop real. El enunciado lo marca como opcional; agregar `dnd-kit` es la mejora natural si se quiere una interacción más "de juego" (ver Mejoras futuras).

## Mejoras futuras

- Drag & drop real (`@dnd-kit/core`) para reordenar el equipo, en lugar de los botones ▲/▼.
- Librería de gráficos (Recharts) para el comparador, con un radar chart de stats.
- Tests: no hay suite de tests todavía. Se priorizaría Vitest + Testing Library para slices y componentes clave (favoritesSlice, useTypeIntersection, PokemonList), y Playwright para un flujo E2E (buscar → filtrar → agregar a equipo → comparar).
- Code splitting por ruta (`React.lazy` + `Suspense`) — hoy todo el bundle sale en un solo chunk de ~410 KB.
- Virtualización de la grilla (`react-window` o similar) si se decide subir el tamaño de página del scroll infinito.
- Accesibilidad: navegación por teclado en el combobox de `PokemonSelect` y foco gestionado al abrir/cerrar el dropdown.
- Aprovechar `getPokemonSpecies` (ya está en `pokemonApi.js` pero sin usar) para mostrar descripción/flavor text en el detalle.
- Manejo más fino de formas regionales/alternativas, donde el nombre de la especie no siempre coincide 1 a 1 con el del Pokémon (afecta el cruce por generación en casos borde).
- Pipeline de CI (GitHub Actions) corriendo `lint` y `build` en cada PR.
- Migración a TypeScript si el equipo receptor lo requiere como estándar.
