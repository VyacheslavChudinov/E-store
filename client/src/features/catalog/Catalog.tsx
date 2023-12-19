import Loading from "../../app/layouts/Loading";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setProductParams,
} from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";

const sortOptions = [
  { value: "name", label: "Alphabetical - A-Z" },
  { value: "nameDesc", label: "Alphabetical - Z-A" },
  { value: "price", label: "Price - Low to High " },
  { value: "priceDesc", label: "Price - High to Low" },
];

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    status,
    productParams,
  } = useAppSelector((state) => state.catalog);

  const [selectedValue, setSelectedValue] = useState(productParams.orderBy);

  function onSortChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedValue(event.target.value);
    dispatch(setProductParams({ orderBy: event.target.value }));
  }

  const isLoading = status.includes("pending");

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) {
      dispatch(fetchFilters());
    }
  }, [dispatch, filtersLoaded]);

  if (isLoading) {
    return <Loading message="Loading Products..." />;
  }

  return (
    <Grid container spacing={4} sx={{ mb: 2 }}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            sortOptions={sortOptions}
            selectedValue={selectedValue}
            onChange={onSortChange}
          />
        </Paper>

        {!isLoading && (
          <Paper sx={{ mb: 2, p: 2 }}>
            <FormGroup>
              {brands.map((brand) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label={brand}
                  key={brand}
                />
              ))}
            </FormGroup>
          </Paper>
        )}
        {!isLoading && (
          <Paper sx={{ mb: 2, p: 2 }}>
            <FormGroup>
              {types.map((type) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label={type}
                  key={type}
                />
              ))}
            </FormGroup>
          </Paper>
        )}
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products}></ProductList>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={9}>
        {!isLoading && (
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>Displaying 1-10 of 100 products</Typography>
            <Pagination count={10} color="secondary" size="large" />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
