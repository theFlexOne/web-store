import { createContext, useEffect, useState } from 'react';
import { fetchProducts } from '../../lib/supabase/supabaseHelpers';
import { ProductSlim } from '../../types/types';

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
      const productsRaw = await fetchProducts();
      const products: ProductSlim[] = productsRaw.map((product) => {
        return {
          id: product.id as string,
          name: product.name,
          base_price: product.base_price as number,
          description: product.description as string,
          thumbnail: product.thumbnail as string,
          brand: ('' + product.brand_id) as string,
          categories: ['' + product.category_id] as string[],
          rating: 0,
          numReviews: 0,
          countInStock: 0,
        } as ProductSlim;
      });

      setProducts(products);
    })();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
}
