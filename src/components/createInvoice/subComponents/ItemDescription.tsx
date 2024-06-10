import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface ItemDesc {
  itemName: string;
}

const ItemDescription: React.FC = () => {
  const [itemList, setItemList] = useState<ItemDesc[]>([{ itemName: "" }]);

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { value } = e.target;
    const list = [...itemList];
    list[index] = { ...list[index], itemName: value };
    setItemList(list);
  };

  const handleItemRemove = (index: number) => {
    const list = [...itemList];
    list.splice(index, 1);
    setItemList(list);
  };

  const handleItemAdd = () => {
    setItemList([...itemList, { itemName: "" }]);
  };

  return (
    <Box mt={4}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "700", fontSize: "16px", mb: 2 }}
      >
        Item Description
      </Typography>

      <Table sx={{ overflowX: "auto" }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                borderBottom: "none",
                fontSize: 13,
                fontWeight: "bold",
                color: "gray",
                padding: "0 16px",
              }}
            >
              ITEM DESCRIPTION
            </TableCell>
            <TableCell
              sx={{
                borderBottom: "none",
                fontSize: 13,
                fontWeight: "bold",
                color: "gray",
                padding: "0 16px",
              }}
            >
              DURATION
            </TableCell>
            <TableCell
              sx={{
                borderBottom: "none",
                fontSize: 13,
                fontWeight: "bold",
                color: "gray",
                padding: "0 16px",
              }}
            >
              RATE
            </TableCell>
            <TableCell
              sx={{
                borderBottom: "none",
                fontSize: 13,
                fontWeight: "bold",
                color: "gray",
                padding: "0 16px",
              }}
            >
              AMOUNT
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemList.map((item, index) => (
            <TableRow key={index} sx={{ borderBottom: "1px solid #dadada" }}>
              <TableCell
                sx={{
                  borderBottom: "none",
                  fontSize: 13,
                  fontWeight: 550,
                }}
              >
                <TextField
                  size="small"
                  type="text"
                  name="itemName"
                  value={item.itemName}
                  onChange={(e) => handleItemChange(e, index)}
                />
                <button onClick={() => handleItemRemove(index)}>&times;</button>
              </TableCell>
            </TableRow>
          ))}
          <Button
            variant="contained"
            size="small"
            onClick={handleItemAdd}
            sx={{ mt: 1 }}
          >
            Add Service
          </Button>
        </TableBody>
      </Table>

      <TextField
        size="small"
        variant="outlined"
        fullWidth
        placeholder="Type description here..."
        sx={{
          marginBlock: 2,
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none !important",
          },
        }}
      />
    </Box>
  );
};

export default ItemDescription;
