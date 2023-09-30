import ProductsDisplay from './components/ProductsDisplay';
import FilterSidebar from './components/FilterSidebar';
import useProducts from '../../context/products/useProducts';

const Shop = () => {
  const { products } = useProducts();

  return (
    <div className="grow flex flex-col gap-4 my-12">
      <h1 className="text-3xl text-gray-900 text-center">Shop</h1>
      <div className="grid grid-cols-[25%_75%] gap-4 w-full max-w-6xl mx-auto">
        <FilterSidebar />
        <ProductsDisplay products={products} setProducts={() => {}} />
      </div>
    </div>
  );
};

export default Shop;
