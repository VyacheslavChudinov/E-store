import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import StoreFormTextInput from "../../app/components/StoreFormTextInput";
import { Product } from "../../app/models/product";
import { useEffect } from "react";
import useProducts from "../../app/hooks/useProducts";
import StoreFormSelectList from "../../app/components/StoreFormSelectList";
import StoreFileDropzone from "../../app/components/StoreFileDropzone";
import { yupResolver } from "@hookform/resolvers/yup";
import { productValidationSchema } from "./ProductValidation";

interface ProductFormProps {
  product?: Product;
  onCancel: () => void;
}

export default function ProductForm({ product, onCancel }: ProductFormProps) {
  const { control, reset, watch, handleSubmit } = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver<any>(productValidationSchema),
  });
  const { brands, types } = useProducts();
  const watchFile = watch("pictureFile", null);

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  function onFormSubmit() {}

  return (
    <Box component={Paper} sx={{ p: 4 }}>
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
          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}