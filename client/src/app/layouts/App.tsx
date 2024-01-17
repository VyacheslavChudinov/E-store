import { useCallback, useEffect, useState } from "react";
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
import Loading from "./Loading.tsx";
import { useAppDispatch } from "../store/configureStore.ts";
import { fetchCurrentBasket } from "../../features/basket/basketSlice.ts";
import { fetchCurrentUser } from "../../features/account/accountSlice.ts";

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: darkMode ? "#121212" : "#eaeaea",
      },
    },
  });

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchCurrentBasket());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setIsLoading(false));
  }, [initApp]);

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
