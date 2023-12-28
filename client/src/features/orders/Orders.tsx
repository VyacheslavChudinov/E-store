import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Order } from "../../app/models/order";
import agent from "../../app/api/agent";
import { formatPrice } from "../../app/utils/format";
import Loading from "../../app/layouts/Loading";

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    agent.Orders.getOrders()
      .then((response) => setOrders(response))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
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
              <TableCell align="right">{formatPrice(order.subtotal)}</TableCell>
              <TableCell align="right">
                {formatPrice(order.deliveryFee)}
              </TableCell>
              <TableCell align="right">{formatPrice(order.total)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
