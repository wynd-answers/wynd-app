import React, { useState, useContext, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Grid,
  Alert,
  Button,
  Link,
} from "@mui/material";
import { connectKeplr, checkExtensionAndBrowser } from "../../utils/keplr";
import { chain } from "../../context/chain";
import { GlobalContext } from "../../context/store";

/**
 * Step 1 of getStarted-Modal
 */
const StepOne = ({ changeStep }) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [keplrInstalled, setKeplrInstalled] = useState(true);

  // Fires when continue-button has been clicked
  const continueHandler = async () => {
    // Show loading indicator
    setLoading(true);

    if (typeof changeStep === "function") {
      // Wait for kelpr browser extension
      await connectKeplr(chain, dispatch)
        .then(() => {
          // Remember, that Wallet is connected
          localStorage.setItem("keplrConnected", "1");

          // If WYND Balance is 0...
          if (state.address && state.balance === 0) {
            // ..continue with step 2 to get some
            changeStep(1);

            // IF Wynd is on the wallet
          } else if (state.address && state.balance > 0) {
            // Skip to the last step
            changeStep(2);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

    // Done, hide loading indicator
    setLoading(false);
  };

  // Check Browser & Extension and send users to steps
  useEffect(() => {
    if (!checkExtensionAndBrowser()) {
      setKeplrInstalled(false);
    }
    if (localStorage.getItem("keplrConnected")) {
      connectKeplr(chain, dispatch);
    }
    if (state.address && state.balance === 0) {
      changeStep(1);
    }
    if (state.balance > 0) {
      changeStep(2);
    }
    setLoading(false);
  }, [state.address, state.balance]);

  return (
    <Grid container spacing={3}>
      {!keplrInstalled && (
        <Grid item xs={12}>
          <Alert severity="error">
            To use this tool, you need to have{" "}
            <Link href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap">
              Keplr
            </Link>{" "}
            installed!
          </Alert>
        </Grid>
      )}
      {loading ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={200} />
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">First time?</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body">
              Hi, seems that you're using WYND for the first time! Follow some
              simple steps to get started!
            </Typography>
            <Typography variant="body2" sx={{ display: "block", mt: 2 }}>
              ...or{" "}
              <Link
                target="_blank"
                href="https://github.com/wynd-answers/wynd-app/blob/main/README.md"
              >
                Read more about the Project
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              disabled={!keplrInstalled}
              onClick={continueHandler}
            >
              Connect wallet!
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default StepOne;
