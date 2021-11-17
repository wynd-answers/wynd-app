import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/store";
import { Grid, Paper, Typography, IconButton, InputLabel, OutlinedInput, InputAdornment, FormControl } from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import Map from "./map";

const Tool = () => {
    const [state, dispatch] = useContext(GlobalContext);
    const [showInfo, setShowInfo] = useState(false);

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
            <Grid container sx={{ position: 'relative' }}>
                <Grid item sx={{ position: 'relative' }} xs={12}>
                    <Paper variant="outlined" sx={{ height: '600px', position: 'relative' }}>
                        <Map />
                    </Paper>
                </Grid>
                {(showInfo) &&
                    <Grid item sx={{ position: 'absolute', left: 0 }} xs={4}>
                        <Grid container >
                            <Grid item xs={12}>
                                <Paper variant="outlined" sx={{ p: 2 }}>
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
                                    <Typography color="secondary" variant="h6">
                                        Hexagon {state.chosenHex.hex}
                                    </Typography>
                                    <FormControl sx={{ mt: 2 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
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
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                }
                <Grid item sx={{ position: 'absolute', right: 0 }} xs={4}>
                    <Grid container >
                        <Grid sx={{ mb: 2 }} item xs={12}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography color="secondary" variant="h6">
                                    Demo:
                                </Typography>
                                <Typography variant="body1">
                                    Click on a hexagon in the map for some action!
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
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
        </>
    );
};

export default Tool;
