import React from "react";
import { Typography, Grid, Button } from "@mui/material";

/**
 * Step 3  of getStarted-Modal, user has WYND now and is ready to get started.
 */
const StepThree = ({ changeStep }) => {
  const continueHandler = () => {
    if (typeof changeStep === "function") {
      changeStep();
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">Let's go!</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body">
          You should have some WYND Balance on your wallet now. Happy testing!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={continueHandler}>
          Close
        </Button>
      </Grid>
    </Grid>
  );
};

export default StepThree;
