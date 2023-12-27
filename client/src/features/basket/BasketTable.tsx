import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { formatPrice } from "../../app/utils/format";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/basket";

interface BasketTableProps {
  isBasket: boolean;
  items: BasketItem[];
}

export function BasketTable(props: BasketTableProps) {
  const dispatch = useAppDispatch();
  const { updatingProducts } = useAppSelector((state) => state.basket);
  const { items, isBasket } = props;

  async function onRemove(productId: number, quantity: number = 1) {
    await dispatch(
      removeBasketItemAsync({
        productId,
        quantity,
      })
    );
  }

  return (
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
            {isBasket && <TableCell align="center"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
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
                {isBasket && (
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
                )}

                {item.quantity}

                {isBasket && (
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
                )}
              </TableCell>
              <TableCell align="right">{formatPrice(item.price)}</TableCell>
              <TableCell align="right">
                {formatPrice(item.price * item.quantity)}
              </TableCell>
              {isBasket && (
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
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
