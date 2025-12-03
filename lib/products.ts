import { supabase } from "./supabase";
import { Product, ProductCategory } from "@/types/database";

export interface CreateProductInput {
  title_en: string;
  title_fa: string;
  description_en: string;
  description_fa: string;
  category: ProductCategory;
  price: number;
  discount_percentage: number;
  images: string[];
  slug: string;
  sizes: string[];
  colors: string[];
  telegram_username: string;
  in_stock: boolean;
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
}

export async function createProduct(
  productData: CreateProductInput
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .insert([productData] as any)
    .select()
    .single();

  if (error) {
    console.error("Error creating product:", error);
    throw new Error(error.message);
  }

  return data as Product;
}

export async function updateProduct(
  id: string,
  productData: Partial<CreateProductInput>
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    //@ts-expect-error
    .update(productData as any)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating product:", error);
    throw new Error(error.message);
  }

  return data as Product;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    throw new Error(error.message);
  }
}
