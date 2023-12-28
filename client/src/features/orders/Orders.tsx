import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { formatPrice } from "../../app/utils/format";
import Loading from "../../app/layouts/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchOrders, ordersSelectors } from "./ordersSlice";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Orders() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(ordersSelectors.selectAll);
  const { status } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status !== "idle") {
    return <Loading message="Loading orders..."></Loading>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Order Id</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right">Delivery fee</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => {
            return (
              <TableRow
                key={order.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" align="left" scope="row">
                  {order.id}
                </TableCell>
                <TableCell component="th" align="center" scope="row">
                  {order.orderStatus}
                </TableCell>
                <TableCell align="right">
                  {new Date(order.createdTime).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  {formatPrice(order.subtotal)}
                </TableCell>
                <TableCell align="right">
                  {formatPrice(order.deliveryFee)}
                </TableCell>
                <TableCell align="right">{formatPrice(order.total)}</TableCell>
                <TableCell align="center">
                  <Button
                    component={Link}
                    to={`/orders/${order.id}`}
                    variant="text"
                    color="primary"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
