import Header from "./components/Header.jsx";
import AppRouter from "./routes/AppRouter.jsx";
import { Main } from "./App.styles.js";

function App() {
  return (
    <>
      <Header />
      <Main>
        <AppRouter />
      </Main>
    </>
  );
}

export default App;
