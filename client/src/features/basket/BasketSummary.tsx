import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { formatPrice } from "../../app/utils/format";
import { BasketItem } from "../../app/models/basket";

interface BasketSummaryProps {
  items: BasketItem[];
}

export default function BasketSummary(props: BasketSummaryProps) {
  const { items } = props;

  const subtotal =
    items.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;
  const total = subtotal + deliveryFee;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{formatPrice(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">{formatPrice(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{formatPrice(total)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
