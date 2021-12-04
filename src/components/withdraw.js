import {
  Box,
  Typography,
  Grid,
  Modal,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/store";
import { DataGrid } from "@mui/x-data-grid";
import { ArrowCircleDown, ArrowCircleUp } from "@mui/icons-material";
import { withdrawWynd } from "../utils/client";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
};

const compareValues = (a, b) => ((a - b) / a) * 100.0;

const columns = [
  { field: "date_invested", headerName: "Date Invested", width: 100 },
  { field: "hex", headerName: "Hexagon", width: 100 },
  { field: "invested_wynd", headerName: "Invested WYND", width: 90 },
  { field: "value_at_invest", headerName: "Invested WYND", width: 130 },
  { field: "value_now", headerName: "Invested WYND", width: 130 },
  {
    field: "changed",
    headerName: "Value Changed By",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    renderCell: (params) => {
      return (
        <>
          {params.value > 0 ? (
            <>
              <ArrowCircleUp color="error" />{" "}
              <Typography color="red" sx={{ pl: 1 }}>
                {params.value} %
              </Typography>
            </>
          ) : (
            <>
              <ArrowCircleDown color="success" />{" "}
              <Typography color="green" sx={{ pl: 1 }}>
                {params.value} %
              </Typography>
            </>
          )}
        </>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    date_invested: "11/29/2021",
    hex: "832675fffffffff",
    invested_wynd: 1000,
    value_at_invest: 1839.3493,
    value_now: 1748.3948,
    changed: compareValues(1748.3948, 1839.3493).toFixed(2),
  },
  {
    id: 2,
    date_invested: "11/29/2021",
    hex: "832675fffffffff",
    invested_wynd: 1000,
    value_at_invest: 1748.3948,
    value_now: 1839.3493,
    changed: compareValues(1839.3493, 1748.3948).toFixed(2),
  },
  {
    id: 3,
    date_invested: "11/29/2021",
    hex: "832675fffffffff",
    invested_wynd: 1000,
    value_at_invest: 1839.3493,
    value_now: 1748.3948,
    changed: compareValues(1748.3948, 1839.3493).toFixed(2),
  },
  {
    id: 4,
    date_invested: "11/29/2021",
    hex: "832675fffffffff",
    invested_wynd: 1000,
    value_at_invest: 1839.3493,
    value_now: 1748.3948,
    changed: compareValues(1748.3948, 1839.3493).toFixed(2),
  },
  {
    id: 5,
    date_invested: "11/29/2021",
    hex: "832675fffffffff",
    invested_wynd: 1000,
    value_at_invest: 1839.3493,
    value_now: 1748.3948,
    changed: compareValues(1748.3948, 1839.3493).toFixed(2),
  },
  {
    id: 6,
    date_invested: "11/29/2021",
    hex: "832675fffffffff",
    invested_wynd: 1000,
    value_at_invest: 1839.3493,
    value_now: 1748.3948,
    changed: compareValues(1748.3948, 1839.3493).toFixed(2),
  },
];

/**
 * Withdraw Modal Component
 * Shows a detailed list of investments and possible withdraws
 */
const Withdraw = ({ open, close }) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);

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
                rows={rows}
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
