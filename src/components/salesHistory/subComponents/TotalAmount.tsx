import { Grid, Box, Typography } from "@mui/material";
import { CalcTaxableAmount } from "./CalcTaxableAmount";

const CalcTotalQty = (invoiceData: any) => {
  let totalQty = 0;
  invoiceData.forEach((invoiceItem: any) => {
    totalQty += invoiceItem.qty;
  });

  return totalQty;
};

const TotalAmount = ({ invoiceData }: { invoiceData: any }) => {
  return (
    <Box>
      {invoiceData.length > 0 && (
        <Grid container>
          <Grid
            item
            xs={1}
            sx={{ borderLeft: "2px solid black", borderTop: "2px solid black" }}
          ></Grid>
          <Grid
            item
            xs={5}
            sx={{
              borderLeft: "2px solid black",
              borderTop: "2px solid black",
              display: "flex",
              justifyContent: "flex-end",
              padding: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
              Total
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{ borderLeft: "2px solid black", borderTop: "2px solid black" }}
          ></Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              borderLeft: "2px solid black",
              borderTop: "2px solid black",
              padding: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
              {CalcTotalQty(invoiceData).toFixed(2)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{ borderLeft: "2px solid black", borderTop: "2px solid black" }}
          ></Grid>
          <Grid
            item
            xs={1}
            sx={{ borderLeft: "2px solid black", borderTop: "2px solid black" }}
          ></Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              border: "2px solid black",
              borderBottom: "none",
              paddingTop: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
              ₹{" "}
              {(1.18 * CalcTaxableAmount(invoiceData)).toLocaleString("en-IN", {
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

export default TotalAmount;
