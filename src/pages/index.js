import React from "react";
import Layout from "../components/layout";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Typography, Grid, CssBaseline, Paper } from "@mui/material";
import Map from "../components/map";
import AirIcon from '@mui/icons-material/Air';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const IndexPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Grid spacing={3} container>
          <Grid item xs={12}>
            <Typography variant="h3">
              <AirIcon fontSize="inherit" /> Wynd
            </Typography>
          </Grid>
          <Grid item sx={{ position: 'relative' }} xs={8}>
            <Paper variant="outlined" rounded sx={{ height: '400px', position: 'relative' }}>
              <Map />
            </Paper>
          </Grid>
          <Grid item sx={{ position: 'relative' }} xs={4}>
            <Paper variant="outlined" rounded sx={{ p: 2 }}>
              <Typography variant="h6">
                How To
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </ThemeProvider>
  );
};

export default IndexPage;
