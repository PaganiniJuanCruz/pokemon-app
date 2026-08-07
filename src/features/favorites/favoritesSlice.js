import { createSlice } from "@reduxjs/toolkit";

export const MAX_TEAM_SIZE = 6;

const initialState = {
  team: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToTeam: {
      reducer(state, action) {
        const { id, name } = action.payload;
        const alreadyIn = state.team.some((p) => p.id === id);
        if (alreadyIn || state.team.length >= MAX_TEAM_SIZE) return;
        state.team.push({ id, name });
      },
      prepare(pokemon) {
        return { payload: { id: pokemon.id, name: pokemon.name } };
      },
    },
    removeFromTeam(state, action) {
      state.team = state.team.filter((p) => p.id !== action.payload);
    },
    toggleTeamMember: {
      reducer(state, action) {
        const { id, name } = action.payload;
        const index = state.team.findIndex((p) => p.id === id);
        if (index >= 0) {
          state.team.splice(index, 1);
        } else if (state.team.length < MAX_TEAM_SIZE) {
          state.team.push({ id, name });
        }
      },
      prepare(pokemon) {
        return { payload: { id: pokemon.id, name: pokemon.name } };
      },
    },
    moveTeamMember(state, action) {
      const { id, direction } = action.payload;
      const index = state.team.findIndex((p) => p.id === id);
      const targetIndex = index + direction;
      if (index < 0 || targetIndex < 0 || targetIndex >= state.team.length)
        return;
      const [item] = state.team.splice(index, 1);
      state.team.splice(targetIndex, 0, item);
    },
    reorderTeam(state, action) {
      state.team = action.payload;
    },
    clearTeam(state) {
      state.team = [];
    },
  },
});

export const {
  addToTeam,
  removeFromTeam,
  toggleTeamMember,
  moveTeamMember,
  reorderTeam,
  clearTeam,
} = favoritesSlice.actions;

export const selectTeam = (state) => state.favorites.team;
export const selectIsTeamFull = (state) =>
  state.favorites.team.length >= MAX_TEAM_SIZE;
export const selectIsInTeam = (id) => (state) =>
  state.favorites.team.some((p) => p.id === id);

export default favoritesSlice.reducer;
