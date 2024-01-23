import { Basket } from "../../app/models/basket";
import { Box, Button, Grid } from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import { BasketTable } from "./BasketTable";

export default function Basket() {
  const { basket, updatingProducts } = useAppSelector((state) => state.basket);

  return (
    <Box sx={{ mt: "50px" }}>
      <BasketTable isBasket={true} items={basket?.items ?? []} />

      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary items={basket?.items ?? []} />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
            disabled={!!updatingProducts?.length}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
