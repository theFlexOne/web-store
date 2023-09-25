import fs from 'fs';
import { MockProduct } from './mock.types';

const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));

const attributes = {
  length: {
    values: ["6'", '6\'6"', "7'", '7\'6"', "8'"],
    categories: ['rods'],
  },
  action: {
    values: ['fast', 'moderate', 'slow'],
    categories: ['rods'],
  },
  power: {
    values: ['light', 'medium', 'heavy'],
    categories: ['rods'],
  },
  weight: {
    values: ['1/16 oz', '1/8 oz', '1/4 oz', '3/8 oz', '1/2 oz'],
    categories: ['lures'],
  },
  color: {
    values: ['black', 'white', 'red', 'green', 'blue', 'yellow'],
    categories: ['lures'],
  },
  size: {
    values: ['small', 'medium', 'large'],
    categories: ['lures'],
  },
};

const newProducts = products
  .map((product: MockProduct) => {
    const variants: { [key: string]: string }[] = [];
    const attributesForProduct = Object.entries(attributes)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => {
        return value.categories.includes(product.category[0]);
      })
      .map(([key, value]) => ({ name: key, values: value.values }));

    for (let i = 0; i < 10; i++) {
      const productVariant: { [key: string]: string } = {};
      attributesForProduct.forEach((attribute) => {
        const randomIndex = Math.floor(Math.random() * attribute.values.length);
        productVariant[attribute.name] = attribute.values[randomIndex];
      });
      variants.push(productVariant);
    }
    return { ...product, variants };
  }, [])
  .flat();

fs.writeFileSync(
  './productsWithVariants.json',
  JSON.stringify(newProducts, null, 2)
);
