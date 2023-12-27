import { Button, Grid, Typography } from "@mui/material";
import { BasketTable } from "../basket/BasketTable";
import { useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "../basket/BasketSummary";
import { Link } from "react-router-dom";

export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      <BasketTable isBasket={false} items={basket?.items ?? []} />
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
