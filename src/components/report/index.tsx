import {
  Typography,
  Autocomplete,
  TextField,
  Grid,
  Box,
  Button,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useReportData } from "./subComponents/useReportData";

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  customer_company: string;
  address: string;
  gstin: string;
  state: string;
}

interface Company {
  _id: string;
  name: string;
}

interface Item {
  _id: string;
  item_name: string;
}

const Report = () => {
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(
    null
  );

  const [companyData, setCompanyData] = useState<Company[]>([]);

  const [selectedCustomer, setSelectedCustomer] =
    React.useState<Customer | null>(null);

  const [customerData, setCustomerData] = useState<Customer[]>([]);

  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);

  const [itemData, setItemData] = useState<Item[]>([]);

  const theme = useTheme();

  const fetchCompaniesData = async () => {
    const response = await axios.get(
      "https://d3a7975fhwm13k.cloudfront.net/company/get-companies",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
        },
      }
    );
    if (response.data) {
      setCompanyData(response.data);
    }
  };

  const fetchCustomersData = async () => {
    const response = await axios.get(
      "https://d3a7975fhwm13k.cloudfront.net/customer/get-all-customers",
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

  const fetchItemsData = async () => {
    const response = await axios.get(
      "https://d3a7975fhwm13k.cloudfront.net/item/get-all-items",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
        },
      }
    );
    if (response.data) {
      setItemData(response.data);
    }
  };

  useEffect(() => {
    fetchCompaniesData();
    fetchCustomersData();
    fetchItemsData();
  }, []);

  const handleCompanyChange = (
    _: React.ChangeEvent<unknown>,
    newCompany: Company | null
  ) => {
    setSelectedCompany(newCompany);
  };

  const handleCustomerChange = (
    _: React.ChangeEvent<unknown>,
    newCustomer: Customer | null
  ) => {
    setSelectedCustomer(newCustomer);
  };

  const handleItemChange = (
    _: React.ChangeEvent<unknown>,
    newItem: Item | null
  ) => {
    setSelectedItem(newItem);
  };

  const { handleReportExport } = useReportData(
    selectedCompany?._id || "",
    selectedCustomer?._id || "",
    selectedItem?._id || ""
  );

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Report
      </Typography>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6} lg={4}>
          <Autocomplete
            sx={{ width: "100%" }}
            value={selectedCompany}
            onChange={handleCompanyChange}
            options={companyData}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                placeholder="Company"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Autocomplete
            sx={{ width: "100%" }}
            value={selectedCustomer}
            onChange={handleCustomerChange}
            options={customerData}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                placeholder="Customer"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Autocomplete
            sx={{ width: "100%" }}
            value={selectedItem}
            onChange={handleItemChange}
            options={itemData}
            getOptionLabel={(option) => option.item_name}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                placeholder="Item"
              />
            )}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 12,
          marginTop: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleReportExport}
          sx={{
            textTransform: "uppercase",
            backgroundColor: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
            borderRadius: 3,
          }}
        >
          Download Report
        </Button>
      </Box>
    </>
  );
};

export default Report;
