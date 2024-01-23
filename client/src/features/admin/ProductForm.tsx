import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import StoreFormTextInput from "../../app/components/StoreFormTextInput";
import {
  CreateProductPayload,
  Product,
  UpdateProductPayload,
} from "../../app/models/product";
import { useEffect } from "react";
import useProducts from "../../app/hooks/useProducts";
import StoreFormSelectList from "../../app/components/StoreFormSelectList";
import StoreFileDropzone from "../../app/components/StoreFileDropzone";
import { yupResolver } from "@hookform/resolvers/yup";
import { productValidationSchema } from "./ProductValidation";
import { useAppDispatch } from "../../app/store/configureStore";
import {
  createProductAsync,
  updateProductAsync,
} from "../catalog/catalogSlice";
import { LoadingButton } from "@mui/lab";

interface ProductFormProps {
  product?: Product;
  onCancel: () => void;
}

export default function ProductForm({ product, onCancel }: ProductFormProps) {
  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver<any>(productValidationSchema),
  });
  const dispatch = useAppDispatch();
  const { brands, types } = useProducts();
  const watchFile = watch("pictureFile", null);

  useEffect(() => {
    if (product && !watchFile && !isDirty) {
      reset(product);
    }

    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [isDirty, product, reset, watchFile]);

  async function onFormSubmit(data: FieldValues) {
    if (product) {
      await dispatch(updateProductAsync(data as UpdateProductPayload));
    } else {
      await dispatch(createProductAsync(data as CreateProductPayload));
    }

    onCancel();
  }

  return (
    <Box component={Paper} sx={{ p: 4, mt: "50px" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Product Details
      </Typography>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <StoreFormTextInput
              control={control}
              name="name"
              label="Product name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StoreFormSelectList
              control={control}
              items={brands}
              name="brand"
              label="Brand"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StoreFormSelectList
              control={control}
              items={types}
              name="type"
              label="Type"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StoreFormTextInput
              control={control}
              name="price"
              label="Price"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StoreFormTextInput
              control={control}
              name="quantityInStock"
              label="Quantity in Stock"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <StoreFormTextInput
              multiline={true}
              rows={4}
              control={control}
              name="description"
              label="Description"
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <StoreFileDropzone control={control} name="pictureFile" />
              {!!watchFile && (
                <img
                  src={watchFile.preview}
                  alt="preview"
                  style={{ maxHeight: 200 }}
                ></img>
              )}

              {!watchFile && (
                <img
                  src={product?.pictureUrl}
                  alt={product?.name}
                  style={{ maxHeight: 200 }}
                ></img>
              )}
            </Box>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button variant="contained" color="inherit" onClick={onCancel}>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            color="success"
            type="submit"
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
