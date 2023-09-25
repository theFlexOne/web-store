import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { useProducts } from '../../../context/productsContext/useProducts';
import { useEffect, useState } from 'react';
import ProductPageMain from './components/ProductPageMain';
import ProductInfo from '../../../types/product';

/**
 * Renders the product page with the given product ID.
 *
 * @returns The product page component.
 */
export default function ProductPage() {
  const [product, setProduct] = useState<ProductInfo | null>(null);

  const { productId }: { productId: string } = useLoaderData() as {
    productId: string;
  };
  const { getProductInfo } = useProducts();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const productInfo: ProductInfo = await getProductInfo(
          productId,
          controller.signal
        );
        setProduct(productInfo);
      } catch (error) {
        if ((error as { code: number }).code === 20) return;
        console.error(error);
      }
    })();
    return () => controller.abort();
  }, [productId, getProductInfo]);

  return (
    product && (
      <div className="h-full py-12">
        <ProductPageMain product={product} />

        {/*
      // TODO: Add description
      // TODO: Add specs
      // TODO: Add related products
      // TODO: Add reviews
      */}
      </div>
    )
  );
}

/**
 * Loads the product ID from the URL parameters.
 *
 * @param params - The URL parameters.
 * @returns An object containing the product ID.
 */
export function loader({ params }: LoaderFunctionArgs) {
  return { productId: params.id };
}
