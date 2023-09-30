export interface GetCategoryProductAttributesResponse {
  data: Data;
}

export interface Data {
  categoriesCollection: CategoriesCollection;
}

export interface CategoriesCollection {
  categories: Category[];
}

export interface Category {
  category: Category2;
}

export interface Category2 {
  name: string;
  productCategoriesCollection: ProductCategoriesCollection;
}

export interface ProductCategoriesCollection {
  productsCategories: ProductsCategory[];
}

export interface ProductsCategory {
  productsCategory: ProductsCategory2;
}

export interface ProductsCategory2 {
  productsCollection: ProductsCollection;
}

export interface ProductsCollection {
  products: Product[];
}

export interface Product {
  product: Product2;
}

export interface Product2 {
  productVariantsCollection: ProductVariantsCollection;
}

export interface ProductVariantsCollection {
  productVariants: ProductVariant[];
}

export interface ProductVariant {
  productVariant: ProductVariant2;
}

export interface ProductVariant2 {
  productVariantAttributesCollection: ProductVariantAttributesCollection;
}

export interface ProductVariantAttributesCollection {
  productVariantAttributes: ProductVariantAttribute[];
}

export interface ProductVariantAttribute {
  productVariantAttribute: ProductVariantAttribute2;
}

export interface ProductVariantAttribute2 {
  value: string;
  productAttributes: ProductAttributes;
}

export interface ProductAttributes {
  attributes: Attributes;
}

export interface Attributes {
  name: string;
}
