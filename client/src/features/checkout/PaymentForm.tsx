import { Typography, Grid, FormControlLabel, Checkbox } from "@mui/material";
import { useFormContext } from "react-hook-form";
import StoreFormInput from "../../app/components/StoreFormInput";

export default function PaymentForm() {
  const { control } = useFormContext();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StoreFormInput
            label="Name on card"
            name="cardName"
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StoreFormInput
            label="Card number"
            name="cardNumber"
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StoreFormInput
            label="Expiry date"
            name="expDate"
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StoreFormInput
            label="Last three digits on signature strip"
            name="cvv"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </>
  );
}
