import { Link, useParams } from "react-router-dom";
import { BasketTable } from "../basket/BasketTable";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchOrder, ordersSelectors } from "./ordersSlice";
import { BasketItem } from "../../app/models/basket";
import BasketSummary from "../basket/BasketSummary";
import { Button, Grid } from "@mui/material";
import { useEffect } from "react";

export default function OrderDetails() {
  const dispatch = useAppDispatch();
  const { id = "" } = useParams<{ id: string }>();

  const order = useAppSelector((state) =>
    ordersSelectors.selectById(state, parseInt(id))
  );

  useEffect(() => {
    if (!order && !!id) {
      dispatch(fetchOrder(parseInt(id)));
    }
  }, [dispatch, id, order]);

  if (!order) {
    return <h1>Can't find the order.</h1>;
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
          <Button
            component={Link}
            to={"/orders"}
            variant="text"
            sx={{ mb: "10px" }}
          >
            Back to orders
          </Button>
        </Grid>
        <Grid item xs={12}>
          <BasketTable
            isBasket={false}
            items={(order.orderItems as BasketItem[]) ?? []}
          />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary items={(order.orderItems as BasketItem[]) ?? []} />
        </Grid>
      </Grid>
    </>
  );
}
