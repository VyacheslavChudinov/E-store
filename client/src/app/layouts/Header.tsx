import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

interface Props {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const contentLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const userLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navLinksStyle = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": { color: "secondary.main" },
  "&.active": { color: "secondary.main" },
};

export default function Header({ darkMode, setDarkMode }: Props) {
  function onThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography
            variant="h6"
            component={NavLink}
            to={"/"}
            sx={navLinksStyle}
          >
            E-STORE
          </Typography>
          <Switch checked={darkMode} onChange={onThemeChange} />
        </Box>

        <List sx={{ display: "flex" }}>
          {contentLinks.map(({ title, path }) => (
            <ListItem
              key={path}
              component={NavLink}
              to={path}
              sx={navLinksStyle}
            >
              <Typography>{title.toUpperCase()}</Typography>
            </ListItem>
          ))}
        </List>

        <Box display={"flex"} alignItems={"center"}>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent="4" color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: "flex" }}>
            {userLinks.map(({ title, path }) => (
              <ListItem
                key={path}
                component={NavLink}
                to={path}
                sx={navLinksStyle}
              >
                <Typography>{title.toUpperCase()}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
