import { useEffect, useState } from "react";
import Header from "./Header.tsx";
import {
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../context/StoreContext.tsx";
import { getCookie } from "../utils/cookie.ts";
import agent from "../api/agent.ts";
import Loading from "./Loading.tsx";

function App() {
  const { setBasket } = useStoreContext();
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (!buyerId) {
      setIsLoading(false);

      return;
    }

    agent.Basket.get()
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [setBasket]);

  if (isLoading) {
    return <Loading message="Initializing..."></Loading>;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer
          theme="colored"
          position="bottom-right"
        ></ToastContainer>
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
