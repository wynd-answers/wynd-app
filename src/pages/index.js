import React from "react";
import Layout from "../components/layout";
import { Typography, Grid } from "@mui/material";
import Tool from "../components/map/tool";
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
      </Grid>
      <Tool />
    </Layout >
  );
};

export default IndexPage;
