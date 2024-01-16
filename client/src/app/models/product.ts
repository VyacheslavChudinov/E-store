export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantityInStock: number;
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  brands: string[];
  types: string[];
  pageNumber: number;
  pageSize: number;
}

export interface CreateProductPayload extends Omit<Product, "id"> {
  pictureFile: Blob;
}
export interface UpdateProductPayload extends Product {
  pictureFile?: Blob;
}
