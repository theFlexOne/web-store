export type MockProductJson = {
  name: string;
  price: number;
  thumbnail: string;
  brand: string;
  category: string;
};

export type MockProduct = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  thumbnail: string;
  brand: string;
  category: string[];
  tags: string[];
  attributes: string[];
};
