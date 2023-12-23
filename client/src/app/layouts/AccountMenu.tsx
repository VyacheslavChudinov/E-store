import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { logout } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";

function AccountMenu() {
  const { user } = useAppSelector((state) => state.account);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} size="large" color="inherit">
        {user?.email}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {!!user && (
          <MenuItem
            onClick={() => {
              dispatch(clearBasket());
              dispatch(logout());
            }}
          >
            Logout
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
export default AccountMenu;
