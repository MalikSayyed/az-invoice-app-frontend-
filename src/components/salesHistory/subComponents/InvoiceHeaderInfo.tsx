import { Box, Grid, Typography } from "@mui/material";
import { DateFormatConverter } from "./DateFormatConverter";

const InvoiceHeaderInfo = ({ invoiceData }: { invoiceData: any }) => {
  return (
    <Box>
      {invoiceData.length > 0 && (
        <Grid container>
          <Grid item xs={6}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                height: 220,
              }}
            >
              <Grid item xs={4} sx={{ borderLeft: "2px solid black" }}></Grid>
              <Grid item xs={8} sx={{ padding: 2 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: 28 }}>
                  {invoiceData[0].company.name}
                </Typography>
                <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                  {invoiceData[0].company.address}
                </Typography>
                <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                  Mobile {invoiceData[0].company.phone}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                borderLeft: "2px solid black",
                borderTop: "2px solid black",
                paddingBottom: 0,
                padding: 2,
                height: 200,
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                Customer Details:
              </Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                {invoiceData[0].customer.name}
              </Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                Billing Address:
              </Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: 16, width: 350 }}>
                {invoiceData[0].customer.address}
              </Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                Ph {invoiceData[0].customer.phone}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid
                item
                xs={6}
                sx={{
                  border: "2px solid black",
                  borderTop: "none",
                  padding: 2,
                }}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                  Invoice #
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                  {invoiceData[0].invoice_number}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  borderRight: "2px solid black",
                  borderBottom: "2px solid black",
                  padding: 2,
                }}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                  Invoice Date
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                  {DateFormatConverter(invoiceData[0].invoice_date)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid
                item
                xs={6}
                sx={{
                  borderLeft: "2px solid black",
                  borderRight: "2px solid black",
                  padding: 2,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Place of Supply
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                  {invoiceData[0].company.place_of_supply}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ borderRight: "2px solid black", padding: 2 }}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                  Due Date
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                  {DateFormatConverter(invoiceData[0].due_date)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                border: "2px solid black",
                borderBottom: "none",
                padding: 2,
                height: 260,
              }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                Shipping Address:
              </Typography>
              <Typography sx={{ fontSize: 16, fontWeight: "bold", width: 350 }}>
                {invoiceData[0].customer.address}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default InvoiceHeaderInfo;
