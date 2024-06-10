import { Drawer, Typography, Box, useTheme } from "@mui/material";
import MainMenuItems from "./MainMenuItems";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CompanyName from "./CompanyName";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();

  const drawerStyles = {
    "& .MuiDrawer-paper": {
      width: { sm: "17em" },
      backgroundColor: "white",
      boxShadow: "rgba(0.05, 0.05, 0.05, 0.05) ",
      overflowX: "auto",
      px: "15px",
      "&::-webkit-scrollbar": {
        width: "3px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: theme.palette.primary.main,
      },
    },
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      onClose={onClose}
      ModalProps={{
        BackdropProps: {
          invisible: true, // This will remove the overlay
        },
      }}
      sx={drawerStyles}>
      <Box
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}>
        <AutoAwesomeIcon sx={{ fontSize: "2rem", color: "green" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", textTransform: "none" }}>
            Inv
            <Typography component="span" variant="h5" sx={{ fontWeight: "bold", color: "#607274" }}>
              ome
            </Typography>
          </Typography>
          <Typography sx={{ fontSize: "0.65rem", color: "#607274" }}>Invoicing Admin</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          border: "1px solid #E0E0E0",
          borderRadius: "8px",
        }}>
        <CompanyName />
      </Box>
      <MainMenuItems />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: "2%",
        }}>
        {/* <Box>
          <Typography sx={{ fontSize: "0.7rem", fontWeight: "bold" }}>
            Invome Admin DashBoard
          </Typography>
          <Typography sx={{ fontSize: "0.7rem" }}>
            @2020 All Rights Reserved
          </Typography>
        </Box> */}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
