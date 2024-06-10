import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

interface ShortcutItemProps {
  title: string;
  description: string;
  Icon: JSX.Element;
}

const ShortcutItem: React.FC<ShortcutItemProps> = ({
  title,
  description,
  Icon,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 1,
        width: "99px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #E0E0E0",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ color: theme.palette.primary.main }}>{Icon}</Box>
      <Typography
        sx={{
          color: theme.palette.secondary.contrastText,
          fontWeight: "bold",
          fontSize: 12,
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: theme.palette.secondary.dark,
          fontWeight: "bold",
          fontSize: 10,
          textAlign: "center",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ShortcutItem;
