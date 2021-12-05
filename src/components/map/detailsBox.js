import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../context/store";
import {
  Typography,
  IconButton,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Grid,
  Paper,
  Divider,
  CircularProgress,
  Slide,
} from "@mui/material";
import { Send, Close } from "@mui/icons-material";
import Chart from "./chart";
import { investWynd } from "../../utils/client";
import { chain } from "../../context/chain";

/**
 * Chart in the detail-overlay for a single hex
 */
const DetailsBox = ({ rows, containerRef, updateRows }) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [amount, setAmount] = useState(null);
  const [loadingInvest, setLoadingInvest] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Invest to hex
  const handleSend = async () => {
    // If outdated data, show error
    if (state.outdatedHexData) {
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          message: `You may only invest in hexagons whose last measurement was no longer than ${process.env.GATSBY_DATA_MAX_AGE} days ago.`,
          severity: "error",
        },
      });
      return;
    }

    // If no amount entered, show error
    if (!amount || amount === 0) {
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          message: `Please enter the amount you want to invest.`,
          severity: "error",
        },
      });
      return;
    }

    // Invest!
    setLoadingInvest(true);
    try {
      const res = await investWynd(
        state.signingClient,
        state.address,
        state.chosenHex,
        amount * 1000000
      );
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          message: `Successfully invested ${amount} WYND to HEX ${state.chosenHex} in TX ${res.transactionHash}`,
          severity: "success",
        },
      });
      updateRows();
    } catch (e) {
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          message: `${e}`,
          severity: "error",
        },
      });
    }

    setLoadingInvest(false);
  };

  useEffect(() => {
    // Show details-box, when a hex is chosen
    if (state.chosenHex) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
  }, [state.chosenHex]);

  return (
    <Slide
      container={containerRef.current}
      direction="right"
      in={showInfo}
      mountOnEnter
      unmountOnExit
    >
      <Grid item sx={{ position: "absolute", left: 0, height: "100%" }} xs={4}>
        <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
          <Grid sx={{ height: "100%" }} container>
            {!loadingInvest ? (
              <>
                <Grid item xs={12}>
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    sx={{ position: "absolute", right: "2px", top: "2px" }}
                    onClick={() => {
                      setShowInfo(false);
                    }}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                  <Typography sx={{ mb: 2 }} color="white" variant="h6">
                    Hexagon <strong>{state.chosenHex}</strong>
                  </Typography>
                  <Divider sx={{ my: 3 }} />
                  <Paper sx={{ mb: 2 }}>
                    <Chart hex={state.chosenHex} />
                  </Paper>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="body">
                    <strong>Invested Amount: </strong>
                    {rows.find((el) => el.hex === state.chosenHex)
                      ? rows.find((el) => el.hex === state.chosenHex).amount
                      : 0}{" "}
                    WYND
                  </Typography>
                  <br />
                  <Typography variant="body">
                    <strong>Available Amount: </strong>
                    {state.balance} WYND
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {!state.outdatedHexData ? (
                    <FormControl sx={{ mt: 2 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Invest some WYND!
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={() => handleSend()} edge="end">
                              <Send />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Amount"
                      />
                    </FormControl>
                  ) : (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle2" color="red">
                        You may only invest in hexagons whose last measurement
                        was no longer than {process.env.GATSBY_DATA_MAX_AGE}{" "}
                        days ago.
                      </Typography>
                    </>
                  )}
                </Grid>
              </>
            ) : (
              <Grid sx={{ px: 4 }} xs={12}>
                <CircularProgress size={200} />
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Slide>
  );
};

export default DetailsBox;
