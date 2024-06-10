import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ShortcutItem from "./ShortcutItem";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CustomPopover from "../../../common/CustomPopover";

const ShortcutsItems = [
  {
    title: "Invoice App",
    description: "Manage Accounts",
    icon: <DescriptionOutlinedIcon />,
  },
  { title: "HR", description: "Coming Soon", icon: <DateRangeIcon /> },
];

interface ShortcutsMenuProps {
  anchorEl: HTMLButtonElement | HTMLDivElement | null;
  handleClose: () => void;
  popoverId: string;
}

const ShortcutsMenu: React.FC<ShortcutsMenuProps> = ({
  anchorEl,
  handleClose,
  popoverId,
}) => {
  return (
    <CustomPopover
      anchorEl={anchorEl}
      handleClose={handleClose}
      popoverId={popoverId}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1,
        }}
      >
        <Typography sx={{ color: "black", fontWeight: "bold", fontSize: 15 }}>
          Shortcuts
        </Typography>
        <DashboardCustomizeOutlinedIcon sx={{ color: "gray" }} />
      </Box>
      <Divider />
      <Box
        sx={{
          my: 1,
          width: "220px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {ShortcutsItems.map((item) => (
          <ShortcutItem
            key={item.title}
            title={item.title}
            description={item.description}
            Icon={item.icon}
          />
        ))}
      </Box>
    </CustomPopover>
  );
};

export default ShortcutsMenu;
