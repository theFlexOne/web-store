
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."check_product_stock"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF NEW.quantity > (SELECT quantity FROM inventory WHERE product_id = NEW.product_id) THEN
    RAISE EXCEPTION 'Not enough product in stock';
  END IF;
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."check_product_stock"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."fn_add_to_cart"("p_cart_id" "uuid", "p_product_variant_id" bigint, "p_quantity" integer) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  INSERT INTO cart_items (cart_id, product_variant_id, quantity)
  VALUES (p_cart_id, p_product_variant_id, p_quantity);

  UPDATE inventory
  SET quantity_in_cart = quantity_in_cart + p_quantity
  WHERE product_variant_id = p_product_variant_id;

  UPDATE carts
  SET updated_at = now()
  WHERE id = p_cart_id;

  UPDATE product_variants
  SET updated_at = now()
  WHERE id = p_product_variant_id;

  COMMIT;
END;
$$;

ALTER FUNCTION "public"."fn_add_to_cart"("p_cart_id" "uuid", "p_product_variant_id" bigint, "p_quantity" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."fn_calculate_product_rating"("p_product_id" "uuid") RETURNS numeric
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN COALESCE((SELECT AVG(rating) FROM product_reviews WHERE product_id = p_product_id), 0);
END;
$$;

ALTER FUNCTION "public"."fn_calculate_product_rating"("p_product_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."fn_create_product"("p_name" character varying, "p_price" numeric, "p_description" "text", "p_category" character varying, "p_brand" character varying, "p_thumbnail" "text", "p_images" "text"[], "p_quantity" integer) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$DECLARE
  category_id INT8;
  brand_id INT8;
  new_product_id INT8;
BEGIN
  -- Gettin' the category ID or insertin' a new one, ain't we?
  INSERT INTO categories (name)
  VALUES (p_category)
  ON CONFLICT (name) DO NOTHING
  RETURNING id INTO category_id;

  SELECT id INTO category_id FROM categories WHERE name = p_category;

  -- Now, let's nab that brand ID or insert a new one, shall we?
  INSERT INTO product_brands (name)
  VALUES (p_brand)
  ON CONFLICT (name) DO NOTHING
  RETURNING id INTO brand_id;

  SELECT id INTO brand_id FROM product_brands WHERE name = p_brand;

  -- Time to insert the new product, innit?
  INSERT INTO products (
    name,
    price,
    description,
    category_id,
    brand_id,
    thumbnail,
    images,
    cost_of_goods_and_services
  )
  VALUES (
    p_name,
    p_price,
    p_description,
    category_id,
    brand_id,
    p_thumbnail,
    p_images,
    p_cogs
  )
  RETURNING id INTO new_product_id;

  -- Finally, let's update the inventory, shall we?
  INSERT INTO inventory (
    product_id,
    quantity
  )
  VALUES (
    new_product_id,
    p_quantity
  );
END;$$;

ALTER FUNCTION "public"."fn_create_product"("p_name" character varying, "p_price" numeric, "p_description" "text", "p_category" character varying, "p_brand" character varying, "p_thumbnail" "text", "p_images" "text"[], "p_quantity" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."fn_create_products_from_json"("product_list" "jsonb") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  product_record jsonb;
  variant_record jsonb;
  category_id int8;
  brand_id int8;
  new_product_id UUID;
  new_variant_id int8;
BEGIN
  FOR product_record IN SELECT * FROM jsonb_array_elements(product_list)
  LOOP
    -- Category
    INSERT INTO categories (name)
    VALUES (product_record->>'category')
    ON CONFLICT (name) DO NOTHING
    RETURNING id INTO category_id;

    -- If category_id is still null, fetch it
IF category_id IS NULL THEN
  SELECT id INTO category_id FROM categories WHERE name = product_record->>'category';
END IF;

    -- Brand
    INSERT INTO product_brands (name)
    VALUES (product_record->>'brand')
    ON CONFLICT (name) DO NOTHING
    RETURNING id INTO brand_id;

    -- If brand_id is still null, fetch it
IF brand_id IS NULL THEN
  SELECT id INTO brand_id FROM product_brands WHERE name = product_record->>'brand';
END IF;

    -- Product
    INSERT INTO products (
      name,
      thumbnail,
      description,
      brand_id,
      category_id
    )
    VALUES (
      product_record->>'name',
      product_record->>'thumbnail',
      coalesce(product_record->>'description', ''),
      brand_id,
      category_id
    )
    RETURNING id INTO new_product_id;

    -- Check if 'variants' is not null and not an empty array
    IF product_record->'variants' IS NOT NULL THEN

      FOR variant_record IN SELECT * FROM jsonb_array_elements(product_record->'variants')
      LOOP
        -- Variant
        INSERT INTO product_variants (
          product_id,
          price,
          attributes
        )
        VALUES (
          new_product_id,
          CAST(variant_record->>'price' as numeric),
          CAST(variant_record->>'attributes' as jsonb)
        )
        RETURNING id INTO new_variant_id;

        -- Inventory
        INSERT INTO inventory (
          product_variant_id,
          quantity
        )
        VALUES (
          new_variant_id,
          COALESCE(CAST(variant_record->>'quantity' as numeric), 0)
        );
      END LOOP;
    END IF;
  END LOOP;
END;
$$;

ALTER FUNCTION "public"."fn_create_products_from_json"("product_list" "jsonb") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."fn_create_user_resources"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$begin
insert into
  public.profiles (id, user_id, created_at, updated_at)
select
  gen_random_uuid (),
  new.id,
  now(),
  now()
where
  not exists (
    select
      1
    from
      public.profiles
    where
      user_id = new.id
  );

insert into
  public.profile_addresses (id, profile_id, created_at, updated_at)
select
  gen_random_uuid (),
  (
    select
      id
    from
      public.profiles
    where
      user_id = new.id
  ),
  now(),
  now()
where
  exists (
    select
      1
    from
      public.profiles
    where
      user_id = new.id
  );

insert into
  public.carts (id, profile_id, created_at, updated_at)
select
  gen_random_uuid (),
  (
    select
      id
    from
      public.profiles
    where
      user_id = new.id
  ),
  now(),
  now()
where
  not exists (
    select
      1
    from
      public.carts
    where
      profile_id = (
        select
          id
        from
          public.profiles
        where
          user_id = new.id
      )
  );

return new;

end;$$;

ALTER FUNCTION "public"."fn_create_user_resources"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."fn_fetch_product_details"("p_id" "uuid") RETURNS TABLE("id" "uuid", "name" "text", "price" numeric, "description" "text", "thumbnail" "text", "category_name" "text", "brand_name" "text", "rating" smallint, "quantity" integer)
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_variant_id uuid;
BEGIN
    -- Fetch main product details
    RETURN QUERY
    SELECT 
        p.id,
        p.name,
        p.description,
        p.thumbnail,
        c.name,
        pb.name,
        fn_calculate_product_rating(p.id) AS rating,
        NULL::integer -- Placeholder for quantity, to be filled later
    FROM 
        products p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN product_brands pb ON pb.id = p.brand_id
    WHERE 
        p.id = p_id;

    -- Fetch variant details
    SELECT id INTO v_variant_id
    FROM product_variants
    WHERE product_id = p_id
    LIMIT 1;

    -- Fetch inventory quantity
    IF v_variant_id IS NOT NULL THEN
        UPDATE fetch_product_details
        SET quantity = (
            SELECT quantity
            FROM inventory
            WHERE product_variant_id = v_variant_id
        )
        WHERE id = p_id;
    END IF;
    
    RETURN;
END;
$$;

ALTER FUNCTION "public"."fn_fetch_product_details"("p_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."fn_get_product_attributes"("p_product_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_key text;
  v_json jsonb := '[]'::jsonb;
  v_values text[];
  v_temp jsonb;
BEGIN
  -- Loop through all the unique keys
  FOR v_key IN (
    SELECT DISTINCT jsonb_object_keys(attributes)
    FROM product_variants
    WHERE product_id = p_product_id
  )
  LOOP
    -- Get the unique values for each key and store 'em in an array
    SELECT array_agg(DISTINCT attributes->>v_key)
    INTO v_values
    FROM product_variants
    WHERE product_id = p_product_id;
    
    -- Create a temporary JSON object
    v_temp := jsonb_build_object('name', v_key, 'values', v_values);
    
    -- Append the temporary JSON object to the main JSON array
    v_json := v_json || v_temp;
  END LOOP;
  
  RETURN v_json;
END;
$$;

ALTER FUNCTION "public"."fn_get_product_attributes"("p_product_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_attribute_keys"("product_id" "uuid") RETURNS TABLE("attribute_key" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
  SELECT jsonb_object_keys(attributes)
  FROM product_variants
  WHERE product_id = product_id;
END;
$$;

ALTER FUNCTION "public"."get_attribute_keys"("product_id" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."cart_items" (
    "id" bigint NOT NULL,
    "cart_id" "uuid" NOT NULL,
    "quantity" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "product_variant_id" bigint NOT NULL
);

ALTER TABLE "public"."cart_items" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."cart_items_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."cart_items_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."cart_items_id_seq" OWNED BY "public"."cart_items"."id";

CREATE TABLE IF NOT EXISTS "public"."carts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."carts" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."categories" (
    "id" bigint NOT NULL,
    "name" character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."categories" OWNER TO "postgres";

ALTER TABLE "public"."categories" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."categories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."inventory" (
    "id" bigint NOT NULL,
    "quantity" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "product_variant_id" bigint NOT NULL,
    "quantity_in_cart" integer DEFAULT 0 NOT NULL
);

ALTER TABLE "public"."inventory" OWNER TO "postgres";

ALTER TABLE "public"."inventory" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."inventory_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."product_brands" (
    "id" bigint NOT NULL,
    "name" character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."product_brands" OWNER TO "postgres";

ALTER TABLE "public"."product_brands" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."product_brands_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."product_variants" (
    "id" bigint NOT NULL,
    "product_id" "uuid" NOT NULL,
    "attributes" "jsonb",
    "price" numeric(10,2) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "thumbnail" "text",
    "images" "text"[]
);

ALTER TABLE "public"."product_variants" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" character varying(255) NOT NULL,
    "description" "text" DEFAULT ''::"text" NOT NULL,
    "brand_id" bigint NOT NULL,
    "thumbnail" "text" DEFAULT ''::"text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "category_id" bigint
);

ALTER TABLE "public"."products" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."product_details_view" AS
 SELECT "p"."id",
    "p"."name",
    "p"."description",
    "p"."thumbnail",
    "c"."name" AS "category_name",
    "pb"."name" AS "brand_name",
    "public"."fn_calculate_product_rating"("p"."id") AS "rating",
    "array_agg"("pv"."id") AS "variant_ids"
   FROM (((("public"."products" "p"
     LEFT JOIN "public"."product_variants" "pv" ON (("pv"."product_id" = "p"."id")))
     LEFT JOIN "public"."categories" "c" ON (("c"."id" = "p"."category_id")))
     LEFT JOIN "public"."product_brands" "pb" ON (("pb"."id" = "p"."brand_id")))
     LEFT JOIN "public"."inventory" "i" ON (("i"."product_variant_id" = "pv"."id")))
  GROUP BY "p"."id", "p"."name", "p"."description", "p"."thumbnail", "c"."name", "pb"."name", ("public"."fn_calculate_product_rating"("p"."id"));

ALTER TABLE "public"."product_details_view" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."product_discounts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "start_date" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "end_date" timestamp with time zone,
    "discount_percent" numeric DEFAULT 0.00 NOT NULL,
    "product_id" "uuid" NOT NULL
);

ALTER TABLE "public"."product_discounts" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."product_reviews" (
    "id" bigint NOT NULL,
    "rating" smallint NOT NULL,
    "text" "text" DEFAULT ''::"text" NOT NULL,
    "product_id" "uuid" NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."product_reviews" OWNER TO "postgres";

ALTER TABLE "public"."product_reviews" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."product_reviews_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE SEQUENCE IF NOT EXISTS "public"."product_variants_variant_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."product_variants_variant_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."product_variants_variant_id_seq" OWNED BY "public"."product_variants"."id";

CREATE OR REPLACE VIEW "public"."products_slim" AS
 SELECT "p"."id",
    "p"."name",
    "p"."thumbnail",
    "public"."fn_calculate_product_rating"("p"."id") AS "rating",
    "pb"."name" AS "brand",
    "c"."name" AS "category",
    "array_agg"(DISTINCT ("pv"."attributes" ->> 'color'::"text")) FILTER (WHERE (("pv"."attributes" ->> 'color'::"text") IS NOT NULL)) AS "colors"
   FROM ((("public"."products" "p"
     LEFT JOIN "public"."product_variants" "pv" ON (("pv"."product_id" = "p"."id")))
     LEFT JOIN "public"."product_brands" "pb" ON (("pb"."id" = "p"."brand_id")))
     LEFT JOIN "public"."categories" "c" ON (("c"."id" = "p"."category_id")))
  GROUP BY "p"."id", "p"."name", "p"."thumbnail", "pb"."name", "c"."name";

ALTER TABLE "public"."products_slim" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profile_addresses" (
    "id" "uuid" NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "street" "text",
    "city" "text",
    "state" "text",
    "country" "text",
    "postal_code" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."profile_addresses" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "first_name" character varying,
    "last_name" character varying,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "profile_image" "text",
    CONSTRAINT "profiles_profile_image_check" CHECK (("length"("profile_image") < 500))
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

ALTER TABLE ONLY "public"."cart_items" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."cart_items_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."product_variants" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."product_variants_variant_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."carts"
    ADD CONSTRAINT "carts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."inventory"
    ADD CONSTRAINT "inventory_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."product_brands"
    ADD CONSTRAINT "product_brands_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."product_discounts"
    ADD CONSTRAINT "product_discounts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."product_reviews"
    ADD CONSTRAINT "product_reviews_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."product_variants"
    ADD CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profile_addresses"
    ADD CONSTRAINT "profile_addresses_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey1" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."product_brands"
    ADD CONSTRAINT "unique_brand_name" UNIQUE ("name");

ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "unique_category_name" UNIQUE ("name");

CREATE TRIGGER "check_product_stock_trigger" BEFORE INSERT ON "public"."cart_items" FOR EACH ROW EXECUTE FUNCTION "public"."check_product_stock"();

ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id");

ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "cart_items_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."carts"
    ADD CONSTRAINT "carts_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."inventory"
    ADD CONSTRAINT "inventory_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."product_discounts"
    ADD CONSTRAINT "product_discounts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."product_reviews"
    ADD CONSTRAINT "product_reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."product_reviews"
    ADD CONSTRAINT "product_reviews_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."product_variants"
    ADD CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."product_brands"("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id");

ALTER TABLE ONLY "public"."profile_addresses"
    ADD CONSTRAINT "profile_addresses_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "Enable all access for all users" ON "public"."product_variants" USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."categories" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."inventory" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."product_brands" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."product_discounts" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."product_reviews" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."products" FOR SELECT USING (true);

CREATE POLICY "Enable users to access their profile" ON "public"."profiles" TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

ALTER TABLE "public"."cart_items" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."carts" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enable all access to a user's cart" ON "public"."carts" TO "authenticated" USING (("auth"."uid"() IN ( SELECT "profiles"."user_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "carts"."profile_id")))) WITH CHECK (("auth"."uid"() IN ( SELECT "profiles"."user_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "carts"."profile_id"))));

CREATE POLICY "enable all access to user's cart items" ON "public"."cart_items" TO "authenticated" USING (("auth"."uid"() IN ( SELECT "p"."user_id"
   FROM ("public"."carts" "c"
     LEFT JOIN "public"."profiles" "p" ON (("p"."id" = "c"."profile_id")))
  WHERE ("cart_items"."cart_id" = "c"."id")))) WITH CHECK (("auth"."uid"() IN ( SELECT "p"."user_id"
   FROM ("public"."carts" "c"
     LEFT JOIN "public"."profiles" "p" ON (("p"."id" = "c"."profile_id")))
  WHERE ("cart_items"."cart_id" = "c"."id"))));

CREATE POLICY "enable all access to user's profile address" ON "public"."profile_addresses" TO "authenticated" USING (("auth"."uid"() IN ( SELECT "profiles"."user_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "profile_addresses"."profile_id")))) WITH CHECK (("auth"."uid"() IN ( SELECT "profiles"."user_id"
   FROM "public"."profiles"
  WHERE ("profiles"."id" = "profile_addresses"."profile_id"))));

ALTER TABLE "public"."inventory" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."product_brands" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."product_discounts" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."product_reviews" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."product_variants" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profile_addresses" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."check_product_stock"() TO "anon";
GRANT ALL ON FUNCTION "public"."check_product_stock"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_product_stock"() TO "service_role";

GRANT ALL ON FUNCTION "public"."fn_add_to_cart"("p_cart_id" "uuid", "p_product_variant_id" bigint, "p_quantity" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."fn_add_to_cart"("p_cart_id" "uuid", "p_product_variant_id" bigint, "p_quantity" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."fn_add_to_cart"("p_cart_id" "uuid", "p_product_variant_id" bigint, "p_quantity" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."fn_calculate_product_rating"("p_product_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."fn_calculate_product_rating"("p_product_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."fn_calculate_product_rating"("p_product_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."fn_create_product"("p_name" character varying, "p_price" numeric, "p_description" "text", "p_category" character varying, "p_brand" character varying, "p_thumbnail" "text", "p_images" "text"[], "p_quantity" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."fn_create_product"("p_name" character varying, "p_price" numeric, "p_description" "text", "p_category" character varying, "p_brand" character varying, "p_thumbnail" "text", "p_images" "text"[], "p_quantity" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."fn_create_product"("p_name" character varying, "p_price" numeric, "p_description" "text", "p_category" character varying, "p_brand" character varying, "p_thumbnail" "text", "p_images" "text"[], "p_quantity" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."fn_create_products_from_json"("product_list" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."fn_create_products_from_json"("product_list" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."fn_create_products_from_json"("product_list" "jsonb") TO "service_role";

GRANT ALL ON FUNCTION "public"."fn_create_user_resources"() TO "anon";
GRANT ALL ON FUNCTION "public"."fn_create_user_resources"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."fn_create_user_resources"() TO "service_role";

GRANT ALL ON FUNCTION "public"."fn_fetch_product_details"("p_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."fn_fetch_product_details"("p_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."fn_fetch_product_details"("p_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."fn_get_product_attributes"("p_product_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."fn_get_product_attributes"("p_product_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."fn_get_product_attributes"("p_product_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_attribute_keys"("product_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_attribute_keys"("product_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_attribute_keys"("product_id" "uuid") TO "service_role";

GRANT ALL ON TABLE "public"."cart_items" TO "anon";
GRANT ALL ON TABLE "public"."cart_items" TO "authenticated";
GRANT ALL ON TABLE "public"."cart_items" TO "service_role";

GRANT ALL ON SEQUENCE "public"."cart_items_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."cart_items_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."cart_items_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."carts" TO "anon";
GRANT ALL ON TABLE "public"."carts" TO "authenticated";
GRANT ALL ON TABLE "public"."carts" TO "service_role";

GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "service_role";

GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."inventory" TO "anon";
GRANT ALL ON TABLE "public"."inventory" TO "authenticated";
GRANT ALL ON TABLE "public"."inventory" TO "service_role";

GRANT ALL ON SEQUENCE "public"."inventory_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."inventory_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."inventory_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."product_brands" TO "anon";
GRANT ALL ON TABLE "public"."product_brands" TO "authenticated";
GRANT ALL ON TABLE "public"."product_brands" TO "service_role";

GRANT ALL ON SEQUENCE "public"."product_brands_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."product_brands_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."product_brands_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."product_variants" TO "anon";
GRANT ALL ON TABLE "public"."product_variants" TO "authenticated";
GRANT ALL ON TABLE "public"."product_variants" TO "service_role";

GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";

GRANT ALL ON TABLE "public"."product_details_view" TO "anon";
GRANT ALL ON TABLE "public"."product_details_view" TO "authenticated";
GRANT ALL ON TABLE "public"."product_details_view" TO "service_role";

GRANT ALL ON TABLE "public"."product_discounts" TO "anon";
GRANT ALL ON TABLE "public"."product_discounts" TO "authenticated";
GRANT ALL ON TABLE "public"."product_discounts" TO "service_role";

GRANT ALL ON TABLE "public"."product_reviews" TO "anon";
GRANT ALL ON TABLE "public"."product_reviews" TO "authenticated";
GRANT ALL ON TABLE "public"."product_reviews" TO "service_role";

GRANT ALL ON SEQUENCE "public"."product_reviews_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."product_reviews_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."product_reviews_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."product_variants_variant_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."product_variants_variant_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."product_variants_variant_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."products_slim" TO "anon";
GRANT ALL ON TABLE "public"."products_slim" TO "authenticated";
GRANT ALL ON TABLE "public"."products_slim" TO "service_role";

GRANT ALL ON TABLE "public"."profile_addresses" TO "anon";
GRANT ALL ON TABLE "public"."profile_addresses" TO "authenticated";
GRANT ALL ON TABLE "public"."profile_addresses" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";
GRANT INSERT,DELETE,UPDATE ON TABLE "public"."profiles" TO "supabase_auth_admin";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
