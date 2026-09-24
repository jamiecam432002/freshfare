import supabase from "./supabase";

export async function getCategories() {
  const { data } = await supabase.from("categories").select("*");

  return data;
}
