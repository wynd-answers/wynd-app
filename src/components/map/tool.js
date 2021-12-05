import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "../../context/store";
import { Grid, Paper } from "@mui/material";
import { getInvestments } from "../../utils/client";
import { chain } from "../../context/chain";
import { h3ToGeo } from "h3-js";
import Map from "./map";
import Withdraw from "../withdraw";
import InvestedBox from "./investedBox";
import DetailsBox from "./detailsBox";

/**
 * Tool contains everything needed for the main-application, e.g. Map
 */
const Tool = () => {
  const [state, dispatch] = useContext(GlobalContext);
  const [showInfo, setShowInfo] = useState(false);
  const [totalInvested, setTotalInvested] = useState(0);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [investments, setInvestments] = useState([]);

  // Ref for details-box animation
  const containerRef = useRef(null);

  // Ref for map component
  const mapRef = useRef();

  const updateBalance = async () => {
    if (state.signingClient) {
      // Check if JUNO Balance already arrived from faucet
      const balance = await state.signingClient.getBalance(
        state.address,
        chain.coinMinimalDenom
      );

      dispatch({
        type: "SET_BALANCE_JUNO",
        payload: { balance: balance.amount },
      });
    }
    updateRows();
  };

  const updateRows = () => {
    // Get current investments, if wallet is connected
    if (state.signingClient) {
      getInvestments(state.address, chain.rpc)
        .then((res) => {
          const rowData = [];
          let totalAmount = 0;
          setInvestments(res.investments);
          res.investments.map((investment) => {
            // Sum up investment amount, if multiple investments for a hex
            if (rowData.find((el) => el.hex === investment.hex)) {
              rowData.find((el) => el.hex === investment.hex).amount +=
                parseInt(investment.amount) / 1000000;

              // Or just create a new entry
            } else {
              const rowEntry = {
                hex: investment.hex,
                amount: parseInt(investment.amount) / 1000000,
              };
              totalAmount += rowEntry.amount;
              rowData.push(rowEntry);
            }
          });

          setTotalInvested(totalAmount);
          setRows(rowData);
        })
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    updateBalance();

    // Show details-box, when a hex is chosen
    if (state.chosenHex) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
  }, [state.chosenHex, state.balance]);

  // Chose a hex from invested-table
  const clickInvested = (hex) => {
    // Set it as chosen hex
    dispatch({
      type: "SET_HEX",
      payload: hex,
    });

    // Calculate coords from hex
    const coords = h3ToGeo(hex);

    // Move map viewport to the chosen hex
    mapRef.current.goTo(coords[0], coords[1]);
  };

  return (
    <>
      <Grid
        ref={containerRef}
        container
        sx={{
          position: "relative",
          overflow: "hidden",
          maxWidth: "80%",
          m: "auto",
        }}
      >
        <Grid item sx={{ position: "relative" }} xs={12}>
          <Paper
            variant="outlined"
            sx={{ height: "600px", position: "relative" }}
          >
            <Map ref={mapRef} />
          </Paper>
        </Grid>
        <DetailsBox
          updateRows={updateBalance}
          rows={rows}
          containerRef={containerRef}
        />
        <Grid
          sx={{ position: "absolute", width: "auto", right: 0 }}
          container
          justifyContent="flex-end"
          justifyItems="flex-end"
        >
          <InvestedBox
            rows={rows}
            withdrawOpen={setWithdrawOpen}
            totalInvested={totalInvested}
            clickInvested={clickInvested}
            updateRows={updateBalance}
          />
        </Grid>
      </Grid>
      <Withdraw
        open={withdrawOpen}
        close={() => setWithdrawOpen(false)}
        investments={investments}
        updateRows={updateBalance}
      />
    </>
  );
};

export default Tool;
