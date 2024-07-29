import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  Grid,
  Checkbox,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {
  InterestsOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();

  const notify = () => toast.error("Invalid Email or Password!");

  const prefillForm = () => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const { email, password } = JSON.parse(rememberedUser);
      setEmail(email);
      setPassword(password);
      setRememberMe(true);
    }
  };

  useEffect(() => {
    prefillForm();
  }, []);

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleCreateAccountRedirect = () => {
    navigate("/signup");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://d3a7975fhwm13k.cloudfront.net/auth/login",
        {
          email,
          password,
        }
      );

      if (
        response.data.message ===
          "Cannot read properties of null (reading 'verified')" ||
        response.data.message === "Invalid credentials"
      ) {
        notify();
        navigate("/login");
      }

      if (
        response.data.message !==
          "Cannot read properties of null (reading 'verified')" &&
        response.data.message !== "Invalid credentials"
      ) {
        const loginToken = response.data.token;
        sessionStorage.setItem("loginToken", loginToken);

        if (rememberMe) {
          localStorage.setItem(
            "rememberedUser",
            JSON.stringify({ email, password })
          );
        } else {
          localStorage.removeItem("rememberedUser");
        }

        navigate("/conditional-company-form");
      }
    } catch (error) {
      console.log("error message:", error);
    } finally {
      setEmail("");
      setPassword("");
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
          Welcome to Project App!👋🏻
        </Typography>
        <Typography
          sx={{
            pl: 2,
            pr: 4,
            pb: 2,
            fontSize: "0.9375rem",
            fontWeight: "400",
            color: "rgba(47, 43, 61, 0.78)",
          }}
        >
          Please sign-in to your account and explore
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
          Email
        </Typography>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
          placeholder="johndoe@gmail.com"
          sx={{ px: 2, width: "90%", fontSize: "0.675rem" }}
        ></TextField>
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
          Password
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
        <Box sx={{ mt: 2, px: 2 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                size="small"
              />
              <label
                htmlFor="rememberMe"
                style={{
                  color: "rgba(47, 43, 61, 0.78)",
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                Remember Me
              </label>
            </Grid>
            <Grid item>
              <Typography
                onClick={handleForgotPassword}
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: 15,
                  mr: 2,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                Forgot Password?
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={email && password ? false : true}
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
          Login
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
            New on our platform ?
            <Typography
              onClick={handleCreateAccountRedirect}
              component="span"
              sx={{
                color: theme.palette.primary.main,
                ml: 2,
                fontSize: 15,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Create an account
            </Typography>
          </Typography>
        </Box>
        <Box sx={{ px: 4, mt: 2, textAlign: "center" }}>
          <Divider />
          <Box sx={{ my: 2 }}>
            <FacebookIcon sx={{ mr: 2, color: "blue" }} />
            <TwitterIcon sx={{ mr: 2, color: "lightblue" }} />
            <GitHubIcon sx={{ mr: 2, color: "black" }} />
            <GoogleIcon sx={{ color: "red" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
