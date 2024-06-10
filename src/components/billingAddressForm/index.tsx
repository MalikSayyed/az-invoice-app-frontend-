import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  Divider,
  Box,
  useTheme,
} from "@mui/material";

const BillingAddressForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const countries = [
    "USA",
    "Canada",
    "UK",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Japan",
    "Brazil",
    "Mexico",
    "India",
    "China",
    "South Korea",
    "Russia",
    "South Africa",
    "Thailand",
    "Afghanistan",
    "Sri Lanka",
    "Vatican City",
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Japanese",
    "Portuguese",
    "Chinese",
    "Hindi",
    "Russian",
    "Korean",
    "Arabic",
    "Bengali",
    "Turkish",
    "Dutch",
    "Italian",
    "Japanese",
    "Portuguese",
    "Chinese",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const theme = useTheme();

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Personal Information
      </Typography>
      <Divider sx={{ my: 2 }} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography color="gray" fontSize="0.8125rem">
              First Name
            </Typography>
            <TextField
              size="small"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="gray" fontSize="0.8125rem">
              Last Name
            </Typography>
            <TextField
              size="small"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="gray" fontSize="0.8125rem">
              Country
            </Typography>
            <TextField
              size="small"
              select
              label="Select Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { opacity: 0.5 } }}
              sx={{ mt: 1 }}
            >
              {countries.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="gray" fontSize="0.8125rem">
              Language
            </Typography>
            <TextField
              size="small"
              select
              label="Select Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { opacity: 0.5 } }}
              sx={{ mt: 1 }}
            >
              {languages.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="gray" fontSize="0.8125rem">
              Birth Date
            </Typography>
            <TextField
              size="small"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              fullWidth
              sx={{ mt: 1, "& .MuiOutlinedInput-input": { color: "gray" } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="gray" fontSize="0.8125rem">
              Phone Number
            </Typography>
            <TextField
              size="small"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { opacity: 0.5 } }}
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: theme.palette.primary.main,
              "&:hover": { backgroundColor: theme.palette.primary.dark },
              borderRadius: 3,
              px: 6,
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BillingAddressForm;
