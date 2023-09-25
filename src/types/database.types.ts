
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
      attributes: {
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
          }
        ]
      }
      carts: {
        Row: {
          created_at: string
          customer_id: string
          id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: never
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
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
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
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
      product_attributes: {
        Row: {
          attribute_id: number
          created_at: string
          id: number
          product_id: string
          updated_at: string
        }
        Insert: {
          attribute_id: number
          created_at?: string
          id?: never
          product_id: string
          updated_at?: string
        }
        Update: {
          attribute_id?: number
          created_at?: string
          id?: never
          product_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_attributes_attribute_id_fkey"
            columns: ["attribute_id"]
            referencedRelation: "attributes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_attributes_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
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
      product_categories: {
        Row: {
          category_id: number
          created_at: string
          id: number
          parent_id: number | null
          updated_at: string
        }
        Insert: {
          category_id: number
          created_at?: string
          id?: never
          parent_id?: number | null
          updated_at?: string
        }
        Update: {
          category_id?: number
          created_at?: string
          id?: never
          parent_id?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_categories_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      product_reviews: {
        Row: {
          created_at: string
          customer_id: string
          id: number
          message: string
          product_variant_id: number
          rating: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: number
          message?: string
          product_variant_id: number
          rating: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
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
            foreignKeyName: "product_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      product_variant_attributes: {
        Row: {
          id: number
          product_attribute_id: number | null
          product_variant_id: number | null
          value: string
        }
        Insert: {
          id?: never
          product_attribute_id?: number | null
          product_variant_id?: number | null
          value: string
        }
        Update: {
          id?: never
          product_attribute_id?: number | null
          product_variant_id?: number | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "variant_attributes_product_attributes_fkey"
            columns: ["product_attribute_id"]
            referencedRelation: "product_attributes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variant_attributes_product_variants_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          }
        ]
      }
      product_variants: {
        Row: {
          created_at: string
          id: number
          image_urls: string[]
          price_offset: number
          product_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: never
          image_urls: string[]
          price_offset?: number
          product_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
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
          }
        ]
      }
      products: {
        Row: {
          base_price: number | null
          brand_id: number | null
          category_id: number | null
          created_at: string
          description: string
          id: string
          name: string
          thumbnail: string | null
          updated_at: string
        }
        Insert: {
          base_price?: number | null
          brand_id?: number | null
          category_id?: number | null
          created_at?: string
          description?: string
          id?: string
          name: string
          thumbnail?: string | null
          updated_at?: string
        }
        Update: {
          base_price?: number | null
          brand_id?: number | null
          category_id?: number | null
          created_at?: string
          description?: string
          id?: string
          name?: string
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
            referencedRelation: "product_categories"
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fn_create_categories: {
        Args: {
          p_category_names: string[]
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
      fn_get_category_chain: {
        Args: {
          p_product_id: string
        }
        Returns: unknown
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
    }
    Enums: {
      [_ in never]: never
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
