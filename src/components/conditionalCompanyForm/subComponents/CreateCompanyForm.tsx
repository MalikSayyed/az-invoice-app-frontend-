import React from "react";
import { TextField, Button, Typography, Box, useTheme } from "@mui/material";
import { useState } from "react";
import { InterestsOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CreateCompanyFormProps {}

const CreateCompanyForm: React.FC<CreateCompanyFormProps> = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const [gstNumber, setGstNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [billingAddress, setBillingAddress] = useState<string>("");

  const navigate = useNavigate();

  const handleCreateCompany = async () => {
    try {
      await axios.post(
        "https://dnznqi8n78t2t.cloudfront.net/company/create-company",
        {
          token: sessionStorage.getItem("loginToken"),
          name: companyName,
          gst_number: gstNumber,
          phone: phoneNumber,
          address: billingAddress,
          state,
          email,
        }
      );

      sessionStorage.setItem("CompanyExistingFlag", "Y");
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setCompanyName("");
      setGstNumber("");
      setPhoneNumber("");
      setState("");
      setEmail("");
      setBillingAddress("");
    }
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: "#f8f7fa",
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: "1.25rem",
      }}
    >
      <Box
        sx={{
          p: 1,
          backgroundColor: "white",
          maxWidth: "35vw",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          fontFamily:
            "'Public Sans', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
        }}
      >
        <Typography
          sx={{
            p: "1rem",
            textAlign: "center",
            fontSize: "1.625rem",
            fontWeight: "700",
            color: theme.palette.primary.main,
          }}
        >
          <InterestsOutlined sx={{ mr: 1 }} />
          Project App
        </Typography>
        <Typography
          sx={{
            px: 2,
            pb: 0.5,
            textAlign: "left",
            color: "rgba(47, 43, 61, 0.78)",
            fontSize: "1.375rem",
          }}
        >
          Create Company
        </Typography>
        <TextField
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          size="small"
          placeholder="Company Name"
          sx={{ px: 2, width: "90%", fontSize: "0.675rem" }}
        ></TextField>
        <TextField
          value={gstNumber}
          onChange={(e) => setGstNumber(e.target.value)}
          size="small"
          placeholder="GST Number (optional)"
          sx={{
            px: 2,
            width: "90%",
            fontSize: "0.675rem",
            mt: "0.9rem",
            mb: "0.25rem",
          }}
        ></TextField>
        <TextField
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          size="small"
          placeholder="Phone Number"
          sx={{
            px: 2,
            width: "90%",
            fontSize: "0.675rem",
            mt: "0.9rem",
            mb: "0.25rem",
          }}
        ></TextField>
        <TextField
          value={state}
          onChange={(e) => setState(e.target.value)}
          size="small"
          placeholder="State"
          sx={{
            px: 2,
            width: "90%",
            fontSize: "0.675rem",
            mt: "0.9rem",
            mb: "0.25rem",
          }}
        ></TextField>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
          placeholder="Email"
          sx={{
            px: 2,
            width: "90%",
            fontSize: "0.675rem",
            mt: "0.9rem",
            mb: "0.25rem",
          }}
        ></TextField>
        <TextField
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          multiline
          rows={4}
          placeholder="Billing Address"
          sx={{
            px: 2,
            width: "90%",
            fontSize: "0.675rem",
            mt: "0.9rem",
            mb: "0.25rem",
          }}
        ></TextField>

        <Button
          variant="contained"
          onClick={handleCreateCompany}
          disabled={
            companyName && phoneNumber && state && email && billingAddress
              ? false
              : true
          }
          sx={{
            backgroundColor: theme.palette.primary.main,
            width: "90%",
            m: 2,
            fontSize: "0.9375rem",
            color: "white",
            textTransform: "none",
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          Create Company
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCompanyForm;
