import { Grid, Box, Typography } from "@mui/material";
import { taxInvoiceData } from "./taxInvoiceData";

const BankDetails = () => {
  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={2}
          sx={{
            borderLeft: "2px solid black",
            borderBottom: "2px solid black",
            padding: 2,
            height: 190,
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
            Bank Details:
          </Typography>
          <Typography sx={{ fontSize: 16 }}>Bank:</Typography>
          <Typography sx={{ fontSize: 16 }}>Account #:</Typography>
          <Typography sx={{ fontSize: 16 }}>IFSC:</Typography>
          <Typography sx={{ fontSize: 16 }}>Branch:</Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{ marginTop: 3.8, borderBottom: "2px solid black" }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            {taxInvoiceData.bank}
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            {taxInvoiceData.account_number}
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            {taxInvoiceData.ifsc}
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            {taxInvoiceData.branch}
          </Typography>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            borderBottom: "2px solid black",
            borderRight: "2px solid black",
          }}
        ></Grid>
      </Grid>
    </Box>
  );
};

export default BankDetails;
