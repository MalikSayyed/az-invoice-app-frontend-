import {
  Box,
  Breadcrumbs,
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
import { update } from "../store/CompanySlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
// import { dataTagSymbol } from "@tanstack/react-query";

interface Company {
  name: string;
  gst_number: string;
  phone: string;
  state: string;
  email: string;
}

interface CustomError {
  response: {
    data: {
      error: string;
    };
  };
}

const Company: React.FC = () => {
  const [name, setName] = useState<string | undefined>();
  const [gstNumber, setGstNumber] = useState<string | undefined>();
  const [phone, setPhone] = useState<string | undefined>();
  const [state, setState] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [companiesData, setCompaniesData] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number>(0);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const notify = (error_message: string) => {
    if (error_message === "Please first delete invoices related to company!") {
      toast.error("Please first delete invoices related to company!");
    } else if (
      error_message === "Please first delete items related to company!"
    ) {
      toast.error("Please first delete items related to company!");
    } else if (
      error_message === "Please first delete customers related to company!"
    ) {
      toast.error("Please first delete customers related to company!");
    }
  };

  const companyId = useSelector((state: any) => {
    return state.companyData.companyId;
  });

  // const { loading, error, data, refetch } = useQuery(gqlQueries.getCompanies, {
  //   variables: { token: token },
  // });

  const fetchCompaniesData = async () => {
    const response = await axios.get(
      "https://dnznqi8n78t2t.cloudfront.net/company/get-companies",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
        },
      }
    );

    if (response.data.length === 0) {
      sessionStorage.setItem("CompanyExistingFlag", "N");
      Navigate("/create-company-form");
      return;
    }

    if (response.data) {
      setCompaniesData(response.data);
    }
  };

  useEffect(() => {
    fetchCompaniesData();
  }, []);

  useEffect(() => {
    fetchCompaniesData();
  }, [companyId]);

  // const [removeCompany] = useMutation(gqlMutations.removeCompany);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "COMPANY NAME",
        size: 150,
        Cell: ({ row }: any) => (
          <Typography fontSize="0.8rem">{row.original.name}</Typography>
        ),
      },

      {
        accessorKey: "gst_number",
        header: "GST NUMBER",
        size: 80,
        Cell: ({ row }: any) => (
          <Box sx={{ fontSize: "0.8rem" }}>{row.original.gst_number}</Box>
        ),
      },
      {
        accessorKey: "phone",
        header: "PHONE",
        size: 80,
        Cell: ({ row }: any) => (
          <Box
            sx={{
              fontSize: "0.8rem",
            }}
          >
            {row.original.phone}
          </Box>
        ),
      },
      {
        accessorKey: "state",
        header: "STATE",
        size: 80,
        Cell: ({ row }: any) => (
          <Box style={{ fontSize: "0.8rem", borderBottom: "none" }}>
            {row.original.state}
          </Box>
        ),
      },
      {
        accessorKey: "email",
        header: "EMAIL",
        size: 80,
        Cell: ({ row }: any) => (
          <Box style={{ fontSize: "0.8rem", borderBottom: "none" }}>
            {row.original.email}
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
                <IconButton onClick={(event) => handleViewCompany(event, row)}>
                  <VisibilityIcon sx={{ color: theme.palette.primary.light }} />
                </IconButton>
                <IconButton onClick={(event) => handleEditCompany(event, row)}>
                  <EditIcon
                    sx={{ color: theme.palette.secondary.contrastText }}
                  />
                </IconButton>
                <IconButton
                  onClick={(event) => handleDeleteCompany(event, row)}
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

  const handleEditCompany = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any
  ) => {
    event.stopPropagation();
    setSelectedCompanyId(row.original._id);
    setName(row.original.name);
    setGstNumber(row.original.gst_number);
    setPhone(row.original.phone);
    setState(row.original.state);
    setEmail(row.original.email);
    setAddress(row.original.address);
    setEditModalOpen(true);
  };

  const handleEditCompanyClick = async () => {
    try {
      await axios.put(
        "https://dnznqi8n78t2t.cloudfront.net/company/update-company",
        {
          id: selectedCompanyId,
          name,
          gst_number: gstNumber,
          phone,
          state,
          email,
          address,
        }
      );

      dispatch(update(selectedCompanyId + Math.floor(Math.random() * 1000000)));
    } catch (error) {
      const updateCompanyError = error as CustomError;
      console.error(
        "Error while updating company data:",
        updateCompanyError.response.data.error
      );
    }
  };

  const handleViewCompany = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any
  ) => {
    event.stopPropagation();
    setName(row.original.name);
    setGstNumber(row.original.gst_number);
    setPhone(row.original.phone);
    setState(row.original.state);
    setEmail(row.original.email);
    setAddress(row.original.address);
    setViewModalOpen(true);
  };

  const handleDeleteCompany = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any
  ) => {
    event.stopPropagation();
    setSelectedCompanyId(row.original._id);
    setDeleteModalOpen(true);
  };

  const handleDeleteCompanyClick = async () => {
    try {
      const response = await axios.delete(
        "https://dnznqi8n78t2t.cloudfront.net/company/remove-company",
        {
          params: {
            id: selectedCompanyId,
          },
        }
      );

      if (response.data.message === "Company removed successfully") {
        dispatch(
          update(selectedCompanyId + Math.floor(Math.random() * 1000000))
        ); // updating value as 0 so that query getSelectedCompany will be refeched in CompanyName component
        fetchCompaniesData();
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      const deleteCompanyError = error as CustomError;
      console.error(
        "Error while deleting company data:",
        deleteCompanyError.response.data.error
      );
    }
  };

  const theme = useTheme();

  return (
    <Box>
      {/* breadcrumb and button to add company */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography variant="h5" color="text.primary">
            Company
          </Typography>
        </Breadcrumbs>
      </Box>
      {/* table to show company details */}
      <CommonTable columns={columns} data={companiesData} />
      {/*--------------- Dialogs for add,view, edit and delete company --------------- */}
      {/* add dialog */}
      {/* edit dialog */}
      <CustomDialog
        modalSize="xs"
        modalTitle="Edit"
        open={isEditModalOpen}
        handleClose={() => setEditModalOpen(false)}
        buttonAction="Save"
        handleSave={handleEditCompanyClick}
        areFieldsFilled={
          name !== "" &&
          phone !== "" &&
          state !== "" &&
          email !== "" &&
          address !== ""
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="GST Number (optional)"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        modalTitle="Company details"
        open={isViewModalOpen}
        handleClose={() => setViewModalOpen(false)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Company Name"
              value={name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="GST Number"
              value={gstNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth size="small" label="Phone" value={phone} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth size="small" label="State" value={state} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth size="small" label="Email" value={email} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth size="small" label="Address" value={address} />
          </Grid>
        </Grid>
      </CustomDialog>
      {/* delete dialog */}
      <CustomDialog
        modalSize="xs"
        modalTitle="Delete Company Details"
        open={isDeleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        buttonAction="Delete"
        handleDelete={handleDeleteCompanyClick}
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

export default Company;
