import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AppRoutes } from "./routes";
import { RootState } from "./stores/store";
import GlobalStyle from "./styles/globalStyles";
import "./styles/reset.css";
import { themes } from "./styles/theme";

function App() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={themes[theme]}>
          <GlobalStyle />

          <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
