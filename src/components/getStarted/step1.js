import { Alert, Typography, TextField, Grid, Box, Modal, Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { connectKeplr } from "../../utils/keplr";
import { chain } from "../../context/chain";
import { GlobalContext } from "../../context/store";


const StepOne = ({ changeStep }) => {
    const [state, dispatch] = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);

    const continueHandler = async () => {
        if (typeof changeStep === 'function') {
            await connectKeplr(chain, dispatch).then(() => {
                if (state.address) {
                    changeStep(1);
                }
            }).catch((e) => {
                console.log(e)
            })
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

export default StepOne;
