import React from "react";
import { TextField, Button, Typography, Box, useTheme } from "@mui/material";
import { useState } from "react";
import { InterestsOutlined } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const [email, setEmail] = useState<string>("");

  const theme = useTheme();
  const navigate = useNavigate();

  const notify = () => toast.error("Email not found!");

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(
        "https://dnznqi8n78t2t.cloudfront.net/auth/forgot-password",
        {
          email,
        }
      );
      if (response.data && response.data.message === "User not found") {
        notify();
      } else {
        navigate("/reset-password");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

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
          width: { xs: "80%", sm: "50%", md: "35%", lg: "25%", xl: "20%" },
          p: 1,
          backgroundColor: "white",
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
            pb: 1,
            textAlign: "left",
            color: "rgba(47, 43, 61, 0.78)",
            fontSize: "1.375rem",
          }}
        >
          Forgot Password? 🔒
        </Typography>
        <Typography
          sx={{
            px: 2,
            pb: 1,
            fontSize: "0.9375rem",
            fontWeight: "400",
            color: "rgba(47, 43, 61, 0.78)",
          }}
        >
          Enter your email and we′ll send you instructions to reset your
          password
        </Typography>
        <Typography
          sx={{
            my: "0.5rem",
            px: 2,
            fontSize: "0.8125rem",
            fontWeight: 400,
            color: "rgba(47, 43, 61, 0.78) !important",
          }}
        >
          Email
        </Typography>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
          placeholder="johndoe@gmail.com"
          sx={{ px: 2, width: "90%", fontSize: "0.675rem" }}
        ></TextField>
        <Button
          variant="contained"
          disabled={email ? false : true}
          onClick={handleSendEmail}
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
          Send reset email
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography
            onClick={handleLoginRedirect}
            sx={{
              color: theme.palette.primary.main,
              fontSize: 15,
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Typography
              component="span"
              sx={{
                color: theme.palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <ArrowBackIosIcon sx={{ fontSize: 12 }} />
            </Typography>
            Back to login
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
