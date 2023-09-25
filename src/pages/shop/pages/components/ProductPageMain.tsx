import { useEffect, useMemo, useState } from 'react';
import ProductRating from './ProductRating';
import ProductImages from './ProductImages';
import ProductOptions from './ProductOptions';
import ProductQuantity from './ProductQuantity';
import useCart from '../../../../context/cartContext/useCart';
import { Product } from '../../../../types/product';

const CURRENCY_TYPE = 'USD';

function ProductPageMain({ product }: { product: Product }) {
  const initialOptions = (() => {
    const options: { [key: string]: string | null } = {};
    product.attributes.forEach((attribute: Product['attributes'][0]) => {
      options[attribute.name] = null;
    });
    return options;
  })();

  const [selectedOptions, setSelectedOptions] = useState(initialOptions);

  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart } = useCart();

  const currentVariant = useMemo(() => {
    for (const variant of product.variants) {
      let match = true;
      for (const key in selectedOptions) {
        if (
          variant.attributes[key] !== selectedOptions[key] &&
          variant.attributes[key] != null
        ) {
          match = false;
          break;
        }
      }
      if (match) return variant;
    }
    return product.variants[0];
  }, [selectedOptions, product]);

  const priceDisplay = currentVariant?.price.toLocaleString('en-US', {
    style: 'currency',
    currency: CURRENCY_TYPE,
  });

  const handleOptionChange = (key: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleQuantityChange = (value: number) => {
    if (quantity + value < 1 || quantity + value > currentVariant!.quantity)
      return;
    setQuantity((prev) => prev + value);
  };

  const isDisabled = (key: string, value: string) => {
    for (const variant of product.variants) {
      if (variant.attributes[key] === value) return false;
    }
    return true;
  };

  console.log(product.variants);

  return (
    product && (
      <section className="flex max-w-5xl gap-4 mx-auto">
        <div className="ml-auto basis-1/2 flex flex-col gap-2 w-fit">
          <ProductImages images={[product.thumbnail]} />
        </div>
        <div className="mr-auto">
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex flex-col">
              <div className="text-xl font-bold">{product.name}</div>
              <div className="text-sm">
                by <a href="#">{product.brand}</a>
              </div>
            </div>
            <ProductRating rating={product.rating} />
            <div className="text-2xl font-bold">{`${priceDisplay} ${CURRENCY_TYPE}`}</div>
            <ProductOptions
              options={product.attributes}
              selectedOptions={selectedOptions}
              onOptionChange={handleOptionChange}
              isDisabled={isDisabled}
            />
            <ProductQuantity
              quantity={quantity || 0}
              handleQuantityChange={handleQuantityChange}
            />
            <button
              type="button"
              onClick={() => addToCart(currentVariant, quantity)}
              className="bg-gray-700 text-white rounded-md px-4 py-2 hover:bg-gray-800 active:scale-[.98] transition"
            >
              Add To Cart
            </button>
          </form>
        </div>
      </section>
    )
  );
}

export default ProductPageMain;
