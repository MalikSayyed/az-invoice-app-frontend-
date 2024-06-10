import { Link } from "react-router-dom"; // Import Link component
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

// const otherMenuItems = [
//   { text: "Leads", icon: <PersonOutlineOutlinedIcon /> },
//   { text: "Messages", icon: <CommentOutlinedIcon /> },
//   { text: "Settings", icon: <TuneOutlinedIcon /> },
// ];

const otherMenuItems = [
  {
    text: "Login",
    icon: <PersonOutlineOutlinedIcon />,
    route: "/login",
  },
  {
    text: "Create Invoice",
    icon: <CommentOutlinedIcon />,
    route: "/create-invoice",
  },
  {
    text: "Billing History",
    icon: <TuneOutlinedIcon />,
    route: "/billing-history",
  },
  {
    text: "Billing Address Form",
    icon: <CreditCardOutlinedIcon />,
    route: "/billing-address-form",
  },
];

const OtherMenuItems: React.FC = () => {
  return (
    <>
      <Typography variant="body2" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
        Others
      </Typography>
      <List>
        {otherMenuItems.map((item) => (
          <ListItem key={item.text} sx={{ cursor: "pointer" }}>
            <ListItemIcon sx={{ color: "lightgray" }}>{item.icon}</ListItemIcon>
            <Link to={item.route} style={{ textDecoration: "none" }}>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", color: "lightslategray" }}
                  >
                    {item.text}
                  </Typography>
                }
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default OtherMenuItems;
