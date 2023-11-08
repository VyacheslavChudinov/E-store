import { Product } from "../../app/models/product";

interface Props {
  products: Product[];
  addProduct: () => void;
}

export default function Catalog({ products, addProduct }: Props) {
  return (
    <>
      <h1>Catalog</h1>
      {products.map((product) => (
        <div key={product.id}>
          {product.name} - {product.price}
        </div>
      ))}
      <button onClick={addProduct}>Add Product</button>
    </>
  );
}
