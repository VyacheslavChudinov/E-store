import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setProductParams,
} from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxGroup from "../../app/components/CheckboxGroup";
import SimplePagination from "../../app/components/SimplePagination";

const sortOptions = [
  { value: "name", label: "Alphabetical - A-Z" },
  { value: "nameDesc", label: "Alphabetical - Z-A" },
  { value: "price", label: "Price - Low to High " },
  { value: "priceDesc", label: "Price - High to Low" },
];

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { paginationDetails } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const { productsLoaded, filtersLoaded, brands, types, productParams } =
    useAppSelector((state) => state.catalog);

  const [selectedValue, setSelectedValue] = useState(productParams.orderBy);

  function onPaginationChange(pageNumber: number) {
    dispatch(setProductParams({ pageNumber }));
  }

  function onSortChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedValue(event.target.value);
    dispatch(setProductParams({ orderBy: event.target.value }));
  }

  function onBrandChange(selectedBrands: string[]) {
    dispatch(setProductParams({ brands: selectedBrands, pageNumber: 1 }));
  }

  function onTypeChange(selectedTypes: string[]) {
    dispatch(setProductParams({ types: selectedTypes, pageNumber: 1 }));
  }

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

        {filtersLoaded && (
          <Paper sx={{ mb: 2, p: 2 }}>
            <CheckboxGroup
              items={brands}
              checked={productParams.brands}
              onChange={onBrandChange}
            />
          </Paper>
        )}
        {filtersLoaded && (
          <Paper sx={{ mb: 2, p: 2 }}>
            <CheckboxGroup
              items={types}
              checked={productParams.types}
              onChange={onTypeChange}
            />
          </Paper>
        )}
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products}></ProductList>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={9}>
        {!!paginationDetails && !!products.length && (
          <SimplePagination
            onChange={onPaginationChange}
            paginationDetails={paginationDetails}
          />
        )}
      </Grid>
    </Grid>
  );
}
