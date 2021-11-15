import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/store";
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Collapse, IconButton } from "@mui/material";

const Message = () => {
    const [state] = useContext(GlobalContext);
    const [open, setOpen] = useState(true);
 
    useEffect(() => {
        setOpen(true);
    }, [state.message]);
    return (
        <>
            {state.message && (
                <Collapse in={open}>
                    <Alert sx={{ mb: 3 }} severity={state.message.severity}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {state.message.text}
                    </Alert>
                </Collapse>
            )}
        </>
    );
};

export default Message;
