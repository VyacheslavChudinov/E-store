import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    agent.Catalog.getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
}
