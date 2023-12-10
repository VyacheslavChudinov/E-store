import agent from "../../app/api/agent";
import Loading from "../../app/layouts/Loading";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.getProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading message="Loading Products..." />;
  }

  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
}
