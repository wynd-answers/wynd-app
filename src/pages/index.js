import React from "react";
import Layout from "../components/layout";
import { Typography, Grid, Paper } from "@mui/material";
import Map from "../components/map";
import AirIcon from '@mui/icons-material/Air';
import Message from "../components/message";

const IndexPage = () => {
  return (
    <Layout>
      <Grid spacing={3} container>
        <Grid item xs={12}>
          <Typography variant="h3">
            <AirIcon fontSize="inherit" /> Wynd
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Message />
        </Grid>
        <Grid item sx={{ position: 'relative' }} xs={8}>
          <Paper variant="outlined" sx={{ height: '400px', position: 'relative' }}>
            <Map />
          </Paper>
        </Grid>
        <Grid item sx={{ position: 'relative' }} xs={4}>
          <Grid container>
            <Grid sx={{ mb: 2 }} xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography color="secondary" variant="h6">
                  Demo:
                </Typography>
                <Typography variant="body1">
                  Click on a hexagon in the map for some action!
                </Typography>
              </Paper>
            </Grid>
            <Grid xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography color="secondary" variant="h6">
                  How To
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default IndexPage;
