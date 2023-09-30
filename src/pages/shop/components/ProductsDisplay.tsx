import ProductsDisplayTable from './ProductsDisplayTable';
import ProductsDisplayGrid from './ProductsDisplayGrid';
import { ProductSlim } from '../../../types/models.types';

export interface ProductsDisplayProps {
  products?: ProductSlim[];
  setProducts?: (products: ProductSlim[]) => void;
  display?: keyof typeof displayOptions;
}

const displayOptions = {
  grid: ProductsDisplayGrid,
  list: ProductsDisplayTable,
} as const;

const ProductsDisplay = ({
  products = [],
  display = 'grid',
}: ProductsDisplayProps) => {
  const Display = displayOptions[display];

  return <Display products={products} />;
};

export default ProductsDisplay;
