import { Link } from 'react-router-dom';
import { ProductSlim } from '../../../types/models.types';

const ProductGridCard: React.FC<{ product: ProductSlim }> = ({ product }) => {
  const imageUrl =
    product.thumbnail || '/assets/images/no_image_available.jpeg';
  const name = product.name;
  const price = `$${product.basePrice}`;

  return (
    <div
      key={product.id}
      className="flex flex-col gap-2 pb-2 border rounded-sm text-sm"
    >
      <div className="flex justify-center items-center bg-zinc-100 shadow-md hover:shadow-amber-500/50 hover:shadow-lg transition-all duration-75">
        <Link to={`products/${product.id}`} className="w-full">
          <img
            className="w-full aspect-square object-contain"
            src={imageUrl}
            alt=""
          />
        </Link>
      </div>
      <div className="flex flex-col p-4 gap-4">
        <Link
          to={`products/${product.id}`}
          className="mt-2 mx-2 hover:text-amber-500"
        >
          {name}
        </Link>
        <Link to={`products/${product.id}`} className="mt-auto mr-2 text-right">
          {price}
        </Link>
      </div>
    </div>
  );
};

export default ProductGridCard;
