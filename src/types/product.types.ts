export type ProductBrand = {
  id: number;
  name: string;
};

export type ProductSubcategory = {
  name: string;
};

export type ProductCategory = {
  id: number;
  name: string;
  subcategories: string[];
};

export type ProductVariantAttributes = {
  [key: string]: string;
};

export type ProductVariantInventory = {
  stock_quantity: number;
  price: number;
};

export type ProductVariant = {
  price: number;
  attributes: ProductVariantAttributes;
  image_urls: string[];
  inventory: ProductVariantInventory;
};

export type Product = {
  name: string;
  description: string;
  thumbnail: string;
  brand: ProductBrand;
  category: ProductCategory;
  tags: string[];
  variants: ProductVariant[];
};
