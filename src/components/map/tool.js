import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "../../context/store";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Paper, Typography, IconButton, InputLabel, OutlinedInput, InputAdornment, FormControl, Slide, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from "@mui/material";
import { Close, Send, ExpandMore } from "@mui/icons-material";
import { getInvestments, investWynd } from "../../utils/client";
import { chain } from "../../context/chain";
import { h3ToGeo } from "h3-js";
import Map from "./map";
import Chart from "./chart";


/**
 * Tool contains everything needed for the main-application, e.g. Map
 */
const Tool = () => {
    const [state, dispatch] = useContext(GlobalContext);
    const [showInfo, setShowInfo] = useState(false);
    const [amount, setAmount] = useState(null);
    const [rows, setRows] = useState([]);
    const [totalInvested, setTotalInvested] = useState(0);
    const [loadingInvest, setLoadingInvest] = useState(false);

    // Ref for details-box animation
    const containerRef = useRef(null);

    // Ref for map component
    const mapRef = useRef();

    useEffect(() => {

        // Get current investments, if wallet is connected
        if (state.signingClient) {
            getInvestments(state.address, chain.rpc)
                .then(res => {
                    const rowData = [];
                    let totalAmount = 0;
                    res.investments.map(investment => {
                        const rowEntry = {
                            hex: investment.hex,
                            amount: parseInt(investment.amount) / 1000000
                        }
                        totalAmount += rowEntry.amount;
                        rowData.push(rowEntry);
                    });
                    setTotalInvested(totalAmount);
                    setRows(rowData);
                })
                .catch(e => console.log(e))
        }

        // Show details-box, when a hex is chosen
        if (state.chosenHex) {
            setShowInfo(true);
        } else {
            setShowInfo(false);
        }
    }, [state.chosenHex, state.signingClient]);

    // Invest to hex
    const handleSend = async () => {
        setLoadingInvest(true);
        try {
            const res = await investWynd(state.signingClient, state.address, state.chosenHex, amount * 1000000);
            dispatch({
                type: "SET_MESSAGE",
                payload: {
                    message: `Successfully invested ${amount} WYND to HEX ${state.chosenHex} in TX ${res.transactionHash}`,
                    severity: "success",
                },
            });
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
                                {!loadingInvest ?
                                    <>
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
                                                <strong>Invested Amount: </strong>
                                                {
                                                    rows.find(el => el.hex === state.chosenHex)
                                                        ? rows.find(el => el.hex === state.chosenHex).amount
                                                        : 0
                                                }
                                                WYND
                                            </Typography>
                                        </Grid>
                                        <Grid xs={12}>
                                            <FormControl sx={{ mt: 2 }}>
                                                <InputLabel htmlFor="outlined-adornment-amount">Invest some WYND!</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-amount"
                                                    type="text"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
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
                                    </>
                                    :
                                    <Grid
                                        sx={{ px: 4 }}
                                        xs={12}
                                    >
                                        <CircularProgress size={200} />
                                    </Grid>
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                </Slide >
                <Grid item sx={{ position: 'absolute', right: 0 }} xs={4}>
                    <Grid sx={{ height: '100%' }} container >
                        <Paper variant="outlined" sx={{ p: 0, height: '100%' }}>
                            <Accordion disabled={rows.length === 0}>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Currently Invested: <strong>{totalInvested} WYND</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body">
                                        <TableContainer component={Paper}>
                                            <Table>
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
            </Grid >
        </>
    );
};

export default Tool;
