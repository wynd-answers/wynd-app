import React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Container } from "@mui/material";
import Footer from "./footer";

const Layout = ({ children }) => {

    return (
        <>
            <GlobalStyles styles={{ body: { paddingTop: 50 } }} />
            <Container>
                {children}
                <Footer />
            </Container>
        </>
    );
};

export default Layout;
