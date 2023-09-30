import { gql } from 'graphql-request';
import { GET_SLIM_PRODUCTS } from './queries/getSlimProducts';

export function getProductsSlimQuery(limit: number, offset?: string) {
  return gql`
    ${GET_SLIM_PRODUCTS}
    variables: {
      limit: ${limit},
      offset: ${offset ? `"${offset}"` : null}
    }
  `;
}
