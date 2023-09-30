export interface FishUSAProduct {
  brand: string;
  categories_hierarchy: string[];
  custom_badge_new?: CustomBadgeNew;
  custom_category_options_text?: string;
  id: string;
  imageUrl: string;
  intellisuggestData: string;
  intellisuggestSignature: string;
  msrp: string;
  name: string;
  option_set_id?: string;
  popularity: string;
  price: string;
  product_type_unigram: string;
  ratingCount: string;
  sku: string;
  ss_custom_badges: string;
  ss_days_since_c_sort_newest: string;
  ss_has_options: string;
  ss_image_hover?: string;
  ss_in_stock: string;
  ss_retail: string;
  ss_swatches?: string;
  thumbnailImageUrl: string;
  uid: string;
  url: string;
  rating?: string;
  ss_price_range?: string;
  ss_on_sale?: string;
  ss_pct_off?: string;
  ss_variant_mfield_ct_metafields_discount_price?: string;
  ss_price_range2?: string;
}

export type CustomBadgeNew = "Y" | "N";
