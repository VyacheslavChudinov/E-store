import Catalog from "../../features/catalog/Catalog.tsx";
import Header from "./Header.tsx";
import { CssBaseline, Container } from "@mui/material";

function App() {
  return (
    <>
      <div>
        <CssBaseline></CssBaseline>
        <Header></Header>

        <Container>
          <Catalog />
        </Container>
      </div>
    </>
  );
}

export default App;
