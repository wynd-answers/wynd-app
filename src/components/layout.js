import React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Container, CssBaseline } from "@mui/material";
import Footer from "./footer";
import Store from "../context/store";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StaticQuery } from "gatsby";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#0A1929',
            paper: '#001E3C',
        },
    },
});

const Layout = ({ children }) => {
    return (
        <Store>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles styles={{ body: { paddingTop: 50 } }} />
                <Container>
                    {children}
                    <Footer />
                </Container>
            </ThemeProvider>
        </Store>
    );
};

export default Layout;
