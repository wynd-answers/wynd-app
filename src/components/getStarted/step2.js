import {
  Alert,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { requestWynd, requestJuno, getWyndBalance } from "../../utils/client";
import { GlobalContext } from "../../context/store";
import { chain } from "../../context/chain";

/**
 * Step 2 of getStarted-Modal
 */
const StepTwo = ({ changeStep }) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState("");

  // Check if we even need to call faucets
  const init = async () => {
    setLoadingStatus("Getting current WYND Balance...");
    const bal = await getWyndBalance(state.address, chain.rpc);

    dispatch({
      type: "SET_BALANCE",
      payload: { balance: bal.balance / 1000000 },
    });

    setLoading(false);
  };

  // When Balance changes, initialize again
  useEffect(() => {
    init();
  }, [state.balance]);

  if (state.balance > 0) {
    changeStep(2);
  }

  /**
   * Faucet Action
   */
  const continueHandler = async () => {
    setLoading(true);

    // If insufficient ujuno...
    if (state.junoBalance == 0) {
      setLoadingStatus("Requesting Juno Tokens from faucet...");

      // Request some
      requestJuno(state.address, "ujunox");

      // If request was successfull, wait for tokens on wallet
      setLoadingStatus("Waiting for Juno Tokens from faucet...");

      const request = async () => {
        // Check if JUNO Balance already arrived from faucet
        const balance = await state.signingClient.getBalance(
          state.address,
          chain.coinMinimalDenom
        );

        dispatch({
          type: "SET_BALANCE_JUNO",
          payload: { balance: balance.amount },
        });

        // If JUNO Balance is there...
        if (balance.amount > 5000) {
          // Stop checking...
          stopInterval();

          // .. and continue with WYND
          setLoadingStatus("Requesting WYND Faucet!");
          executeWyndFaucet();
        }
      };

      const interval = setInterval(request, 1000);
      const stopInterval = () => clearInterval(interval);

      // if enough juno
    } else {
      setLoadingStatus("Requesting WYND Faucet!");

      // Request WYND Tokens
      executeWyndFaucet();
    }
  };

  const executeWyndFaucet = async () => {
    // Request WYND
    requestWynd(state.signingClient, state.address);

    const request = async () => {
      setLoadingStatus("Waiting for WYND Balance!");
      const res = await getWyndBalance(state.address, chain.rpc);

      dispatch({
        type: "SET_BALANCE",
        payload: { balance: res.balance / 100000 },
      });

      if (state.balance > 5000) {
        setLoadingStatus("Got em!...");
        stopInterval();
      }
    };

    const interval = setInterval(request, 5000);
    const stopInterval = () => clearInterval(interval);
  };

  return (
    <>
      {loading ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress size={200} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >
                {loadingStatus}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="success">Wallet successfully connected!</Alert>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Oh, that wallet looks empty!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body">
              Your current WYND Balance seems to be 0! Since we're still on
              testnet, feel free to get some tokens from our faucet!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={continueHandler}>
              Gimme Gimme!
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default StepTwo;
