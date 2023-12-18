import Loading from "../../app/layouts/Loading";
import ProductList from "./ProductList";
import { useEffect } from "react";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
} from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { productsLoaded, filtersLoaded, status } = useAppSelector(
    (state) => state.catalog
  );

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

  if (status === "pendingFetchProducts" || status === "pendingFetchFilters") {
    return <Loading message="Loading Products..." />;
  }

  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
}
