import {
  Avatar,
  Box,
  Divider,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface ProfileMenuListProps {
  handleClose: () => void;
}
const profileSettingItems = [
  {
    text: "My Profile",
    icon: <PermIdentityIcon fontSize="inherit" />,
    route: "#",
  },
  {
    text: "Company",
    icon: <PaymentOutlinedIcon fontSize="inherit" />,
    route: "/company",
  },
];

const signOutItems = [
  { text: "Sign Out", icon: <LogoutIcon fontSize="inherit" />, route: "#" },
];

const ProfileMenuList: React.FC<ProfileMenuListProps> = ({ handleClose }) => {
  const [userName, setUserName] = useState<string>();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("loginToken");
    // navigate("/login");
    window.location.href = "https://main.d3fpndzy0l2tm5.amplifyapp.com/";
  };

  const handleMenuItemClick = (route: string) => {
    handleClose();
    navigate(route);
  };

  const fetchUserData = async () => {
    const response = await axios.get(
      "https://dnznqi8n78t2t.cloudfront.net/auth/get-user",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
        },
      }
    );
    if (response.data) {
      setUserName(response.data.username);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <MenuItem onClick={handleClose}>
        <Avatar />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {userName}
          <Typography sx={{ fontSize: "0.7em", color: "gray" }}>
            Admin
          </Typography>
        </Box>
      </MenuItem>
      <Divider />

      {profileSettingItems.map((item) => (
        <MenuItem
          key={item.text}
          onClick={() => handleMenuItemClick(item.route)}
          sx={{ gap: 2, alignItems: "center", pb: 0 }}
        >
          <Box sx={{ color: theme.palette.primary.main, fontSize: "1.2em" }}>
            {item.icon}
          </Box>
          <Typography sx={{ fontSize: "0.8em" }}>{item.text}</Typography>
        </MenuItem>
      ))}
      <Divider />

      {signOutItems.map((item) => (
        <MenuItem
          key={item.text}
          onClick={handleLogout}
          sx={{ gap: 2, alignItems: "center", pb: 0 }}
        >
          <Box sx={{ color: theme.palette.primary.main, fontSize: "1.2em" }}>
            {item.icon}
          </Box>
          <Typography sx={{ fontSize: "0.8em" }}>{item.text}</Typography>
        </MenuItem>
      ))}
    </>
  );
};

export default ProfileMenuList;
