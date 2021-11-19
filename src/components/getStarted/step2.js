import { Alert, Typography, Grid, CircularProgress, Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { requestWynd, getWyndBalance } from "../../utils/faucet";
import { GlobalContext } from "../../context/store";
import { chain } from "../../context/chain";

const StepTwo = ({ changeStep }) => {
    const [state, dispatch] = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);

    const init = async () => {
        const bal = await getWyndBalance(state.address, chain.rpc);

        dispatch({
            type: "SET_BALANCE",
            payload: { balance: bal.balance / 100000 },
        });

        setLoading(false);
    }

    init();

    if (state.balance > 0) {
        changeStep(2);
    }

    const continueHandler = async () => {
        setLoading(true);
        requestWynd(state.signingClient, state.address)
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }

    return (
        <>
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
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Alert severity="success">Wallet successfully connected!</Alert>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Oh, that wallet looks empty!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body">
                            Your current WYND Balance seems to be 0! Since we're still on testnet, feel free to get some tokens from our faucet!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={continueHandler}>Gimme Gimme!</Button>
                    </Grid>
                </Grid>
            }
        </>
    );
};

export default StepTwo;