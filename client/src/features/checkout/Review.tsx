import { Grid } from "@mui/material";
import { BasketTable } from "../basket/BasketTable";
import { useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "../basket/BasketSummary";

export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);

  return (
    <>
      <BasketTable isBasket={false} items={basket?.items ?? []} />
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary items={basket?.items ?? []} />
        </Grid>
      </Grid>
    </>
  );
}
