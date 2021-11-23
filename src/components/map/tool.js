import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "../../context/store";
import { Grid, Paper, Typography, IconButton, InputLabel, OutlinedInput, InputAdornment, FormControl, Slide } from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import { Line } from 'react-chartjs-2';
import Map from "./map";
import Chart from "./chart";

const Tool = () => {
    const [state, dispatch] = useContext(GlobalContext);
    const [showInfo, setShowInfo] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (state.chosenHex.hex) {
            setShowInfo(true);
        } else {
            setShowInfo(false);
        }
    }, [state.chosenHex]);

    const handleSend = () => {
        dispatch({
            type: "SET_MESSAGE",
            payload: {
                message: "Todo: Not Fully implemented yet!",
                severity: "warning",
            },
        });
    }

    return (
        <>
            <Grid ref={containerRef} container sx={{ position: 'relative', overflow: 'hidden' }}>
                <Grid item sx={{ position: 'relative' }} xs={12}>
                    <Paper variant="outlined" sx={{ height: '600px', position: 'relative' }}>
                        <Map />
                    </Paper>
                </Grid>
                <Slide container={containerRef.current} direction="right" in={showInfo} mountOnEnter unmountOnExit>
                    <Grid item sx={{ position: 'absolute', left: 0, height: '100%' }} xs={4}>
                        <Grid sx={{ height: '100%' }} container >
                            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                                <Grid item xs={12}>
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        sx={{ position: 'absolute', right: '2px', top: '2px' }}
                                        onClick={() => {
                                            setShowInfo(false);
                                        }}
                                    >
                                        <Close fontSize="inherit" />
                                    </IconButton>
                                    <Typography sx={{ mb: 2 }} color="white" variant="h6">
                                        Hexagon {state.chosenHex.hex}
                                    </Typography>
                                    <Paper sx={{ mb: 2 }}>
                                        <Chart hex={state.chosenHex.hex} />
                                    </Paper>
                                    <Typography variant="body">
                                        <strong>Currently Invested: </strong> 0 <br />
                                        <strong>Invested Amount:</strong> 1.000 WYND
                                    </Typography>
                                    <FormControl sx={{ mt: 2 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Invest some WYND!</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            type="text"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => handleSend()}
                                                        edge="end"
                                                    >
                                                        <Send />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Amount"
                                        />
                                    </FormControl>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Slide>
            </Grid>
        </>
    );
};

export default Tool;
