import {
  Autocomplete,
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
import { indianStates } from "./subComponents/indianStates";
import { toast } from "react-toastify";
import { updateCustomers } from "../store/CustomerSlice";
import axios from "axios";

interface Customer {
  name: string;
  email: string;
  phonr: string;
  company: string;
}

interface CustomError {
  response: {
    data: {
      error: string;
    };
  };
}

const Customer: React.FC = () => {
  const [customerName, setCustomerName] = useState<string | undefined>();
  const [customerEmail, setCustomerEmail] = useState<string | undefined>();
  const [customerPhone, setCustomerPhone] = useState<string | undefined>();
  const [company, setCompany] = useState<string | undefined>();
  const [GSTIN, setGSTIN] = useState<string | undefined>();
  const [state, setState] = useState<{ label: string } | null>(null);
  const [address, setAddress] = useState<string | undefined>();
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number>(0);

  const companyId = useSelector((state: any) => {
    return state.companyData.companyId;
  });

  const customerId = useSelector((state: any) => {
    return state.customerData.customerId;
  });

  const dispatch = useDispatch();

  const notify = (error_message: string) => {
    if (error_message === "Please first delete invoices related to customer!") {
      toast.error("Please first delete invoices related to customer!");
    }
  };

  const fetchCustomersData = async () => {
    const response = await axios.get(
      "https://dnznqi8n78t2t.cloudfront.net/customer/get-customers",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
        },
      }
    );
    if (response.data) {
      setCustomerData(response.data);
    }
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  useEffect(() => {
    fetchCustomersData();
  }, [companyId, customerId]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "NAME",
        size: 150,
        Cell: ({ row }: any) => (
          <Typography fontSize="0.8rem">{row.original.name}</Typography>
        ),
      },

      {
        accessorKey: "company",
        header: "COMPANY",
        size: 80,
        Cell: ({ row }: any) => (
          <Box sx={{ fontSize: "0.8rem" }}>{row.original.customer_company}</Box>
        ),
      },
      {
        accessorKey: "email",
        header: "EMAIL",
        size: 80,
        Cell: ({ row }: any) => (
          <Box
            sx={{
              fontSize: "0.8rem",
            }}
          >
            {row.original.email}
          </Box>
        ),
      },
      {
        accessorKey: "phone",
        header: "CONTACT NUMBER",
        size: 80,
        Cell: ({ row }: any) => (
          <Box style={{ fontSize: "0.8rem", borderBottom: "none" }}>
            {row.original.phone}
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
                <IconButton onClick={(event) => handleViewCustomer(event, row)}>
                  <VisibilityIcon sx={{ color: theme.palette.primary.light }} />
                </IconButton>
                <IconButton onClick={(event) => handleEditCustomer(event, row)}>
                  <EditIcon
                    sx={{ color: theme.palette.secondary.contrastText }}
                  />
                </IconButton>
                <IconButton
                  onClick={(event) => handleDeleteCustomer(event, row)}
                >
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

  const handleStateChange = (_: any, value: { label: string } | null) => {
    setState(value);
  };

  const handleAddCustomer = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setCustomerName("");
    setCompany("");
    setGSTIN("");
    setState(null);
    setAddress("");
    setCustomerEmail("");
    setCustomerPhone("");
    setAddModalOpen(true);
  };

  const handleAddCustomerClick = async () => {
    try {
      const response = await axios.post(
        "https://dnznqi8n78t2t.cloudfront.net/customer/add-customer",
        {
          token: sessionStorage.getItem("loginToken"),
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          customer_company: company,
          gstin: GSTIN,
          state: state ? state.label : "",
          address,
        }
      );

      dispatch(updateCustomers(response.data._id));
      fetchCustomersData();
    } catch (error) {
      const addCustomerError = error as CustomError;
      console.error(
        "Error during customer addition: ",
        addCustomerError.response.data.error
      );
    }
  };

  const handleEditCustomer = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any
  ) => {
    event.stopPropagation();
    setSelectedCustomerId(row.original._id);
    setCustomerName(row.original.name);
    setCompany(row.original.customer_company);
    setGSTIN(row.original.gstin);
    const selectedState = indianStates.find(
      (state) => state.label === row.original.state
    );
    setState(selectedState || null);
    setAddress(row.original.address);
    setCustomerEmail(row.original.email);
    setCustomerPhone(row.original.phone);
    setEditModalOpen(true);
  };

  const handleEditCustomerClick = async () => {
    try {
      await axios.put(
        "https://dnznqi8n78t2t.cloudfront.net/customer/update-customer",
        {
          id: selectedCustomerId,
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          customer_company: company,
          gstin: GSTIN,
          state: state ? state.label : "",
          address,
        }
      );

      dispatch(updateCustomers(Math.floor(Math.random() * 1000000)));
    } catch (error) {
      const updateCustomerError = error as CustomError;
      console.error(
        "Error while updating customer data:",
        updateCustomerError.response.data.error
      );
    }
  };

  const handleViewCustomer = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any
  ) => {
    event.stopPropagation();
    setCustomerName(row.original.name);
    setGSTIN(row.original.gstin);
    setState(row.original.state);
    setCompany(row.original.customer_company);
    setCustomerEmail(row.original.email);
    setAddress(row.original.address);
    setCustomerPhone(row.original.phone);
    setViewModalOpen(true);
  };

  const handleDeleteCustomer = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any
  ) => {
    event.stopPropagation();
    setSelectedCustomerId(row.original._id);
    setDeleteModalOpen(true);
  };

  const handleDeleteCustomerClick = async () => {
    try {
      const response = await axios.delete(
        "https://dnznqi8n78t2t.cloudfront.net/customer/remove-customer",
        {
          params: {
            id: selectedCustomerId,
          },
        }
      );

      if (response.data.message === "Customer removed successfully") {
        fetchCustomersData();
        dispatch(updateCustomers(Math.floor(Math.random() * 1000000)));
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      const deleteCustomerError = error as CustomError;
      console.error(
        "Error while deleting customer data:",
        deleteCustomerError.response.data.error
      );
    }
  };

  const theme = useTheme();

  return (
    <Box>
      {/* breadcrumb and button to add customer */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography variant="h5" color="text.primary">
            Customer
          </Typography>
        </Breadcrumbs>
        <Button variant="contained" size="small" onClick={handleAddCustomer}>
          Add Customer
        </Button>
      </Box>
      {/* table to show customer details */}
      <CommonTable columns={columns} data={customerData} />
      {/*--------------- Dialogs for add,view, edit and delete customer --------------- */}
      {/* add dialog */}
      <CustomDialog
        modalSize="xs"
        modalTitle="Add new Customer"
        open={isAddModalOpen}
        handleClose={() => setAddModalOpen(false)}
        buttonAction="Save"
        handleSave={handleAddCustomerClick}
        areFieldsFilled={
          customerName !== "" &&
          customerEmail !== "" &&
          customerPhone !== "" &&
          company !== "" &&
          state !== null &&
          address !== ""
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="GSTIN (optional)"
              value={GSTIN}
              onChange={(e) => setGSTIN(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              fullWidth
              value={state}
              onChange={handleStateChange}
              options={indianStates}
              renderInput={(params) => <TextField {...params} label="State" />}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              minRows={4}
              fullWidth
              size="small"
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
        handleSave={handleEditCustomerClick}
        areFieldsFilled={
          customerName !== "" &&
          customerEmail !== "" &&
          customerPhone !== "" &&
          company !== "" &&
          state !== null &&
          address !== ""
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="GSTIN (optional)"
              value={GSTIN}
              onChange={(e) => setGSTIN(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              fullWidth
              value={state}
              onChange={handleStateChange}
              options={indianStates}
              renderInput={(params) => <TextField {...params} label="State" />}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
        </Grid>
      </CustomDialog>
      {/* view dialog */}
      <CustomDialog
        modalSize="xs"
        modalTitle="Customer details"
        open={isViewModalOpen}
        handleClose={() => setViewModalOpen(false)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Name"
              value={customerName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              value={customerEmail}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Contact Number"
              value={customerPhone}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth size="small" label="Company" value={company} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth size="small" label="GSTIN" value={GSTIN} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth size="small" label="State" value={state} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth size="small" label="Address" value={address} />
          </Grid>
        </Grid>
      </CustomDialog>
      {/* delete dialog */}
      <CustomDialog
        modalSize="xs"
        modalTitle="Delete Customer Details"
        open={isDeleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        buttonAction="Delete"
        handleDelete={handleDeleteCustomerClick}
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

export default Customer;
