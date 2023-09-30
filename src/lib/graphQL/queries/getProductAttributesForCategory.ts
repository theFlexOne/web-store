import { gql } from "graphql-request";

const GET_PRODUCT_ATTRIBUTES_FOR_CATEGORY = gql`
  query getCategoryProductAttributes($catName: StringFilter!) {
    categoriesCollection(filter: { name: $catName }) {
      categories: edges {
        category: node {
          name
          productCategoriesCollection: product_categoriesCollection {
            productsCategories: edges {
              productsCategory: node {
                productsCollection {
                  products: edges {
                    product: node {
                      productVariantsCollection: product_variantsCollection {
                        productVariants: edges {
                          productVariant: node {
                            productVariantAttributesCollection: product_variant_attributesCollection {
                              productVariantAttributes: edges {
                                productVariantAttribute: node {
                                  value
                                  productAttributes: product_attributes {
                                    attributes {
                                      name
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
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_PRODUCT_ATTRIBUTES_FOR_CATEGORY;
