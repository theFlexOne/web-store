import { GQLVariantElement } from "./getSlimProduct.types";

export interface GQLResponseData {
  data: GQLData;
}

export interface GQLData {
  [key: string]: GQLCollection;
}

export interface GQLProductsData {
  productsCollection: GQLProductsCollection;
}

export interface GQLProductsCollection extends GQLCollection {
  products: GQLElement[];
}

export interface GQLElement {
  [key: string]: unknown;
}

export interface GQLPageInfo {
  endCursor: string;
  hasNextPage: boolean;
  startCursor: string;
  hasPreviousPage: boolean;
}

export interface GQLBrand {
  id: string;
  name: string;
}

export interface GQLCategories {
  category: GQLBrand;
}

export interface GQLCollection {
  [key: string]: GQLElement[] | GQLPageInfo;
}

export interface GQLVariantsCollection extends GQLCollection {
  variants: GQLVariantElement[];
}

export interface GQLInventoryCollection extends GQLCollection {
  inventories: GQLInventoryElement[];
}

export interface GQLInventoryElement extends GQLElement {
  inventory: GQLSlimInventory;
}

export interface GQLSlimInventory {
  quantity: number;
}

export interface GQLReviewsCollection extends GQLCollection {
  reviews: GQLReviewElement[];
}

export interface GQLReviewElement extends GQLElement {
  review: GQLSlimReview;
}

export interface GQLSlimReview {
  rating: number;
}
