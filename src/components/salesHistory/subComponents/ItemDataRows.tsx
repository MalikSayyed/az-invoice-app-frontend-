import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const ItemDataRows = ({ invoiceData }: { invoiceData: any }) => {
  return (
    <Box>
      <Grid container>
        {invoiceData.map((invoiceitem: any, index: number) => (
          <React.Fragment key={invoiceitem._id}>
            <Grid
              item
              xs={1}
              sx={{ borderLeft: "2px solid black", padding: 1, paddingLeft: 2 }}
            >
              <Typography sx={{ fontSize: 16 }}>{index + 1}</Typography>
            </Grid>
            <Grid
              item
              xs={5}
              sx={{ borderLeft: "2px solid black", padding: 1, paddingLeft: 2 }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                {invoiceitem.item.item_name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                borderLeft: "2px solid black",
                display: "flex",
                justifyContent: "flex-end",
                padding: 1,
                paddingRight: 1,
              }}
            >
              <Typography sx={{ fontSize: 16 }}>
                {invoiceitem.item.hsn_sac}
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                borderLeft: "2px solid black",
                display: "flex",
                justifyContent: "flex-end",
                padding: 1,
                paddingRight: 2,
              }}
            >
              <Typography sx={{ fontSize: 16 }}>
                {invoiceitem.qty} Nos
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                borderLeft: "2px solid black",
                display: "flex",
                justifyContent: "flex-end",
                padding: 1,
                paddingRight: 2,
              }}
            >
              <Typography sx={{ fontSize: 16 }}>
                {invoiceitem.item.rate}
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                borderLeft: "2px solid black",
                display: "flex",
                justifyContent: "flex-end",
                padding: 1,
                paddingRight: 2,
              }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                Nos
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                borderLeft: "2px solid black",
                borderRight: "2px solid black",
                display: "flex",
                justifyContent: "flex-end",
                padding: 1,
                paddingRight: 1,
              }}
            >
              <Typography sx={{ fontSize: 16 }}>
                {(invoiceitem.qty * invoiceitem.item.rate).toLocaleString(
                  "en-IN"
                )}
              </Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default ItemDataRows;
