import { Box, Grid, Typography } from "@mui/material";

const TermsConditions = () => {
  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            border: "2px solid black",
            borderTop: "none",
            padding: 2,
          }}
        >
          <Typography sx={{ fontSize: 16 }}>Notes</Typography>
          <Typography sx={{ fontSize: 16 }}>
            Thank you for the business
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
          <Typography sx={{ fontSize: 16 }}>Terms and Conditions:</Typography>
          <Typography sx={{ fontSize: 16 }}>
            1. Goods once sold cannot be taken back or exchanged
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            2. We are not the manufacturers, company will stand for warranty as
            per their terms and conditions
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            3. Interest @ 24% p.a. will be charged for uncleaned bills beyond 15
            days
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            4. Subject to local Jurisdiction
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TermsConditions;
