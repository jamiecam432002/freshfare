import supabase from "@/services/supabase";

export async function getCategorySummary() {
  const { data, error } = await supabase
    .from("dashboard_category_summary")
    .select("*");

  if (error) {
    throw new Error("Could not load category summary!");
  }
  return data ?? [];
}
