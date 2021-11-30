import { Box, Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/store";
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

/**
 * Get started component
 * Helps new users to get some WYND Tokens / JUNO Tokens to be able to test the application.
 */
const GetStarted = () => {
  const [state] = useContext(GlobalContext);
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(true);

  const changeStep = (goTo) => {
    setStep(goTo);
  };

  const close = () => {
    setOpen(false);
  };

  // If connected already and have balance, just close the modal
  useEffect(() => {
    if (state.balance > 0 && localStorage.getItem("keplrConnected")) {
        close();
    }
  });

  return (
    <Modal
      open={open}
      aria-labelledby="Get Started"
      aria-describedby="Helps new users to get some WYND Tokens / JUNO Tokens to be able to test the application."
    >
      <Box sx={style}>
        {
          {
            0: <StepOne changeStep={changeStep} />,
            1: <StepTwo changeStep={changeStep} />,
            2: <StepThree changeStep={close} />,
          }[step]
        }
      </Box>
    </Modal>
  );
};

export default GetStarted;
