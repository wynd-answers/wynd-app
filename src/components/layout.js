import React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { CssBaseline, Container, Alert } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Footer from "./footer";
import Store from "../context/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/**
 * Theming Colors
 */
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#0A1929",
      paper: "#001E3C",
    },
  },
});

/**
 * Actual Layout
 */
const Layout = ({ children }) => {
  // Resolution needs to be desktop size
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Store>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{ body: { paddingTop: 50 } }} />
        {matches ? (
          <>
            {children}
            <Footer />
          </>
        ) : (
          <Container>
            <Alert severity="error">
              The App isn't optimized on your screen resolution yet. Please try
              the demo on another device!
            </Alert>
          </Container>
        )}
      </ThemeProvider>
    </Store>
  );
};

export default Layout;
