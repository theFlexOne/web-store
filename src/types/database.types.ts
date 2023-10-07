
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string
          id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admins_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      cart_items: {
        Row: {
          cart_id: number
          created_at: string
          id: number
          product_variant_id: number
          quantity: number
          updated_at: string
        }
        Insert: {
          cart_id: number
          created_at?: string
          id?: never
          product_variant_id: number
          quantity: number
          updated_at?: string
        }
        Update: {
          cart_id?: number
          created_at?: string
          id?: never
          product_variant_id?: number
          quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variant_ratings_view"
            referencedColumns: ["product_variant_id"]
          },
          {
            foreignKeyName: "cart_items_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variants_slim_view"
            referencedColumns: ["id"]
          }
        ]
      }
      carts: {
        Row: {
          created_at: string
          customer_id: string
          deleted_at: string | null
          id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          deleted_at?: string | null
          id?: never
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          deleted_at?: string | null
          id?: never
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "carts_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: number
          name: string
          parent_id: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          parent_id?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          parent_id?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      customer_addresses: {
        Row: {
          city: string
          created_at: string
          customer_id: string
          id: number
          state: string
          street: string
          street2: string | null
          updated_at: string
          zip: string
        }
        Insert: {
          city: string
          created_at?: string
          customer_id: string
          id?: never
          state: string
          street: string
          street2?: string | null
          updated_at?: string
          zip: string
        }
        Update: {
          city?: string
          created_at?: string
          customer_id?: string
          id?: never
          state?: string
          street?: string
          street2?: string | null
          updated_at?: string
          zip?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_addresses_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
      customers: {
        Row: {
          created_at: string
          deleted_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      discounts: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          qualifiers: string[] | null
          start_date: string | null
          type: Database["public"]["Enums"]["discount_type"]
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          qualifiers?: string[] | null
          start_date?: string | null
          type: Database["public"]["Enums"]["discount_type"]
          updated_at?: string
          value: number
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          qualifiers?: string[] | null
          start_date?: string | null
          type?: Database["public"]["Enums"]["discount_type"]
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      inventory: {
        Row: {
          created_at: string
          id: number
          product_variant_id: number
          stock_quantity: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: never
          product_variant_id: number
          stock_quantity: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: never
          product_variant_id?: number
          stock_quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variant_ratings_view"
            referencedColumns: ["product_variant_id"]
          },
          {
            foreignKeyName: "inventory_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variants_slim_view"
            referencedColumns: ["id"]
          }
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: number
          order_id: string
          product_variant_id: number
          quantity: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: never
          order_id: string
          product_variant_id: number
          quantity: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: never
          order_id?: string
          product_variant_id?: number
          quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variant_ratings_view"
            referencedColumns: ["product_variant_id"]
          },
          {
            foreignKeyName: "order_items_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variants_slim_view"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
      orders_discounts: {
        Row: {
          created_at: string
          discount_id: string
          id: number
          order_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          discount_id: string
          id?: number
          order_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          discount_id?: string
          id?: number
          order_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_discounts_discount_id_fkey"
            columns: ["discount_id"]
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_discounts_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      product_brands: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: never
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: never
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          created_at: string
          customer_id: string
          deleted_at: string | null
          id: number
          message: string
          product_variant_id: number
          rating: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          deleted_at?: string | null
          id?: number
          message?: string
          product_variant_id: number
          rating: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          deleted_at?: string | null
          id?: number
          message?: string
          product_variant_id?: number
          rating?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_reviews_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_reviews_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variant_ratings_view"
            referencedColumns: ["product_variant_id"]
          },
          {
            foreignKeyName: "product_reviews_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variants_slim_view"
            referencedColumns: ["id"]
          }
        ]
      }
      product_specs: {
        Row: {
          created_at: string
          product_id: string
          spec_id: number
          updated_at: string
          value: string | null
        }
        Insert: {
          created_at?: string
          product_id: string
          spec_id: number
          updated_at?: string
          value?: string | null
        }
        Update: {
          created_at?: string
          product_id?: string
          spec_id?: number
          updated_at?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_specs_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_specs_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "product_ratings_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_specs_spec_id_fkey"
            columns: ["spec_id"]
            referencedRelation: "spec_fields"
            referencedColumns: ["id"]
          }
        ]
      }
      product_tags: {
        Row: {
          created_at: string
          id: number
          product_id: string
          tag_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: string
          tag_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: string
          tag_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_tags_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_tags_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "product_ratings_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      product_variants: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          image_urls: string[]
          price_offset: number
          product_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: never
          image_urls: string[]
          price_offset?: number
          product_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: never
          image_urls?: string[]
          price_offset?: number
          product_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "product_ratings_view"
            referencedColumns: ["product_id"]
          }
        ]
      }
      product_variants_discounts: {
        Row: {
          created_at: string
          discount_id: string
          id: number
          product_variant_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          discount_id: string
          id?: number
          product_variant_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          discount_id?: string
          id?: number
          product_variant_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_discounts_discount_id_fkey"
            columns: ["discount_id"]
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_variants_discounts_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_variants_discounts_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variant_ratings_view"
            referencedColumns: ["product_variant_id"]
          },
          {
            foreignKeyName: "product_variants_discounts_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variants_slim_view"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          base_price: number | null
          brand_id: number | null
          categories: string[] | null
          category_id: number
          created_at: string
          deleted_at: string | null
          description: string
          id: string
          name: string
          specs: Json | null
          thumbnail: string | null
          updated_at: string
        }
        Insert: {
          base_price?: number | null
          brand_id?: number | null
          categories?: string[] | null
          category_id: number
          created_at?: string
          deleted_at?: string | null
          description?: string
          id?: string
          name: string
          specs?: Json | null
          thumbnail?: string | null
          updated_at?: string
        }
        Update: {
          base_price?: number | null
          brand_id?: number | null
          categories?: string[] | null
          category_id?: number
          created_at?: string
          deleted_at?: string | null
          description?: string
          id?: string
          name?: string
          specs?: Json | null
          thumbnail?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            referencedRelation: "product_brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      spec_fields: {
        Row: {
          category_id: number | null
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          category_id?: number | null
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "spec_fields_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      variation_specs: {
        Row: {
          created_at: string
          spec_id: number
          updated_at: string
          value: string
          variation_id: number
        }
        Insert: {
          created_at?: string
          spec_id: number
          updated_at?: string
          value: string
          variation_id: number
        }
        Update: {
          created_at?: string
          spec_id?: number
          updated_at?: string
          value?: string
          variation_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "variation_specs_spec_id_fkey"
            columns: ["spec_id"]
            referencedRelation: "spec_fields"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variation_specs_variation_id_fkey"
            columns: ["variation_id"]
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variation_specs_variation_id_fkey"
            columns: ["variation_id"]
            referencedRelation: "product_variant_ratings_view"
            referencedColumns: ["product_variant_id"]
          },
          {
            foreignKeyName: "variation_specs_variation_id_fkey"
            columns: ["variation_id"]
            referencedRelation: "product_variants_slim_view"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      product_ratings_view: {
        Row: {
          product_id: string | null
          rating: number | null
          reviews_count: number | null
        }
        Relationships: []
      }
      product_variant_ratings_view: {
        Row: {
          product_variant_id: number | null
          rating: number | null
          reviews_count: number | null
        }
        Relationships: []
      }
      product_variants_slim_view: {
        Row: {
          discount_type: Database["public"]["Enums"]["discount_type"] | null
          discount_value: number | null
          id: number | null
          price: number | null
          rating: number | null
          reviews_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      fn_create_categories: {
        Args: {
          p_category_names: string[]
        }
        Returns: number
      }
      fn_create_category: {
        Args: {
          p_name: string
          p_parent_id: number
        }
        Returns: number
      }
      fn_create_product:
        | {
            Args: {
              p_name: string
              p_description: string
              p_thumbnail: string
              p_price: number
              p_brand: string
              p_categories: string[]
              p_tags: string[]
            }
            Returns: string
          }
        | {
            Args: {
              p_name: string
              p_description: string
              p_thumbnail: string
              p_price: number
              p_brand: string
              p_categories: string[]
              p_tags: string[]
              p_attributes: string[]
            }
            Returns: string
          }
      fn_create_product_categories: {
        Args: {
          p_product_id: string
          p_category_id: number
        }
        Returns: number
      }
      fn_create_product_specs: {
        Args: {
          p_product_id: string
          specs: Json
        }
        Returns: undefined
      }
      fn_create_product_tags: {
        Args: {
          p_product_id: string
          p_tags: string[]
        }
        Returns: undefined
      }
      fn_create_product_variant: {
        Args: {
          p_product_id: string
          p_price_offset: number
          p_stock_quantity: number
          p_image_urls: string[]
          p_attributes: Json
        }
        Returns: undefined
      }
      fn_create_single_category:
        | {
            Args: {
              p_cat_name: string
              p_parent_id: number
            }
            Returns: number
          }
        | {
            Args: {
              p_cat_name: string
            }
            Returns: number
          }
      fn_find_or_create_brand: {
        Args: {
          p_name: string
        }
        Returns: number
      }
      fn_find_or_create_tag: {
        Args: {
          p_tag_name: string
        }
        Returns: number
      }
      fn_get_all_product_attributes: {
        Args: {
          p_product_id: string
        }
        Returns: Json
      }
      fn_get_category_chain: {
        Args: {
          p_product_id: string
        }
        Returns: unknown
      }
      fn_get_product_categories: {
        Args: {
          p_product_id: string
        }
        Returns: unknown
      }
      fn_get_product_product_variants_ids: {
        Args: {
          p_product_id: string
        }
        Returns: unknown
      }
      fn_get_product_specs: {
        Args: {
          p_product_id: string
        }
        Returns: Json
      }
      fn_get_product_variant_attributes: {
        Args: {
          p_variant_id: number
        }
        Returns: Json
      }
      fn_get_product_variant_rating: {
        Args: {
          p_variant_id: number
        }
        Returns: number
      }
      fn_get_to_many_foreign_tables_array: {
        Args: {
          p_table_name: string
        }
        Returns: unknown
      }
      fn_get_to_one_foreign_tables_array: {
        Args: {
          p_table_name: string
        }
        Returns: unknown
      }
      fn_is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      fn_is_product_discounted: {
        Args: {
          p_product_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      discount_type: "PERCENTAGE" | "FIXED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
