import React from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Tooltip,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import ProfileMenu from "./ProfileMenu";
import ShortcutsMenu from "./ShortcutsMenu";
import { useNavigate } from "react-router-dom";

interface NavbarItemsProps {
  isOpen: boolean;
}
const NavbarItems: React.FC<NavbarItemsProps> = ({ isOpen }) => {
  const Navigate = useNavigate();
  const [anchorShorcutsEl, setAnchorShorcutsEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleShortcutsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorShorcutsEl(event.currentTarget);
  };

  const handleShorcutsClose = () => {
    setAnchorShorcutsEl(null);
  };

  const [anchorProfileEl, setAnchorProfileEl] =
    React.useState<HTMLAnchorElement | null>(null);

  //-------------
  const open = Boolean(anchorProfileEl);
  //-------------

  const handleProfileClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorProfileEl(null);
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isOpen
          ? { xs: "column", md: "row" }
          : { xs: "column", sm: "row" },
        alignItems: "center",
      }}
    >
      <Box>
        <InputBase
          sx={{
            width: "100%",
            py: 0.5,
            px: 1,
            m: 1,
            flex: 1, // Allow flexible width
            border: "1px solid #E0E0E0",
            borderRadius: 3,
            "& .MuiInputBase-input": {
              fontSize: "0.85rem",
            },
          }}
          placeholder="Search here…"
          endAdornment={<SearchIcon color="action" />}
        />
      </Box>
      <Box
        sx={{
          m: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tooltip title="Notifications">
          <IconButton>
            <NotificationsIcon color="action" />
          </IconButton>
        </Tooltip>

        <Button
          variant="contained"
          onClick={() => Navigate("create-invoice")}
          sx={{
            mx: 1,
            textTransform: "none",
            borderRadius: 3,
            bgcolor: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
          startIcon={<InsertDriveFileOutlinedIcon />}
        >
          New Invoices
        </Button>
        <Tooltip title="Shortcuts Menu">
          <IconButton sx={{ mr: 1 }} onClick={handleShortcutsClick}>
            <DashboardCustomizeOutlinedIcon />
          </IconButton>
        </Tooltip>
        <ShortcutsMenu
          anchorEl={anchorShorcutsEl}
          handleClose={handleShorcutsClose}
          popoverId="shorcuts-popover"
        />
        <Tooltip title="Profile settings">
          <IconButton
            onClick={handleProfileClick}
            size="small"
            href=""
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>

        <ProfileMenu
          anchorEl={anchorProfileEl}
          handleClose={handleProfileClose}
          open={open}
        />
      </Box>
    </Box>
  );
};

export default NavbarItems;
