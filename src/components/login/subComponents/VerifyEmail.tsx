import React from "react";
import { TextField, Button, Typography, Box, useTheme } from "@mui/material";
import { useState } from "react";
import { InterestsOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const VerifyEmail: React.FC = () => {
  const [verifyOtp, setVerifyOtp] = useState<string>("");

  const navigate = useNavigate();

  const notify = (message: string) => {
    if (message === "User verified successfully!") {
      toast.success("User verified successfully!");
    } else if (message === "Invalid or expired OTP") {
      toast.error("Invalid or expired OTP");
    }
  };

  const handleVerfiyEmail = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://d3a7975fhwm13k.cloudfront.net/auth/verify-email",
        {
          otp: verifyOtp,
        }
      );
      if (
        response.data &&
        response.data.message === "User verified successfully!"
      ) {
        notify(response.data.message);
        navigate("/login");
      } else if (
        response.data &&
        response.data.message === "Invalid or expired OTP"
      ) {
        notify(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setVerifyOtp("");
    }
  };

  const theme = useTheme();
  return (
    <Box
      component="form"
      onSubmit={handleVerfiyEmail}
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
          Verify your email
        </Typography>
        <Typography
          sx={{
            mb: "0.25rem",
            px: 2,
            fontSize: "0.8125rem",
            fontWeight: 400,
            color: "rgba(47, 43, 61, 0.78) !important",
          }}
        >
          Enter OTP sent to your email
        </Typography>
        <TextField
          value={verifyOtp}
          onChange={(e) => setVerifyOtp(e.target.value)}
          size="small"
          placeholder="OTP"
          sx={{ mb: "0.25rem", px: 2, width: "90%", fontSize: "0.675rem" }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={verifyOtp ? false : true}
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
          Verify Email
        </Button>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
