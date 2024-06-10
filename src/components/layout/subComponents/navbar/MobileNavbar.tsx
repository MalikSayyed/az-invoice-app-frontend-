import React from "react";
import { AppBar, IconButton, Toolbar, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarItems from "./NavbarItems";

interface MobileNavbarProps {
  isOpen: boolean;
  onToggleSidebar: () => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  onToggleSidebar,
  isOpen,
}) => {
  const handleToggle = () => {
    onToggleSidebar();
  };

  return (
    <AppBar
      sx={{
        bgcolor: "white",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        position: { xs: "relative", sm: "sticky" },
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleToggle} size="large" disableRipple>
            <MenuIcon />
          </IconButton>
          <Box>
            <NavbarItems isOpen={isOpen} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MobileNavbar;
