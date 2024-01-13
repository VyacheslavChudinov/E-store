import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import {
  productSelectors,
  fetchProductsAsync,
  fetchFilters,
} from "../../features/catalog/catalogSlice";

export default function useProducts() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, brands, types, paginationDetails } =
    useAppSelector((state) => state.catalog);

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

  return {
    products,
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    paginationDetails,
  };
}
