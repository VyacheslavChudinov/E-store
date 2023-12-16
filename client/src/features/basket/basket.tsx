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
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { formatPrice } from "../../app/utils/format";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function Basket() {
  const dispatch = useAppDispatch();

  const { basket } = useAppSelector((state) => state.basket);

  const { updatingProducts } = useAppSelector((state) => state.basket);

  async function onRemove(productId: number, quantity: number = 1) {
    await dispatch(
      removeBasketItemAsync({
        productId,
        quantity,
      })
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
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Subtotal</TableCell>
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
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      !!updatingProducts.find(
                        (updatingProductsId) =>
                          updatingProductsId === item.productId
                      )
                    }
                    onClick={() => onRemove(item.productId)}
                  >
                    <Remove />
                  </LoadingButton>

                  {item.quantity}

                  <LoadingButton
                    loading={
                      !!updatingProducts.find(
                        (updatingProductsId) =>
                          updatingProductsId === item.productId
                      )
                    }
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({ productId: item.productId })
                      )
                    }
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
                    loading={
                      !!updatingProducts.find(
                        (updatingProductsId) =>
                          updatingProductsId === item.productId
                      )
                    }
                    onClick={() => onRemove(item.productId, item.quantity)}
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
