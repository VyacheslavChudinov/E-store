import { Basket } from "../../app/models/basket";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { formatPrice } from "../../app/utils/format";
import { Link } from "react-router-dom";

export default function Basket() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [loadingProducts, setLoadingProducts] = useState<{
    [key: number]: boolean;
  }>({});

  function onAddItem(productId: number, quantity: number = 1) {
    setLoadingProducts((prev) => ({ ...prev, [productId]: true }));
    agent.Basket.addItem(productId, quantity)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() =>
        setLoadingProducts((prev) => ({ ...prev, [productId]: false }))
      );
  }

  function onRemoveItem(productId: number, quantity: number = 1) {
    setLoadingProducts((prev) => ({ ...prev, [productId]: true }));
    agent.Basket.remove(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() =>
        setLoadingProducts((prev) => ({ ...prev, [productId]: false }))
      );
  }

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Basket">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Brand</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box
                    component="img"
                    sx={{
                      maxHeight: { xs: 70, md: 100 },
                    }}
                    alt="Product image"
                    src={item.pictureUrl}
                  />
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="left">{item.brand}</TableCell>
                <TableCell align="left">{item.type}</TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={loadingProducts[item.productId]}
                    onClick={() => onRemoveItem(item.productId)}
                  >
                    <Remove />
                  </LoadingButton>

                  {item.quantity}

                  <LoadingButton
                    loading={loadingProducts[item.productId]}
                    onClick={() => onAddItem(item.productId)}
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{formatPrice(item.price)}</TableCell>
                <TableCell align="right">
                  {formatPrice(item.price * item.quantity)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={loadingProducts[item.productId]}
                    onClick={() => onRemoveItem(item.productId, item.quantity)}
                    sx={{ color: "red" }}
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
