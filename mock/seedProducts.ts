import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE as string;

type Product = {
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  brand: string;
  categories: string[];
  tags: string[];
  attributes: string[];
  variants: {
    [key: string]: string;
  }[];
};

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const productsToSeed: Product[] = JSON.parse(
  fs.readFileSync('./mock/productsWithVariants.json', 'utf-8')
);

const seedProducts = async (products: Product[]) => {
  products.forEach(async (product) => {
    const attributes = getProductAttributes(product);
    const { data, error } = await supabase
      .rpc('fn_create_product', {
        p_name: product.name,
        p_description: product.description,
        p_thumbnail: product.thumbnail,
        p_price: product.price,
        p_brand: product.brand,
        p_categories: product.categories,
        p_tags: product.tags,
        p_attributes: attributes,
      })
      .single();
    if (error) {
      console.error(error);
      return;
    }

    product.variants.forEach(async (variant: { [key: string]: string }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data: _data, error: variantError } = await supabase.rpc(
        'fn_create_product_variant',
        {
          p_product_id: data,
          p_stock_quantity: Math.floor(Math.random() * 100),
          p_price_offset: 0.0,
          p_image_urls: [],
          p_attributes: variant,
        }
      );
      if (variantError) {
        console.error(variantError);
        return;
      }
    });
  });
};

seedProducts(productsToSeed);

function getProductAttributes(product: Product): string[] {
  const attributes = new Set<string>();
  product.variants.forEach((variant) => {
    Object.keys(variant).forEach((key) => {
      attributes.add(key);
    });
  });
  return [...attributes];
}
