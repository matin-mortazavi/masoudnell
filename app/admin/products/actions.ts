"use server";

import { supabaseAdmin } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { ProductCategory } from "@/types/database";

export interface ProductFormData {
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

export async function createProductAction(data: ProductFormData) {
  try {
    const { data: product, error } = await supabaseAdmin
      .from("products")
      .insert([data] as any)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin");
    revalidatePath("/products");
    return { success: true, product };
  } catch (err) {
    return { success: false, error: "خطا در ایجاد محصول" };
  }
}

export async function updateProductAction(
  id: string,
  data: Partial<ProductFormData>
) {
  try {
    const { data: product, error } = await supabaseAdmin
      .from("products")
      .update(data as any)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin");
    revalidatePath("/products");
    revalidatePath(`/products/${data.slug}`);
    return { success: true, product };
  } catch (err) {
    return { success: false, error: "خطا در بروزرسانی محصول" };
  }
}

export async function deleteProductAction(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin");
    revalidatePath("/products");
    return { success: true };
  } catch (err) {
    return { success: false, error: "خطا در حذف محصول" };
  }
}

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "فایلی انتخاب نشده" };
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    // Convert File to ArrayBuffer then to Uint8Array for upload
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const { data, error } = await supabaseAdmin.storage
      .from("images")
      .upload(filePath, uint8Array, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return { success: false, error: error.message };
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from("images")
      .getPublicUrl(filePath);

    return { success: true, url: urlData.publicUrl };
  } catch (err) {
    console.error("Upload error:", err);
    return { success: false, error: "خطا در آپلود تصویر" };
  }
}

export async function deleteImageAction(imageUrl: string) {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split("/storage/v1/object/public/images/");
    if (urlParts.length < 2) {
      return { success: false, error: "آدرس تصویر نامعتبر است" };
    }

    const filePath = urlParts[1];

    const { error } = await supabaseAdmin.storage
      .from("images")
      .remove([filePath]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: "خطا در حذف تصویر" };
  }
}
