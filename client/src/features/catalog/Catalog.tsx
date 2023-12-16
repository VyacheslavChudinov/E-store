import Loading from "../../app/layouts/Loading";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, productsLoaded]);

  if (status === "pendingFetchProducts") {
    return <Loading message="Loading Products..." />;
  }

  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
}
