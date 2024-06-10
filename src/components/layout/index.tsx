import React, { useEffect, useState } from "react";
import { Hidden, useMediaQuery, Box, Paper } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import Sidebar from "./subComponents/sidebar/Sidebar";
import Navbar from "./subComponents/navbar/Navbar";
import MobileSidebar from "./subComponents/sidebar/MobileSidebar";
import MobileNavbar from "./subComponents/navbar/MobileNavbar";

const Layout: React.FC = () => {
  const isLargeScreen = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(isLargeScreen);
  }, [isLargeScreen]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const contentStyles = {
    flexGrow: 1, // Allow main content to grow and shrink
    transition: "margin-left 0.2s ease-in-out",
    ml: isSidebarOpen ? { xs: 0, sm: "17rem" } : { sm: 0 },
    maxHeight: "100vh",
  };

  return (
    <>
      <CssBaseline />
      <Box sx={contentStyles}>
        {/* Navbar hides on screen sizes smaller than 600px */}
        <Hidden smDown>
          <Navbar isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
        </Hidden>
        {/* MobileNavbar hides on screen sizes larger than 600px */}
        <Hidden smUp>
          <MobileNavbar isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
        </Hidden>
        {/* Sidebar hides on screen sizes smaller than 600px */}
        <Hidden smDown>
          <Sidebar isOpen={isSidebarOpen} onClose={handleToggleSidebar} />
        </Hidden>
        {/* MobileSidebar hides on screen sizes larger than 600px */}
        <Hidden smUp>
          <MobileSidebar isOpen={isSidebarOpen} onClose={handleToggleSidebar} />
        </Hidden>

        <Box
          sx={{
            maxHeight: `calc(100vh - 10vh )`,
            boxSizing: "border-box",
            overflow: "auto",
            maxWidth: "100vw",
          }}>
          <Paper elevation={0} sx={{ m: { sm: 3 }, p: 4 }}>
            <Outlet />
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
