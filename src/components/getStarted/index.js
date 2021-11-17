import { Alert, Typography, TextField, Grid, Box, Modal, Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/store";
import StepOne from "./step1";
import StepTwo from "./step2";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const GetStarted = ({ open, handleClose }) => {
    const [state, dispatch] = useContext(GlobalContext);
    const [error, setError] = useState(false);
    const [step, setStep] = useState(0);

    const changeStep = (goTo) => {
        setStep(goTo);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {
                    {
                        0: <StepOne changeStep={changeStep} />,
                        "1": <StepTwo changeStep={changeStep} />
                    }[step]
                }
            </Box>
        </Modal>
    );
};

export default GetStarted;
