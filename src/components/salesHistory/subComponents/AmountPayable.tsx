import { Box, Grid, Typography } from "@mui/material";
import { CalcTaxableAmount } from "./CalcTaxableAmount";

const AmountPayable = ({ invoiceData }: { invoiceData: any }) => {
  return (
    <Box>
      {invoiceData.length > 0 && (
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              border: "2px solid black",
              borderTop: "none",
              padding: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
              Amount Payable: ₹{" "}
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

export default AmountPayable;
