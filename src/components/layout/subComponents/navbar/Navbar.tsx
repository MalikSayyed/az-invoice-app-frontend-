import React from "react";
import { AppBar, IconButton, Toolbar, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarItems from "./NavbarItems";

interface NavbarProps {
  isOpen: boolean;
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isOpen }) => {
  const handleToggle = () => {
    onToggleSidebar();
  };

  return (
    <AppBar
      sx={{
        bgcolor: "white",
        boxShadow: "rgba(0.05, 0.05, 0.05, 0.05) 0px 0px 0px;",
        position: "sticky",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <IconButton onClick={handleToggle} size="large" disableRipple>
            <MenuIcon />
          </IconButton>
        </Box>

        <Box>
          <NavbarItems isOpen={isOpen} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
