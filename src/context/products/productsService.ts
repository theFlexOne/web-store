import queryGraphQL from "../../lib/supabase/supabaseGQL";
import { ProductSlim } from "../../types/models.types";
import {
  GET_SLIM_PRODUCTS,
  GET_PRODUCT_ATTRIBUTES_FOR_CATEGORY,
} from "../../lib/graphQL";
import { GQLResponseData } from "../../lib/graphQL/types/gqlBase.types";
import { GQLSlimProduct } from "../../lib/graphQL/types/getSlimProduct.types";
import { GetCategoryProductAttributesResponse } from "../../lib/graphQL/types/getProductAttributesForCategory.types";

export async function getProductsSlim(
  limit = 10,
  offset: string | null = null
): Promise<{ data: ProductSlim[] | null; error: Error | null }> {
  const { data, error } = await queryGraphQL(GET_SLIM_PRODUCTS, {
    limit,
    offset,
  });

  if (error) {
    const err = new Error(error.message);
    return { data: null, error: err };
  }
  const gqlData = data as unknown as GQLResponseData;
  const gqlProducts = gqlData.data.productsCollection.products as unknown as {
    product: GQLSlimProduct;
  }[];

  const products: ProductSlim[] = gqlProducts.map(
    ({ product }: { product: GQLSlimProduct }) => {
      const { id, name, thumbnail, basePrice, brand } = product;
      const { category } = product.categories;
      const variants = product.variantsCollection.variants.map(
        ({ variant }) => {
          const { id, priceOffset, inventoryCollection } = variant;
          const quantity = inventoryCollection.inventories.reduce(
            (acc, { inventory }) => acc + inventory.quantity,
            0
          );

          return { id, priceOffset: +priceOffset, quantity };
        }
      );
      const rating = calculateProductRating(product);
      const reviewsCount = countProductReviews(product);

      return {
        id,
        name,
        thumbnail,
        basePrice: +basePrice,
        brand: brand.name,
        category: category.name,
        variants,
        rating,
        reviewsCount,
      };
    }
  );

  return { data: products, error: null };
}

export async function getFiltersForProductCategory(
  catName: string
): Promise<{ [key: string]: unknown }> {
  const { data, error } = await queryGraphQL(
    GET_PRODUCT_ATTRIBUTES_FOR_CATEGORY,
    {
      catName: { eq: catName },
    }
  );

  if (error) {
    const err = new Error(error.message);
    return { data: null, error: err };
  }

  const gqlData = data as unknown as GetCategoryProductAttributesResponse;

  console.log(gqlData);

  const gqlCategories = gqlData.data.categoriesCollection.categories;

  const attributes: { [k: string]: string[] } = (() => {
    const attributes: Map<string, string[]> = new Map<string, string[]>();

    console.log(gqlCategories);

    return Object.fromEntries(attributes);
  })();

  return { data: attributes, error: null };
}

function calculateProductRating(product: GQLSlimProduct): number {
  return (
    product.variantsCollection.variants.reduce(
      (acc, { variant }) =>
        acc +
        variant.reviewsCollection.reviews.reduce(
          (acc, { review }) => acc + review.rating,
          0
        ),
      0
    ) / product.variantsCollection.variants.length
  );
}

function countProductReviews(product: GQLSlimProduct): number {
  return product.variantsCollection.variants.reduce(
    (acc, cur) => acc + cur.variant.reviewsCollection.reviews.length,
    0
  );
}
