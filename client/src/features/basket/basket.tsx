import { Basket } from "../../app/models/basket";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";

function formatPrice(price: number) {
  return `$${(price / 100).toFixed()}`;
}

export default function Basket() {
  const { basket } = useStoreContext();

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
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
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{formatPrice(item.price)}</TableCell>
              <TableCell align="right">
                {formatPrice(item.price * item.quantity)}
              </TableCell>
              <TableCell align="center">
                <IconButton sx={{ color: "red" }}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
