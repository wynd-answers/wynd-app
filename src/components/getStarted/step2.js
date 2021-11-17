import { Alert, Typography, TextField, Grid, Box, Modal, Button } from "@mui/material";
import React, { useState, useContext } from "react";

const StepTwo = ({ changeStep }) => {

    const continueHandler = () => {
        if (typeof changeStep === 'function') {
            alert("Gimme Giimme!");
        }
    }

    return (
        <>
            <Typography variant="body">
                You current WYND Balance seems to be 0! Since we're still on testnet, feel free to get some tokens from our faucet!
            </Typography>
            <Button variant="contained" onClick={continueHandler}>Gimme Gimme!</Button>
        </>
    );
};

export default StepTwo;