import { describe, expect, it } from 'vitest';
import generateSKU from '../generateSKU';

describe('generateSKU', () => {
  it('should generate a SKU with only name', () => {
    const sku = generateSKU('Product Name');
    expect(sku).toHaveLength(64);
    expect(sku).toMatch(/^[a-f0-9]+$/);
  });

  it('should generate a SKU with name and brand', () => {
    const sku = generateSKU('Product Name', 'Brand Name');
    expect(sku).toHaveLength(64);
    expect(sku).toMatch(/^[a-f0-9]+$/);
  });

  it('should generate a SKU with name, brand and attributes', () => {
    const sku = generateSKU('Product Name', 'Brand Name', {
      color: 'red',
      size: 'M',
    });
    expect(sku).toHaveLength(64);
    expect(sku).toMatch(/^[a-f0-9]+$/);
  });

  it('should generate a SKU with name, brand and long attributes', () => {
    const sku = generateSKU('Product Name', 'Brand Name', {
      color: 'red',
      size: 'M',
      material: 'cotton',
      style: 'casual',
      gender: 'male',
    });
    expect(sku).toHaveLength(64);
    expect(sku).toMatch(/^[a-f0-9]+$/);
  });
});
