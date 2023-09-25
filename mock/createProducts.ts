import fs from 'fs';
import { MockProduct, MockProductJson } from './mock.types';
const productsJson: MockProductJson[] = JSON.parse(
  fs.readFileSync('./bassProProducts.json', 'utf-8')
);
const DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sem at nibh elementum imper';

const categoryAttributes = {
  lures: ['weight', 'color', 'size'],
  rods: ['length', 'action', 'power'],
};

const products: MockProduct[] = productsJson.map(
  (product: MockProductJson): MockProduct => {
    const attributes =
      categoryAttributes[product.category as keyof typeof categoryAttributes];

    return {
      name: product.name,
      description: DESCRIPTION,
      price: product.price,
      quantity: randomQuantity(),
      thumbnail: product.thumbnail,
      brand: product.brand,
      category: [product.category],
      tags: [],
      attributes,
    };
  }
);

fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));

function randomQuantity() {
  return Math.min(
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100)
  );
}
