import Product from "../../../../types/ProductsTable";
import ProductGridCard from "./ProductGridCard";

const ProductsDisplayGrid: React.FC<{ products?: Product[] }> = ({
  products = [],
}) => {
  return (
    <div className="inset-0 grid grid-cols-[repeat(auto-fit,_minmax(12rem,_1fr))]">
      {products.map((product) => (
        <ProductGridCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsDisplayGrid;
