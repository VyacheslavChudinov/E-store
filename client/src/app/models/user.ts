import { Basket } from "./basket";

export const enum UserRoles {
  admin = "admin",
  member = "member",
}

export interface User {
  email: string;
  token: string;
  basket?: Basket;
  roles?: UserRoles[];
}
