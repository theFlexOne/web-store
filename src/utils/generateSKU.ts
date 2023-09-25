import * as crypto from 'crypto';
import { categories } from '../../../shopwise/client/src/components/shopSidebar/constants';

interface GenerateSKU {
  (name: string, brand?: string, attributes?: Record<string, string>): string;
}

const generateSKU (name: string, category: string, brand = 'N/A', attributes?: Record<string, string>): string => {
  const skuList: string[] = [];
  const attributesList: string[] = [];

  // Add Name to SKU
  skuList.push(
    name
      .split(' ')
      .map((word) => word.slice(0, 3).padEnd(3, '*').toUpperCase())
      .join('')
  );

  // Add Brand to SKU
  skuList.push(
    brand
      ?.split(' ')
      .map((word) => word.slice(0, 5).toUpperCase())
      .join('')
      .slice(0, 12) || 'N/A'
  );

  // Add Attributes to SKU
  if (attributes) {
    const attributeKeys = Object.entries(attributes).sort(([a], [b]) =>
      a.localeCompare(b)
    );

    attributeKeys.forEach(([key, value]) => {
      attributesList.push(`${key}:${value}`);
    });

    skuList.push(attributesList.join('&'));
  }
  console.log(skuList.join('-'));

  return;
};

export default generateSKU;

generateSKU('Product Name', 'Brand Name', {
  color: 'red',
  size: 'M',
  material: 'cotton',
  style: 'casual',
});
