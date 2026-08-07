import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home.jsx";
import PokemonDetail from "../pages/PokemonDetail.jsx";
import Team from "../pages/Team.jsx";
import Compare from "../pages/Compare.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:name" element={<PokemonDetail />} />
      <Route path="/team" element={<Team />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
