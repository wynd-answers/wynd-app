import { CircularProgress, Typography, Grid, Alert, Button, Link } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { connectKeplr, checkExtensionAndBrowser } from "../../utils/keplr";
import { chain } from "../../context/chain";
import { GlobalContext } from "../../context/store";


const StepOne = ({ changeStep }) => {
    const [state, dispatch] = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [keplrInstalled, setKeplrInstalled] = useState(true);



    const continueHandler = async () => {
        setLoading(true);
        if (typeof changeStep === 'function') {
            await connectKeplr(chain, dispatch).then(() => {
                if (state.address && state.balance === 0) {
                    changeStep(1);
                } else if (state.address && state.balance > 0) {
                    changeStep(2);
                }
            }).catch((e) => {
                console.log(e);
            })

        } else {

        }
        setLoading(false);
    }

    useEffect(() => {
        if (!checkExtensionAndBrowser()) {
            setKeplrInstalled(false);
        }
        if (state.address && state.balance === 0) {
            changeStep(1);
        }
        if (state.balance > 0) {
            changeStep(2);
        }
    }, [state.address, state.balance]);


    return (
        <Grid container spacing={3}>
            {!keplrInstalled &&
                <Grid item xs={12}>
                    <Alert severity="error">To use this tool, you need to have <Link href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap">Keplr</Link> installed!</Alert>
                </Grid>
            }
            {loading ?
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <CircularProgress size={200} />
                </Grid>
                :
                <>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            First time?
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body">
                            Hi, seems that you're using WYND for the first time! Follow some simple steps to get started!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" disabled={!keplrInstalled} onClick={continueHandler}>Connect wallet!</Button>
                    </Grid>
                </>
            }
        </Grid>
    );
};

export default StepOne;
