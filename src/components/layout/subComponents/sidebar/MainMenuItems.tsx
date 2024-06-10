import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import {
  AccountBalanceWalletOutlined as AccountBalanceWalletOutlinedIcon,
  DashboardCustomizeOutlined as DashboardCustomizeOutlinedIcon,
  MonitorHeartOutlined as MonitorHeartOutlinedIcon,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";
import theme from "../../../../theme/theme";
import { useExportImportData } from "./useExportImportData";
// import { useReportData } from "./useReportData";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  text: string;
  icon: JSX.Element;
  subMenuItems?: MenuItem[];
  route?: string;
}

const mainMenuItems: MenuItem[] = [
  {
    text: "Dashboard",
    icon: <DashboardCustomizeOutlinedIcon />,
    route: "/test",
  },
  {
    text: "Customer",
    icon: <PersonOutlineOutlinedIcon />,
    route: "/customer",
  },
  { text: "Items", icon: <CategoryIcon />, route: "/item" },
  {
    text: "Sale",
    icon: <AccountBalanceWalletOutlinedIcon />,
    route: "/test",
    subMenuItems: [
      {
        text: "Create Invoice",
        icon: <MonitorHeartOutlinedIcon />,
        route: "/create-invoice",
      },
      {
        text: "Sales Invoice",
        icon: <MonitorHeartOutlinedIcon />,
        route: "/sales-history",
      },
      // {
      //   text: "Estimate",
      //   icon: <MonitorHeartOutlinedIcon />,
      //   route: "#",
      // },
    ],
  },
  {
    text: "Purchase",
    icon: <AccountBalanceWalletOutlinedIcon />,
    route: "#",
    subMenuItems: [
      {
        text: "Purchase Bill",
        icon: <MonitorHeartOutlinedIcon />,
        route: "/purchase-bill",
      },
    ],
  },
  {
    text: "Report",
    icon: <MonitorHeartOutlinedIcon />,
    route: "#",
  },
  {
    text: "Backup",
    icon: <MonitorHeartOutlinedIcon />,
    route: "#",
  },
];

const MenuItemComponent: React.FC<{ item: MenuItem; onClick?: () => void }> = ({
  item,
  onClick,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {item.subMenuItems ? (
        <Accordion
          expanded={expanded}
          onChange={handleClick}
          sx={{
            boxShadow: "none",
            color: "slategray",
            fontWeight: "bold",
            "&.MuiAccordion-root::before": {
              display: "none",
            },
          }}
          disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ListItemIcon sx={{ color: "lightgray" }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  style={{
                    fontWeight: 400,
                    color: "black",
                    fontFamily: "Public Sans",
                  }}
                >
                  {item.text}
                </Typography>
              }
            />
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ mt: -3 }}>
              {item.subMenuItems.map((subItem, index) => (
                <ListItem
                  key={index}
                  component={Link}
                  to={subItem.route || "#"}
                  sx={{
                    paddingLeft: 0,
                    boxShadow: "none",
                    textDecoration: "none",
                    color: "slategray",
                    fontWeight: "bold",
                  }}
                >
                  <ListItemIcon sx={{ color: "lightgray" }}>
                    {subItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        style={{
                          fontWeight: 400,
                          color: "black",
                          fontFamily: "Public Sans",
                        }}
                      >
                        {subItem.text}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ) : (
        <ListItem
          component={Link}
          onClick={
            (onClick && item.text === "Backup") || "Report"
              ? onClick
              : undefined
          }
          to={item.route || "#"}
          sx={{
            textDecoration: "none",
            color: "slategray",
            fontWeight: "bold",
          }}
        >
          <ListItemIcon sx={{ color: "lightgray" }}>{item.icon}</ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body2"
                style={{
                  fontWeight: 400,
                  color: "black",
                  fontFamily: "Public Sans",
                }}
              >
                {item.text}
              </Typography>
            }
          />
        </ListItem>
      )}
    </>
  );
};

const MainMenu: React.FC = () => {
  const Navigate = useNavigate();
  const handleMenuClick = (menuItem: string) => {
    if (menuItem === "Report") {
      // handleReportExport();
      Navigate("/report");
    } else if (menuItem === "Backup") {
      setOpenDialog(true);
    }
  };

  const { openDialog, handleExport, handleFileInputChange, setOpenDialog } =
    useExportImportData();

  // const { handleReportExport } = useReportData();

  return (
    <>
      <List>
        {mainMenuItems.map((item, index) => (
          <MenuItemComponent
            key={index}
            item={item}
            onClick={() => handleMenuClick(item.text)}
          />
        ))}
      </List>

      <Dialog
        maxWidth="xs"
        onClose={() => setOpenDialog(false)}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            borderTop: `4px solid #44814e `,
          }}
          id="customized-dialog-title"
        >
          <Typography mr={2}>Backup</Typography>
        </DialogTitle>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleExport}
            size="small"
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Export
          </Button>
          <input
            accept=".json"
            id="file-input"
            type="file"
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />
          <label htmlFor="file-input">
            <Button
              autoFocus
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#f4fcf6",
                color: "#44814e",
                "&:hover": { backgroundColor: "#d4fdf9" },
              }}
              component="span"
            >
              Import
            </Button>
          </label>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MainMenu;
