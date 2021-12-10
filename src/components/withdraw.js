import {
  Box,
  Typography,
  Grid,
  Modal,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/store";
import { DataGrid } from "@mui/x-data-grid";
import { ArrowCircleDown, ArrowCircleUp, Check, Close } from "@mui/icons-material";
import { withdrawWynd } from "../utils/client";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
};

const compareValues = (a, b) => ((a - b) / a) * 100.0;

const columns = [
  {
    field: "invested",
    headerName: "Date Invested",
    width: 100,
    type: "date",
    valueFormatter: (params) => {
      return new Date(parseInt(params.value) * 1000).toLocaleDateString(
        "en-US"
      );
    },
  },
  { field: "hex", headerName: "Hexagon", width: 100 },
  {
    field: "amount",
    headerName: "Invested WYND",
    width: 90,
    renderCell: (params) => params.value / 1000000 + " WYND",
  },
  {
    field: "baseline_index",
    headerName: "Invested at Index",
    width: 130,
    renderCell: (params) => parseFloat(params.value).toFixed(4),
  },
  {
    field: "latest_index",
    headerName: "Latest Index",
    width: 130,
    renderCell: (params) => parseFloat(params.value.value).toFixed(4),
  },
  {
    field: "withdraw_amount",
    headerName: "Current Value",
    renderCell: (params) => params.value / 1000000 + " WYND",
  },
  {
    field: "changed",
    headerName: "Value Changed By",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    renderCell: (params) => {
      const compared = compareValues(
        parseFloat(params.getValue(params.id, "latest_index").value),
        parseFloat(params.getValue(params.id, "baseline_index"))
      ).toFixed(3);

      return (
        <>
          {compared > 0 ? (
            <>
              <ArrowCircleUp color="error" />{" "}
              <Typography color="red" sx={{ pl: 1 }}>
                {compared} %
              </Typography>
            </>
          ) : (
            <>
              <ArrowCircleDown color="success" />{" "}
              <Typography color="green" sx={{ pl: 1 }}>
                {compared} %
              </Typography>
            </>
          )}
        </>
      );
    },
  },
  {
    field: "can_withdraw",
    headerName: "Ready to withdraw",
    renderCell: (params) => {
      return (
        <>
          {params.value ? <Check color="success" /> : <Close color="error" />}
        </>
      );
    },
  },
];
/**
 * Withdraw Modal Component
 * Shows a detailed list of investments and possible withdraws
 */
const Withdraw = ({ open, close, investments, updateRows }) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);

  const invArr = investments.map((obj, i) => ({ ...obj, id: `investment-${i}` }));
  const handleWithdraw = async () => {
    // Withdraw
    setLoadingWithdraw(true);
    try {
      const res = await withdrawWynd(state.signingClient, state.address);
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          message: `Successfully withdrawed all in TX ${res.transactionHash}`,
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
    updateRows();
    setLoadingWithdraw(false);
    close();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="Get Started"
      aria-describedby="Helps new users to get some WYND Tokens / JUNO Tokens to be able to test the application."
    >
      <Box sx={style}>
        {loadingWithdraw ? (
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress size={200} />
          </Grid>
        ) : (
          <Grid container>
            <Grid alignSelf="center" item xs={8}>
              <Typography variant="h6">Investments</Typography>
            </Grid>
            <Grid sx={{ textAlign: "right" }} item xs={4}>
              <Button
                onClick={handleWithdraw}
                sx={{ color: "white" }}
                variant="outlined"
                size="large"
              >
                Withdraw All
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mt: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ py: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                disableSelectionOnClick
                autoHeight
                rows={invArr}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

export default Withdraw;
