import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import {
  Redeem,
  ExpandMore,
  LastPage,
  FirstPage,
  KeyboardArrowRight,
  KeyboardArrowLeft,
} from "@mui/icons-material";
import { GlobalContext } from "../../context/store";

/**
 * Pagination for the table
 */
const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
};

/**
 * Quick Overview about investments
 */
const InvestedBox = ({ rows, withdrawOpen, totalInvested, clickInvested }) => {
  const [state] = useContext(GlobalContext);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 4;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const setWithdrawOpen = () => {
    withdrawOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const StyledButton = withStyles({
    root: {
      backgroundColor: "#001E3C",
      padding: "0.78rem",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      border: "1px solid rgba(255, 255, 255, 0.12);",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#0A1929",
        "& svg": {
          animation: `$shake 0.5s`,
        },
      },
    },
    "@keyframes shake": {
      "0%": { transform: "translate(1px, 1px) rotate(0deg);" },
      "10%": { transform: "translate(-1px, -2px) rotate(-1deg);" },
      "20%": { transform: "translate(-3px, 0px) rotate(1deg);" },
      "30%": { transform: "translate(3px, 2px) rotate(0deg);" },
      "40%": { transform: "translate(1px, -1px) rotate(1deg);" },
      "50%": { transform: "translate(-1px, 2px) rotate(-1deg);" },
      "60%": { transform: "translate(-3px, 1px) rotate(0deg);" },
      "70%": { transform: "translate(3px, 1px) rotate(-1deg);" },
      "80%": { transform: "translate(-1px, -1px) rotate(1deg);" },
      "90%": { transform: "translate(1px, 2px) rotate(0deg);" },
      "100%": { transform: "translate(1px, -2px) rotate(-1deg);" },
    },
  })(Button);

  return (
    <>
      <Grid item>
        <Paper>
          <Tooltip title="Withdraw">
            <StyledButton
              size="large"
              variant="contained"
              onClick={() => setWithdrawOpen(true)}
            >
              <Redeem />
            </StyledButton>
          </Tooltip>
        </Paper>
      </Grid>
      <Grid item>
        <Grid sx={{ height: "100%" }} container>
          <Paper
            square
            variant="outlined"
            sx={{ p: 0, height: "100%", borderBottomLeftRadius: 0 }}
          >
            <Accordion
              square
              sx={{ height: "100%" }}
              disabled={rows.length === 0}
            >
              <AccordionSummary
                sx={{ borderBottomLeftRadius: 0 }}
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  Currently Invested: <strong>{totalInvested} WYND</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body">
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <strong>Hex</strong>
                          </TableCell>
                          <TableCell align="right">
                            <strong>Amount</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => (
                            <TableRow
                              hover
                              onClick={() => clickInvested(row.hex)}
                              key={row.hex}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                                cursor: "pointer",
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.hex}
                              </TableCell>
                              <TableCell align="right">
                                {row.amount} WYND
                              </TableCell>
                            </TableRow>
                          ))}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            colSpan={3}
                            count={rows.length}
                            rowsPerPageOptions={[]}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default InvestedBox;
