import { Box, Drawer, Typography } from "@mui/material";
import MainMenuItems from "./MainMenuItems";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Close } from "@mui/icons-material";
import CompanyName from "./CompanyName";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const handleToggle = () => {
    onClose();
  };

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "white",
          boxShadow: "none",
          borderRight: "1px solid #E0E0E0",
          px: "15px",
          scrollbarWidth: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Close
            onClick={handleToggle}
            sx={{ position: "absolute", right: 14, top: 14 }}
          />
          <Box
            sx={{
              my: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: "2rem", color: "green" }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", textTransform: "none" }}
              >
                Inv
                <Typography
                  component="span"
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "gray" }}
                >
                  ome
                </Typography>
              </Typography>
              <Typography sx={{ fontSize: "0.65rem", color: "#607274" }}>
                Invoicing Admin
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid #E0E0E0",
              borderRadius: "8px",
            }}
          >
            <CompanyName />
          </Box>
          <MainMenuItems />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              top: "2%",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                Invome Admin DashBoard
              </Typography>
              <Typography sx={{ fontSize: "0.7rem" }}>
                @2020 All Rights Reserved
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileSidebar;
