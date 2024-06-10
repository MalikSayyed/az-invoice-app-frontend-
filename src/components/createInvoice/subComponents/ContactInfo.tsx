import * as React from "react";
import {
  Box,
  Typography,
  Grid,
  useTheme,
  Autocomplete,
  TextField,
} from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";
import PlaceIcon from "@mui/icons-material/Place";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

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

interface ContactInfoProps {
  customerData: Customer[];
  dataFromCustomer: (arg: any) => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  customerData,
  dataFromCustomer,
}) => {
  const [selectedCustomer, setSelectedCustomer] =
    React.useState<Customer | null>(null);

  React.useEffect(() => {
    if (customerData.length > 0) {
      setSelectedCustomer(customerData[0]);
    }
  }, [customerData]);

  React.useEffect(() => {
    if (selectedCustomer) {
      dataFromCustomer(selectedCustomer?._id);
    }
  }, [dataFromCustomer, selectedCustomer?._id]);

  const handleChange = (
    _: React.ChangeEvent<unknown>,
    newCustomer: Customer | null
  ) => {
    setSelectedCustomer(newCustomer);
  };

  const infoBoxStyles = {
    display: "flex",
    gap: "1rem",
  };

  const theme = useTheme();

  return (
    <Grid container spacing={8}>
      <Grid item xs={12} md={6} lg={3}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            p: 1,
            borderRadius: "8px",
          }}
        >
          <SquareIcon
            sx={{ fontSize: "3rem", color: "purple", borderRadius: "50%" }}
          />

          <Autocomplete
            sx={{ width: "100%" }}
            value={selectedCustomer}
            onChange={handleChange}
            options={customerData}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                placeholder="Customer"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none !important",
                  },
                }}
              />
            )}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={infoBoxStyles}>
          <PlaceIcon
            sx={{ fontSize: "2rem", color: theme.palette.primary.main }}
          />
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: "gray",
                fontWeight: "700",
                fontSize: "13px",
                textTransform: "uppercase",
              }}
            >
              Address
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "14px", fontWeight: "550" }}
            >
              {selectedCustomer?.address}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={infoBoxStyles}>
          <EmailIcon
            sx={{ fontSize: "2rem", color: theme.palette.primary.main }}
          />
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: "gray",
                fontWeight: "700",
                fontSize: "13px",
                textTransform: "uppercase",
              }}
            >
              Email
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "14px", fontWeight: "550" }}
            >
              {selectedCustomer?.email}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={infoBoxStyles}>
          <PhoneIcon
            sx={{ fontSize: "2rem", color: theme.palette.primary.main }}
          />
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: "gray",
                fontWeight: "700",
                fontSize: "13px",
                textTransform: "uppercase",
              }}
            >
              Telephone
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "14px", fontWeight: "550" }}
            >
              {selectedCustomer?.phone}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContactInfo;
