import { useState } from "react";
import Header from "./Header.tsx";
import {
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: darkMode ? "#121212" : "#eaeaea",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <Header darkMode={darkMode} setDarkMode={setDarkMode}></Header>

        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
