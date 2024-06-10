import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommonTable from "../common/CommonTable";
import CustomDialog from "../common/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateItems } from "../store/ItemSlice";
import axios from "axios";

interface Item {
  _id: string;
  item_name: string;
  item_details: string;
  hsn_sac: string;
  qty: number;
  rate: number;
}

interface CustomError {
  response: {
    data: {
      error: string;
    };
  };
}

const Item: React.FC = () => {
  const [itemName, setItemName] = useState<string | undefined>();
  const [itemCode, setItemCode] = useState<string | undefined>();
  const [itemDetails, setItemDetails] = useState<string | undefined>();
  const [hsn, setHsn] = useState<string | undefined>();
  const [qty, setQty] = useState<string | undefined>();
  const [rate, setRate] = useState<string | undefined>();
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [itemsData, setItemsData] = useState<Item[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number>(0);
  const theme = useTheme();

  const companyId = useSelector((state: any) => {
    return state.companyData.companyId;
  });

  const itemId = useSelector((state: any) => {
    return state.itemData.itemId;
  });

  const dispatch = useDispatch();

  const notify = (error_message: string) => {
    if (error_message === "Please first delete invoices related to item!") {
      toast.error("Please first delete invoices related to item!");
    }
  };

  const fetchItemsData = async () => {
    const response = await axios.get(
      "https://d2nxa7pir92htg.cloudfront.net/item/get-items",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
        },
      }
    );
    if (response.data) {
      setItemsData(response.data);
    }
  };

  useEffect(() => {
    fetchItemsData();
  }, []);

  useEffect(() => {
    fetchItemsData();
  }, [companyId, itemId]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "item_name",
        header: "ITEM NAME",
        size: 150,
        Cell: ({ row }: any) => (
          <Typography fontSize="0.8rem">{row.original.item_name}</Typography>
        ),
      },

      {
        accessorKey: "item_details",
        header: "ITEM DETAILS",
        size: 80,
        Cell: ({ row }: any) => (
          <Box sx={{ fontSize: "0.8rem" }}>{row.original.item_details}</Box>
        ),
      },
      {
        accessorKey: "hsn_sac",
        header: "HSN/SAC",
        size: 80,
        Cell: ({ row }: any) => (
          <Box
            sx={{
              fontSize: "0.8rem",
            }}
          >
            {row.original.hsn_sac}
          </Box>
        ),
      },
      {
        accessorKey: "qty",
        header: "QTY",
        size: 80,
        Cell: ({ row }: any) => (
          <Box style={{ fontSize: "0.8rem", borderBottom: "none" }}>
            {row.original.qty}
          </Box>
        ),
      },
      {
        accessorKey: "rate",
        header: "RATE",
        size: 80,
        Cell: ({ row }: any) => (
          <Box style={{ fontSize: "0.8rem", borderBottom: "none" }}>
            {row.original.rate}
          </Box>
        ),
      },
      {
        accessorKey: "action",
        header: "ACTIONS",
        size: 150,
        Cell: ({ row }: any) => {
          return (
            <Box>
              <Box>
                <IconButton onClick={(event) => handleViewItem(event, row)}>
                  <VisibilityIcon sx={{ color: theme.palette.primary.light }} />
                </IconButton>
                <IconButton onClick={(event) => handleEditItem(event, row)}>
                  <EditIcon
                    sx={{ color: theme.palette.secondary.contrastText }}
                  />
                </IconButton>
                <IconButton onClick={(event) => handleDeleteItem(event, row)}>
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </Box>
            </Box>
          );
        },
      },
    ],
    []
  );

  const handleAddItem = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setItemName("");
    setItemCode("");
    setItemDetails("");
    setHsn("");
    setQty("");
    setRate("");
    setAddModalOpen(true);
  };

  const handleAddItemClick = async () => {
    try {
      const response = await axios.post(
        "https://d2nxa7pir92htg.cloudfront.net/item/add-item",
        {
          token: sessionStorage.getItem("loginToken"),
          item_name: itemName,
          item_code: itemCode,
          item_details: itemDetails,
          hsn_sac: hsn,
          qty: parseFloat(qty || "0"),
          rate: parseFloat(rate || "0"),
        }
      );

      dispatch(updateItems(response.data._id));
      fetchItemsData();
    } catch (error) {
      const addItemError = error as CustomError;
      console.error(
        "Error during item addition: ",
        addItemError.response.data.error
      );
    }
  };

  const handleEditItem = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any
  ) => {
    event.stopPropagation();
    setSelectedItemId(row.original._id);
    setItemName(row.original.item_name);
    setItemCode(row.original.item_code);
    setItemDetails(row.original.item_details);
    setHsn(row.original.hsn_sac);
    setQty(row.original.qty);
    setRate(row.original.rate);
    setEditModalOpen(true);
  };

  const handleEditItemClick = async () => {
    try {
      await axios.put(
        "https://d2nxa7pir92htg.cloudfront.net/item/update-item",
        {
          id: selectedItemId,
          item_name: itemName,
          item_code: itemCode,
          item_details: itemDetails,
          hsn_sac: hsn,
          qty: parseFloat(qty || "0"),
          rate: parseFloat(rate || "0"),
        }
      );

      dispatch(updateItems(Math.floor(Math.random() * 1000000)));
    } catch (error) {
      const updateItemError = error as CustomError;
      console.error(
        "Error while updating item data:",
        updateItemError.response.data.error
      );
    }
  };

  const handleViewItem = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any
  ) => {
    event.stopPropagation();
    setItemName(row.original.item_name);
    setItemCode(row.original.item_code);
    setItemDetails(row.original.item_details);
    setHsn(row.original.hsn_sac);
    setQty(row.original.qty);
    setRate(row.original.rate);
    setViewModalOpen(true);
  };

  const handleDeleteItem = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any
  ) => {
    event.stopPropagation();
    setSelectedItemId(row.original._id);
    setDeleteModalOpen(true);
  };

  const handleDeleteItemClick = async () => {
    try {
      const response = await axios.delete(
        "https://d2nxa7pir92htg.cloudfront.net/item/remove-item",
        {
          params: {
            id: selectedItemId,
          },
        }
      );

      if (response.data.message === "Item removed successfully") {
        dispatch(updateItems(Math.floor(Math.random() * 1000000)));
        // fetchItemsData();
        setItemsData((prevItems: any) =>
          prevItems.filter((item: any) => item._id !== selectedItemId)
        );
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      const deleteItemError = error as CustomError;
      console.error(
        "Error while deleting item data:",
        deleteItemError.response.data.error
      );
    }
  };

  return (
    <Box>
      {/* breadcrumb and button to add customer */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography variant="h5" color="text.primary">
            Item
          </Typography>
        </Breadcrumbs>
        <Button variant="contained" size="small" onClick={handleAddItem}>
          Add Item
        </Button>
      </Box>
      {/* table to show customer details */}
      <CommonTable columns={columns} data={itemsData} />
      {/*--------------- Dialogs for add,view, edit and delete customer --------------- */}
      {/* add dialog */}
      <CustomDialog
        modalSize="xs"
        modalTitle="Add new Item"
        open={isAddModalOpen}
        handleClose={() => setAddModalOpen(false)}
        buttonAction="Save"
        handleSave={handleAddItemClick}
        areFieldsFilled={
          itemName !== "" &&
          itemCode !== "" &&
          itemDetails !== "" &&
          hsn !== "" &&
          qty !== "" &&
          rate !== ""
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Item Code"
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Item Details"
              value={itemDetails}
              onChange={(e) => setItemDetails(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="HSN/SAC"
              value={hsn}
              onChange={(e) => setHsn(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </Grid>
        </Grid>
      </CustomDialog>
      {/* edit dialog */}
      <CustomDialog
        modalSize="xs"
        modalTitle="Edit"
        open={isEditModalOpen}
        handleClose={() => setEditModalOpen(false)}
        buttonAction="Save"
        handleSave={handleEditItemClick}
        areFieldsFilled={
          itemName !== "" &&
          itemCode !== "" &&
          itemDetails !== "" &&
          hsn !== "" &&
          qty !== "" &&
          rate !== ""
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Item Code"
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Item Details"
              value={itemDetails}
              onChange={(e) => setItemDetails(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="HSN/SAC"
              value={hsn}
              onChange={(e) => setHsn(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </Grid>
        </Grid>
      </CustomDialog>
      {/* view dialog */}
      <CustomDialog
        modalSize="xs"
        modalTitle="Item details"
        open={isViewModalOpen}
        handleClose={() => setViewModalOpen(false)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField size="small" fullWidth label="Name" value={itemName} />
          </Grid>
          <Grid item xs={12}>
            <TextField size="small" fullWidth label="Code" value={itemCode} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Details"
              value={itemDetails}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth size="small" label="HSN/SAC" value={hsn} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth size="small" label="Qty" value={qty} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth size="small" label="Rate" value={rate} />
          </Grid>
        </Grid>
      </CustomDialog>
      {/* delete dialog */}
      <CustomDialog
        modalSize="xs"
        modalTitle="Delete Item Details"
        open={isDeleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        buttonAction="Delete"
        handleDelete={handleDeleteItemClick}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Are you sure you want to delete?</Typography>
          </Grid>
        </Grid>
      </CustomDialog>
    </Box>
  );
};

export default Item;
