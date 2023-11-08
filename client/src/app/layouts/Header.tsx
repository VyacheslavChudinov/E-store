import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: Props) {
  function onThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">E-store</Typography>
        <Switch checked={darkMode} onChange={onThemeChange} />
      </Toolbar>
    </AppBar>
  );
}
