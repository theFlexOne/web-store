// mappers to map db tables to domain models and vice versa

import * as Models from "../types/models.types";
import { Tables, Functions, Views } from "../types/api.types";

export const mapCustomers = (
  customers: Tables<"customers">[],
  addresses: Tables<"customer_addresses">[]
): Models.Customer[] => {
  return customers.map((customer) => {
    const address = addresses.find(
      (address) => address.customer_id === customer.id
    );
    return {
      id: customer.id,
      userId: customer.user_id,
      firstName: customer.first_name,
      lastName: customer.last_name,
      address: {
        street: address?.street1 || "",
        street2: address?.street2 || "",
        city: address?.city || "",
        state: address?.state || "",
        zip: address?.zip || "",
      },
    };
  }) as Models.Customer[];
};
