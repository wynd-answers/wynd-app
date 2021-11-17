import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import UsbIcon from "@mui/icons-material/Usb";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import ExtensionIcon from "@mui/icons-material/Extension";

import { connectKeplr } from "../utils/keplr";
import { GlobalContext } from "../context/store";

import { chain } from "../context/chain";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const renderBalance = (chain, balance) => {
    const precision = Math.pow(10, chain.decimals);
    return parseFloat(balance / precision).toFixed(2) + " " + chain?.coinDenom;
};


const actionConnect = async (type, dispatch) => {
    switch (type) {
        case "keplr":
            await connectKeplr(chain, dispatch);
            break;
        default:
    }
};

const ConnectWallet = () => {
    const [state, dispatch] = useContext(GlobalContext);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    if (state.address !== "" && state.signer) {
        return (
            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Chip label={state.address} variant="outlined" />
                <Chip label={renderBalance(chain, state.balance)} />
            </Stack>
        );
    }

    return (
        <>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={handleOpen}>
                    Connect Wallet
                </Button>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Connect Wallet
                    </Typography>
                    <List
                        sx={{
                            bgcolor: "background.paper",
                        }}
                    >
                        <ListItemButton
                            onClick={(e) =>
                                actionConnect("keplr", dispatch)
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <ExtensionIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Keplr" secondary="Chrome extension" />
                        </ListItemButton>
                        <ListItemButton
                            disabled
                            onClick={(e) =>
                                actionConnect("ble", dispatch)
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <BluetoothIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Ledger Nano X" secondary="Bluethoot" />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton
                            disabled
                            onClick={(e) =>
                                actionConnect("webusb", dispatch)
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <UsbIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Ledger Nano X or S" secondary="USB" />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                    </List>
                </Box>
            </Modal>
        </>
    );
};

export default ConnectWallet;