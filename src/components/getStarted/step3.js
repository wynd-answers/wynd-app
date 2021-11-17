import { Alert, Typography, TextField, Grid, Box, Modal, Button } from "@mui/material";
import React, { useState, useContext } from "react";

const StepThree = ({ changeStep }) => {

    const continueHandler = () => {
        if (typeof changeStep === 'function') {
            changeStep(1);
        }
    }

    return (
        <>
            <Typography variant="body">
                Hi, seems that you're using WYND for the first time! Follow some simple steps to get started!
            </Typography>
            <Button variant="contained" onClick={continueHandler}>Let's go!</Button>
        </>
    );
};

export default StepThree;