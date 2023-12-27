export interface ShippingAddress {
  name: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}

export interface Order {
  saveAddress: boolean;
  shippingAddress: ShippingAddress;
}
