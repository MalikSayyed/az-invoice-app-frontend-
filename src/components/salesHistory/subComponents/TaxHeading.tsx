import { Box, Grid, Typography } from "@mui/material";

const TaxHeading = () => {
  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={3}
          sx={{ border: "2px solid black", borderRight: "none" }}
        ></Grid>
        <Grid
          item
          xs={6}
          sx={{
            borderTop: "2px solid black",
            borderBottom: "2px solid black",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#110883",
              letterSpacing: "0.35em",
              fontSize: 22,
            }}
          >
            TAX INVOICE
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            border: "2px solid black",
            borderLeft: "none",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 16 }}>ORIGINAL FOR RECEPIENT</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaxHeading;
