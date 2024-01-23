import {
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { formatPrice } from "../../app/utils/format";
import useProducts from "../../app/hooks/useProducts";
import StorePagination from "../../app/components/StorePagination";
import { deleteProductAsync, setProductParams } from "../catalog/catalogSlice";
import { useAppDispatch } from "../../app/store/configureStore";
import ProductForm from "./ProductForm";
import { useState } from "react";
import { Product } from "../../app/models/product";
import { LoadingButton } from "@mui/lab";

export default function Inventory() {
  const { products, paginationDetails } = useProducts();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [loadingProductId, setLoadingProductId] = useState(0);
  const dispatch = useAppDispatch();

  function onSelectProduct(product: Product) {
    setIsEditMode(true);
    setSelectedProduct(product);
  }

  async function onDeleteProduct(id: number) {
    try {
      setLoadingProductId(id);
      await dispatch(deleteProductAsync(id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProductId(0);
    }
  }

  function onEditCancel() {
    setIsEditMode(false);
    setSelectedProduct(undefined);
  }

  function onPaginationChange(pageNumber: number) {
    dispatch(setProductParams({ pageNumber }));
  }

  if (isEditMode)
    return <ProductForm product={selectedProduct} onCancel={onEditCancel} />;

  return (
    <Box sx={{ mt: "50px" }}>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h4">
          Inventory
        </Typography>
        <Button
          sx={{ m: 2 }}
          size="large"
          variant="contained"
          onClick={() => setIsEditMode(true)}
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <img
                      src={product.pictureUrl}
                      alt={product.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell align="center">{product.type}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.quantityInStock}</TableCell>
                <TableCell align="right">
                  <LoadingButton
                    startIcon={<Edit />}
                    onClick={() => onSelectProduct(product)}
                    loading={loadingProductId === product.id}
                  />
                  <LoadingButton
                    startIcon={<Delete />}
                    color="error"
                    onClick={async () => await onDeleteProduct(product.id)}
                    loading={loadingProductId === product.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!!paginationDetails && (
        <Box sx={{ pt: 2 }}>
          <StorePagination
            paginationDetails={paginationDetails}
            onChange={onPaginationChange}
          />
        </Box>
      )}
    </Box>
  );
}
