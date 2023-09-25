import ProductsDisplay from './components/ProductsDisplay';
import FilterSidebar from './components/FilterSidebar';
import { useEffect, useState } from 'react';
import generateProductImages from '../../utils/generateProductImages';
import useProducts from '../../context/products/useProducts';

export interface ProductSlim {
  id: number;
  name: string;
  price: number;
  thumbnail?: string;
  category: string;
  rating: number;
}

// const productList: ProductSlim[] = [
//   {
//     id: 1,
//     name: 'Product 1',
//     price: 100,
//     category: 'Category 1',
//     rating: 4,
//   },
//   {
//     id: 2,
//     name: 'Product 2',
//     price: 200,
//     category: 'Category 2',
//     rating: 3,
//   },
//   {
//     id: 3,
//     name: 'Product 3',
//     price: 300,
//     category: 'Category 3',
//     rating: 5,
//   },
//   {
//     id: 4,
//     name: 'Product 4',
//     price: 400,
//     category: 'Category 4',
//     rating: 2,
//   },
//   {
//     id: 5,
//     name: 'Product 5',
//     price: 500,
//     category: 'Category 5',
//     rating: 4,
//   },
//   {
//     id: 6,
//     name: 'Product 6',
//     price: 600,
//     category: 'Category 6',
//     rating: 3,
//   },
//   {
//     id: 7,
//     name: 'Product 7',
//     price: 700,
//     category: 'Category 7',
//     rating: 5,
//   },
//   {
//     id: 8,
//     name: 'Product 8',
//     price: 800,
//     category: 'Category 8',
//     rating: 2,
//   },
//   {
//     id: 9,
//     name: 'Product 9',
//     price: 900,
//     category: 'Category 9',
//     rating: 4,
//   },
//   {
//     id: 10,
//     name: 'Product 10',
//     price: 1000,
//     category: 'Category 10',
//     rating: 3,
//   },
// ];

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
