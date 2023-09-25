// Application model types mapped from api types

import { Json } from "./database.types";

export type User = {
  id: string;
  email: string;
  role: "user" | "admin";
};

export type Customer = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  address: {
    street: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
  };
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
};

export type ProductVariant = {
  id: number;
  productId: string;
  attributes: Json;
  price: number;
  stock: number;
};

export type Cart = {
  id: string;
  customerId: string;
  cartItems: CartItem[];
};

export type CartItem = {
  id: number;
  productId: string;
  productVariantId: number;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  orderItems: OrderItem[];
  status: "pending" | "paid" | "shipped" | "delivered";
};

export type OrderItem = {
  id: number;
  productId: string;
  productVariantId: number;
  quantity: number;
};
