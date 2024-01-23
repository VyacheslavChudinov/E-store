import { Box, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ConfirmationPage() {
  const { state } = useLocation();
  const { orderId } = state ?? {};

  if (!orderId) {
    return (
      <Typography variant="h3" display={"flex"} justifyContent={"center"}>
        Can't find the order.
      </Typography>
    );
  }

  return (
    <Box component={Paper} sx={{ p: "20px", mt: "50px" }}>
      <Typography variant="h5" gutterBottom>
        Payment has been received.
      </Typography>
      <Typography variant="subtitle1">
        Your order number is <b>{orderId}</b>. We have emailed your order
        confirmation, and will send you an update when your order has shipped.
      </Typography>
    </Box>
  );
}
