import { Box, TextField, Typography } from "@mui/material";
import React from "react";

interface ItemTotalProps {
  subTotal: number;
  total: number;
}

const ItemTotal: React.FC<ItemTotalProps> = ({ subTotal, total }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography>Sub Total</Typography>
        <TextField size="small" placeholder="₹ 0.00" value={`₹ ${subTotal}`} />
      </Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography>Estimated Tax (12.5%)</Typography>
        <TextField size="small" placeholder="₹ 0.00" />
      </Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography>Discount</Typography>
        <TextField size="small" placeholder="₹ 0.00" />
      </Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", borderTop: "2px solid #dadada", pt: 2 }}>
        <Typography>Total Amount</Typography>
        <TextField size="small" placeholder="₹ 0.00" value={`₹ ${total}`} />
      </Box>
    </Box>
  );
};

export default ItemTotal;
