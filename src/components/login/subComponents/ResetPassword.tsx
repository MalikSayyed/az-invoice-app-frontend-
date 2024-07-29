import React from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {
  InterestsOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [resetOtp, setResetOtp] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      await axios.post(
        "https://d3a7975fhwm13k.cloudfront.net/auth/reset-password",
        {
          newPassword: password,
          otp: resetOtp,
        }
      );

      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setPassword("");
    }
  };

  const handleSigninRedirect = () => {
    navigate("/login");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const theme = useTheme();
  return (
    <Box
      component="form"
      onSubmit={handleResetPassword}
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
          Reset your password 🔒
        </Typography>
        <Typography
          sx={{
            px: 2,
            pb: 2,
            fontSize: "0.9375rem",
            fontWeight: "400",
            color: "rgba(47, 43, 61, 0.78)",
          }}
        >
          Your new password must be different from previous password
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
          New Password
        </Typography>
        <TextField
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="small"
          placeholder="Password"
          sx={{ px: 2, width: "90%", fontSize: "0.675rem" }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={handleTogglePasswordVisibility}
                size="small"
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <Typography
          sx={{
            mt: "0.9rem",
            mb: "0.25rem",
            px: 2,
            fontSize: "0.8125rem",
            fontWeight: 400,
            color: "rgba(47, 43, 61, 0.78) !important",
          }}
        >
          Confirm Password
        </Typography>
        <TextField
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          size="small"
          placeholder="Confirm Password"
          sx={{ px: 2, width: "90%", fontSize: "0.675rem" }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={handleToggleConfirmPasswordVisibility}
                size="small"
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <Typography
          sx={{
            mt: "0.9rem",
            mb: "0.25rem",
            px: 2,
            fontSize: "0.8125rem",
            fontWeight: 400,
            color: "rgba(47, 43, 61, 0.78) !important",
          }}
        >
          Reset OTP
        </Typography>
        <TextField
          value={resetOtp}
          onChange={(e) => setResetOtp(e.target.value)}
          size="small"
          placeholder="Reset otp sent on email"
          sx={{ px: 2, width: "90%", fontSize: "0.675rem" }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={
            password &&
            confirmPassword &&
            password === confirmPassword &&
            resetOtp
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
          Reset Password
        </Button>
        <Box sx={{ px: 4 }} justifyContent="space-between">
          <Typography
            sx={{
              color: "rgba(47, 43, 61, 0.78) !important",
              fontSize: 15,
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Remember it?
            <Typography
              onClick={handleSigninRedirect}
              component="span"
              sx={{
                color: theme.palette.primary.main,
                ml: 1,
                fontSize: 15,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Sign in here
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
