import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { Typography } from "@mui/material";

export default function RequireBasket() {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket || !basket?.items?.length)
    return (
      <Typography variant="h3" display="flex" justifyContent="center">
        Your basket is empty
      </Typography>
    );

  return <Outlet />;
}
