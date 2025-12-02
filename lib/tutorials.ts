import { supabase } from "./supabase";
import { Tutorial } from "@/types/database";

export async function getTutorials(): Promise<Tutorial[]> {
  const { data, error } = await supabase
    .from("tutorials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tutorials:", error);
    return [];
  }

  return data || [];
}

export async function getTutorialBySlug(
  slug: string
): Promise<Tutorial | null> {
  const { data, error } = await supabase
    .from("tutorials")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching tutorial:", error);
    return null;
  }

  return data;
}

export async function getTutorialById(id: string): Promise<Tutorial | null> {
  const { data, error } = await supabase
    .from("tutorials")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching tutorial:", error);
    return null;
  }

  return data;
}

// Mock data for development/demo when Supabase is not configured
