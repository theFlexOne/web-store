// mappers to map db tables to domain models and vice versa

import { ProductSlim, VariantSlim } from "../types/models.types";
import { ProductsGraphQL } from "../types/graphql/graphQL.types";

export const mapGraphQLPoductsSlimToProductsSlim = (
  graphQLProducts: ProductsGraphQL
): Partial<ProductSlim>[] => {
  const products: Partial<ProductSlim>[] = graphQLProducts.edges.map(
    (graphQLProduct) => {
      return {
        id: graphQLProduct.product.id,
        name: graphQLProduct.product.name,
        thumbnail: graphQLProduct.product.thumbnail,
        basePrice: +graphQLProduct.product.base_price,
        brand: graphQLProduct.product.brand.name,
        category: graphQLProduct.product.categories.category.name,
        variants: graphQLProduct.product.variants.edges.map((variant) => {
          return {
            id: variant.variant.id,
            price_offset: variant.variant.price_offset,
            inventory: variant.variant.inventory.edges.map((inventory) => {
              return inventory.node.quantity;
            }),
          } as Partial<VariantSlim>;
        }),
      };
    }
  ) as Partial<ProductSlim>[];
  return products;
};
