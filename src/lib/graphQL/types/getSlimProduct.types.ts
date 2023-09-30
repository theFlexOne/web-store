import {
  GQLBrand,
  GQLCategories,
  GQLElement,
  GQLInventoryCollection,
  GQLReviewsCollection,
  GQLVariantsCollection,
} from "./gqlBase.types";

export interface GQLProductElement extends GQLElement {
  product: GQLSlimProduct;
}

export interface GQLSlimProduct {
  id: string;
  name: string;
  brand: GQLBrand;
  basePrice: string;
  thumbnail: string;
  categories: GQLCategories;
  variantsCollection: GQLVariantsCollection;
}

export interface GQLVariantElement extends GQLElement {
  variant: GQLSlimVariant;
}

export interface GQLSlimVariant {
  id: string;
  priceOffset: string;
  quantity: string;
  inventoryCollection: GQLInventoryCollection;
  reviewsCollection: GQLReviewsCollection;
}
