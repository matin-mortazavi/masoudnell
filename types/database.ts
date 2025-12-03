export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export type ProductCategory = "clothes" | "shoes" | "accessories";

export interface Product {
  id: string;
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
  created_at: string;
  updated_at: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty_level: DifficultyLevel;
  video_url: string | null;
  image_url: string;
  slug: string;
  duration_minutes: number | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      tutorials: {
        Row: Tutorial;
        Insert: Omit<Tutorial, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Tutorial, "id" | "created_at" | "updated_at">>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Product, "id" | "created_at" | "updated_at">>;
      };
    };
  };
}
