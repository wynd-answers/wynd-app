import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import StepOne from "./step1";
import StepTwo from "./step2";
import StepThree from "./step3";

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

const GetStarted = () => {
    const [step, setStep] = useState(0);
    const [open, setOpen] = useState(true);

    const changeStep = (goTo) => {
        setStep(goTo);
    }

    const close = () => {
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {
                    {
                        0: <StepOne changeStep={changeStep} />,
                        1: <StepTwo changeStep={changeStep} />,
                        2: <StepThree changeStep={close} />
                    }[step]
                }
            </Box>
        </Modal>
    );
};

export default GetStarted;
