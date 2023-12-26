import { Typography, Grid, FormControlLabel, Checkbox } from "@mui/material";
import StoreFormInput from "../../app/components/StoreFormInput";
import { useFormContext } from "react-hook-form";

export default function AddressForm() {
  const { control } = useFormContext();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <StoreFormInput control={control} name="firstName" label="Name" />
        </Grid>
        <Grid item xs={12}>
          <StoreFormInput
            control={control}
            name="address1"
            label="Address line 1"
          />
        </Grid>
        <Grid item xs={12}>
          <StoreFormInput
            control={control}
            name="address2"
            label="Address line 2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StoreFormInput control={control} name="city" label="City" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StoreFormInput control={control} name="state" label="State" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StoreFormInput
            control={control}
            name="zip"
            label="Zip / Postal code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StoreFormInput control={control} name="country" label="Country" />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </>
  );
}
