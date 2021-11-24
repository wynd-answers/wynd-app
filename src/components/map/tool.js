import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "../../context/store";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Paper, Typography, IconButton, InputLabel, OutlinedInput, InputAdornment, FormControl, Slide, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Close, Send, ExpandMore } from "@mui/icons-material";
import { h3ToGeo } from "h3-js";
import Map from "./map";
import Chart from "./chart";


/**
 * Tool contains everything needed for the main-application, e.g. Map
 */
const Tool = () => {
    const [state, dispatch] = useContext(GlobalContext);
    const [showInfo, setShowInfo] = useState(false);

    // Ref for details-box animation
    const containerRef = useRef(null);

    // Ref for map component
    const mapRef = useRef();

    // Create Dummy Data for invested table
    function createData(hex, amount) {
        return { hex, amount };
    }
    const rows = [
        createData('83260efffffffff', 2000),
        createData('8344c6fffffffff', 1000),
        createData('832ab0fffffffff', 1000),
        createData('8326b6fffffffff', 1000),
    ];

    // Show details-box, when a hex is chosen
    useEffect(() => {
        if (state.chosenHex) {
            setShowInfo(true);
        } else {
            setShowInfo(false);
        }
    }, [state.chosenHex]);

    // Invest to hex
    const handleSend = () => {
        dispatch({
            type: "SET_MESSAGE",
            payload: {
                message: "Todo: Not Fully implemented yet!",
                severity: "warning",
            },
        });
    }

    // Chose a hex from invested-table
    const clickInvested = (hex) => {

        // Set it as chosen hex
        dispatch({
            type: "SET_HEX",
            payload: hex
        });

        // Calculate coords from hex
        const coords = h3ToGeo(hex);

        // Move map viewport to the chosen hex
        mapRef.current.goTo(coords[0], coords[1]);
    }

    return (
        <>
            <Grid ref={containerRef} container sx={{ position: 'relative', overflow: 'hidden', maxWidth: '80%', m: 'auto' }}>
                <Grid item sx={{ position: 'relative' }} xs={12}>
                    <Paper variant="outlined" sx={{ height: '600px', position: 'relative' }}>
                        <Map ref={mapRef} />
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
                                        Hexagon {state.chosenHex}
                                    </Typography>
                                    <Paper sx={{ mb: 2 }}>
                                        <Chart hex={state.chosenHex} />
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
                <Grid item sx={{ position: 'absolute', right: 0 }} xs={4}>
                    <Grid sx={{ height: '100%' }} container >
                        <Paper variant="outlined" sx={{ p: 0, height: '100%' }}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Currently Invested: <strong>5000 WYND</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body">
                                        <TableContainer component={Paper}>
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell><strong>Hex</strong></TableCell>
                                                        <TableCell align="right"><strong>Amount</strong></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.map((row) => (
                                                        <TableRow
                                                            hover
                                                            onClick={() => clickInvested(row.hex)}
                                                            key={row.hex}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {row.hex}
                                                            </TableCell>
                                                            <TableCell align="right">{row.amount} WYND</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Tool;
