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
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import AccountMenu from "./AccountMenu";
import { isAdmin } from "../utils/user";

interface Props {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const contentLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  ...(import.meta.env.DEV ? [{ title: "errors", path: "/errors" }] : []),
];

const userLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navLinksStyle = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": { color: "error.light" },
  "&.active": { color: "error.light" },
};

export default function Header({ darkMode, setDarkMode }: Props) {
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const itemsCount = basket?.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function onThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
          {isAdmin(user) && (
            <ListItem component={NavLink} to={"/inventory"} sx={navLinksStyle}>
              <Typography>INVENTORY</Typography>
            </ListItem>
          )}
        </List>

        <Box display={"flex"} alignItems={"center"}>
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={itemsCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {!user && (
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
          )}
          {!!user && <AccountMenu />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
