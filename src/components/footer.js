import React from "react";
import {
  Grid,
  List,
  ListItem,
  Typography,
  Link,
  Divider,
  Container,
} from "@mui/material";
import { Twitter, GitHub, YouTube } from "@mui/icons-material";
import { StaticImage } from "gatsby-plugin-image";

/**
 * Simple Footer
 */
const Footer = () => {
  return (
    <Container>
      <Grid container sx={{ mt: 4 }}>
        <Grid item sx={{ py: 3 }} xs={12}>
          <Divider flexItem />
        </Grid>
        <Grid item xs={4} alignSelf="center">
          <StaticImage height={200} src="../images/logo.svg" alt="Logo" />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={2}>
          <Typography variant="h6">
            <strong>Junø</strong>
          </Typography>
          <List dense>
            <ListItem disablePadding>
              <Link
                color="inherit"
                sx={{ lineHeight: 1.5 }}
                underline="hover"
                target="_blank"
                variant="body1"
                href="https://junonetwork.io/"
              >
                Homepage
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link
                color="inherit"
                sx={{ lineHeight: 1.5 }}
                underline="hover"
                variant="body1"
                target="_blank"
                href="https://docs.junonetwork.io/"
              >
                Docs
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link
                color="inherit"
                sx={{ lineHeight: 1.5 }}
                underline="hover"
                target="_blank"
                variant="body1"
                href="https://github.com/CosmosContracts"
              >
                Github
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link
                color="inherit"
                sx={{ lineHeight: 1.5 }}
                underline="hover"
                variant="body1"
                target="_blank"
                href="https://discord.gg/jGAQubgCRD"
              >
                Discord
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link
                color="inherit"
                sx={{ lineHeight: 1.5 }}
                underline="hover"
                variant="body1"
                target="_blank"
                href="https://medium.com/@JunoNetwork"
              >
                Medium
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">
            <strong>Cosmos</strong>
          </Typography>
          <List dense>
            <ListItem disablePadding>
              <Link
                color="inherit"
                sx={{ lineHeight: 1.5 }}
                underline="hover"
                variant="body1"
                href="https://cosmos.network/"
                target="_blank"
              >
                Homepage
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link
                color="inherit"
                sx={{ lineHeight: 1.5 }}
                underline="hover"
                variant="body1"
                href="https://hackatom.org/"
                target="_blank"
              >
                Hackatom
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link
                color="inherit"
                sx={{ lineHeight: 1.5 }}
                underline="hover"
                variant="body1"
                href="https://discord.gg/cosmosnetwork"
                target="_blank"
              >
                Discord
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">
            <strong>Ressources</strong>
          </Typography>
          <List dense>
            <ListItem disablePadding>
              <Link
                color="inherit"
                sx={{ lineHeight: 1.5 }}
                underline="hover"
                variant="body1"
                href="https://github.com/cosmos/cosmjs"
                target="_blank"
              >
                cosmJS
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item sx={{ py: 3 }} xs={12}>
          <Divider flexItem />
        </Grid>
        <Grid item sx={{ pb: 3 }} display="flex" xs={6}>
          <Typography variant="body1">
            © Wynd {new Date().getFullYear()}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{ pb: 3 }}
          display="flex"
          justifyContent="flex-end"
          xs={6}
        >
          <Link
            sx={{ pl: 3 }}
            href="https://github.com/wynd-answers"
            color="inherit"
            underline="none"
            target="_blank"
          >
            <GitHub />
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
