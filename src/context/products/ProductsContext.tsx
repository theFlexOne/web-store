import { createContext, useEffect, useState } from "react";
import { ProductSlim } from "../../types/models.types";
import {
  getProductsSlim,
  getFiltersForProductCategory,
} from "./productsService";

type ProductsContextType = {
  products: ProductSlim[];
};

export const ProductsContext = createContext<ProductsContextType | null>(null);

export default function ProductsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<ProductSlim[]>([]);

  useEffect(() => {
    (async () => {
      const {
        data: productsSlim,
        error,
      }: { data: ProductSlim[] | null; error: Error | null } = {
        data: [],
        error: null,
      };

      if (error) {
        console.error(error);
        return;
      }

      if (!productsSlim) {
        console.error("No products found");
        return;
      }

      setProducts(productsSlim);
    })();

    // getFiltersForProductCategory("lures").then(({ data }) => console.log(data));
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
}
