import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { NotFound } from "../errors/NotFound";
import Loading from "../../app/layouts/Loading";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "../basket/basketSlice";

export default function ProductDetails() {
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find(
    (basketItem) => basketItem.productId === product?.id
  );

  function onQuantityChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value);
    if (value >= 0) {
      setQuantity(value);
    }
  }

  function onSubmit() {
    if (!product) {
      return;
    }

    setIsSubmitting(true);

    if (!item || quantity > item.quantity) {
      const quantityToAdd = quantity - (item?.quantity ?? 0);
      agent.Basket.addItem(product?.id, quantityToAdd)
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error))
        .finally(() => setIsSubmitting(false));

      return;
    }

    if (quantity < item.quantity) {
      const quantityToRemove = item.quantity - quantity;
      agent.Basket.remove(item?.productId, quantityToRemove)
        .then(() =>
          dispatch(
            removeItem({
              productId: item?.productId,
              quantity: quantityToRemove,
            })
          )
        )
        .catch((error) => console.log(error))
        .finally(() => setIsSubmitting(false));
    }
  }

  useEffect(() => {
    if (!id) {
      return;
    }

    agent.Catalog.getProduct(parseInt(id))
      .then((response) => setProduct(response))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [id, item]);

  if (isLoading) return <Loading message="Loading Product..." />;
  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        ></img>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 3 }}></Divider>
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} sx={{ mt: "10px" }}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in cart"
              fullWidth
              value={quantity}
              onChange={onQuantityChange}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              loading={isSubmitting}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              onClick={onSubmit}
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
            >
              {item ? "Update quantity" : "Add to cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
