import { Box, Grid, Typography } from "@mui/material";
import { CalcTaxableAmount } from "./CalcTaxableAmount";

const TaxableAmount = ({ invoiceData }: { invoiceData: any }) => {
  return (
    <Box>
      {invoiceData.length > 0 && (
        <Grid container>
          <Grid item xs={1} sx={{ borderLeft: "2px solid black" }}></Grid>
          <Grid item xs={3} sx={{ borderLeft: "2px solid black" }}></Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
              padding: 2,
            }}
          >
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
              Taxable Amount
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
              CGST 9.0%
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
              SGST 9.0%
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ borderLeft: "2px solid black" }}></Grid>
          <Grid item xs={1} sx={{ borderLeft: "2px solid black" }}></Grid>
          <Grid item xs={2} sx={{ borderLeft: "2px solid black" }}></Grid>
          <Grid item xs={1} sx={{ borderLeft: "2px solid black" }}></Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
              borderLeft: "2px solid black",
              borderRight: "2px solid black",
              height: 170,
              padding: 2,
              paddingRight: 1,
            }}
          >
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
              {CalcTaxableAmount(invoiceData).toLocaleString("en-IN")}
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
              {(0.09 * CalcTaxableAmount(invoiceData)).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
              {(0.09 * CalcTaxableAmount(invoiceData)).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default TaxableAmount;
