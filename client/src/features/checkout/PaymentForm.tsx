import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import StoreFormTextInput from "../../app/components/StoreFormTextInput";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { StripeInput } from "./StripeInput";
import { ChangeEvent } from "react";
import { StripeInputEvent, CardState } from "./checkoutTypes";

interface PaymentFormProps {
  onCardInputChange: (
    event: StripeInputEvent & ChangeEvent<HTMLInputElement>
  ) => void;
  cardState: CardState;
}

export default function PaymentForm({
  onCardInputChange,
  cardState,
}: PaymentFormProps) {
  const { control } = useFormContext();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StoreFormTextInput
            label="Name on card"
            name="cardName"
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardNumber}
            helperText={cardState.elementError.cardNumber}
            label="Card number"
            autoComplete="cc-number"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardNumberElement,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardExpiry}
            helperText={cardState.elementError.cardExpiry}
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardExpiryElement,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardCvc}
            helperText={cardState.elementError.cardCvc}
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardCvcElement,
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
