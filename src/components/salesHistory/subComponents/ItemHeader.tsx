import { Box, Grid, Typography } from "@mui/material";

const ItemHeader = () => {
  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={1}
          sx={{ border: "2px solid black", borderRight: "none" }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: "bold",
              padding: 2,
            }}
          >
            #
          </Typography>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{ border: "2px solid black", borderRight: "none" }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: "bold",
              padding: 2,
            }}
          >
            Item
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            border: "2px solid black",
            borderRight: "none",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: "bold",
              padding: 2,
              paddingRight: 1,
            }}
          >
            HSN/SAC
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            border: "2px solid black",
            borderRight: "none",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: "bold",
              padding: 2,
            }}
          >
            Qty
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            border: "2px solid black",
            borderRight: "none",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: "bold",
              padding: 2,
            }}
          >
            Rate/ Item
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            border: "2px solid black",
            borderRight: "none",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: "bold",
              padding: 2,
            }}
          >
            Per
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            border: "2px solid black",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: "bold",
              padding: 2,
              paddingRight: 1,
            }}
          >
            Amount
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemHeader;
