import "../../app/layout/styles.css";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../app/layout/styles.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  function handleChange() {
    setDarkMode(!darkMode);
  }

  const palleteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === "light" ? "#fafafa" : "#212121",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header dark={darkMode} onChangeHandler={handleChange} />
      <Container>
        {/* <Catalog /> */}

        {/* using outlet when using route */}
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
