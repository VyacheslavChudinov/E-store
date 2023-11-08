import { useEffect, useState } from "react";
import { Product } from "../models/product.ts";
import Catalog from "../../features/catalog/Catalog.tsx";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  function addProduct() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 10,
        name: `product${prevState.length + 10}`,
        price: prevState.length * 100 + 100,
        brand: "brand",
        description: "description",
        pictureUrl: "http://picsum.photos/100",
      },
    ]);
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <div>
        <h1>e-store</h1>
        <Catalog products={products} addProduct={addProduct} />
      </div>
    </>
  );
}

export default App;
