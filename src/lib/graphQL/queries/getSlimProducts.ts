const GET_SLIM_PRODUCTS = `
  query getUsers($limit: Int!, $offset: Cursor, $productId: UUID!) {
    productsCollection(
      first: $limit, 
      after: $offset, 
      orderBy: {name: AscNullsLast},
      filter: {id: {eq: $productId}}
    ) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      products: edges {
        product: node {
          id
          name
          thumbnail
          basePrice: base_price
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
          variantsCollection: product_variantsCollection {
            variants: edges {
              variant: node {
                id
                priceOffset: price_offset
                inventoryCollection {
                  inventories: edges {
                    inventory: node {
                      quantity: stock_quantity
                    }
                  }
                }
                reviewsCollection: product_reviewsCollection {
                  reviews: edges {
                    review: node {
                      rating
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

export default GET_SLIM_PRODUCTS;
