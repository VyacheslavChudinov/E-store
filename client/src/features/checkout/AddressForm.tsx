import { Grid } from "@mui/material";
import StoreFormTextInput from "../../app/components/StoreFormTextInput";
import { useFormContext } from "react-hook-form";
import StoreFormCheckbox from "../../app/components/StoreFormCheckbox";

export default function AddressForm() {
  const { control, formState } = useFormContext();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <StoreFormTextInput control={control} name="name" label="Name" />
        </Grid>
        <Grid item xs={12}>
          <StoreFormTextInput
            control={control}
            name="address1"
            label="Address line 1"
          />
        </Grid>
        <Grid item xs={12}>
          <StoreFormTextInput
            control={control}
            name="address2"
            label="Address line 2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StoreFormTextInput control={control} name="city" label="City" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StoreFormTextInput control={control} name="state" label="State" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StoreFormTextInput
            control={control}
            name="zip"
            label="Zip / Postal code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StoreFormTextInput
            control={control}
            name="country"
            label="Country"
          />
        </Grid>
        <Grid item xs={12}>
          <StoreFormCheckbox
            disabled={!formState.isDirty}
            control={control}
            name="saveAddress"
            label="Save as default address"
          />
        </Grid>
      </Grid>
    </>
  );
}
