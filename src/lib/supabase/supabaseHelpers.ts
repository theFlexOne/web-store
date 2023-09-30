import supabase from "./supabaseRestClient";
import { gql } from "graphql-request";
import {
  ProductGraphQL,
  ProductVariantGraphQL,
} from "../../types/graphql/graphQL.types";
import { ProductSlim, VariantSlim } from "../../types/types";
import { Json } from "../../types/database.types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { PostgrestResponseFailure } from "@supabase/postgrest-js";
import { ProductsGraphQL } from "../../types/graphql/graphQL.types";

const query = gql`
  query {
    productsCollection {
      edges {
        product: node {
          id
          name
          thumbnail
          base_price
          brand: product_brands {
            id
            name
          }
          categories: product_categories {
            category: categories {
              id
              name
            }
          }
          variants: product_variantsCollection {
            edges {
              variant: node {
                id
                price_offset
                inventory: inventoryCollection {
                  edges {
                    node {
                      quantity: stock_quantity
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .schema("graphql_public")
    .rpc("graphql", {
      query,
    });

  if (error || !data) {
    throw error;
  }
  console.log(data);

  return data.data.productsCollection.edges.map(
    ({ product }: { product: ProductGraphQL }) =>
      mapGraphQlProductSlimToProductSlim(product)
  );
};

function mapGraphQlProductSlimToProductSlim(
  product: ProductGraphQL
): ProductSlim {
  return {
    id: product.id,
    name: product.name,
    thumbnail: product.thumbnail,
    basePrice: +product.base_price,
    brand: product.brand.name,
    category: product.categories.category.name,
    variants: product.variants.edges.map(
      ({ variant }: { variant: ProductVariantGraphQL }) => {
        return {
          id: variant.id,
          priceOffset: +variant.price_offset,
          quantity: variant.inventory.edges[0].node.quantity,
        } as VariantSlim;
      }
    ),
  } as ProductSlim;
}
