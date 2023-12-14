export interface Basket {
  id: number;
  buyerId: string;
  items: BasketItem[];
}

export interface BasketItem {
  productId: number;
  name: string;
  pictureUrl: string;
  brand: string;
  type: string;
  price: number;
  quantity: number;
}
