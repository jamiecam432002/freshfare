import supabase from "@/services/supabase";

export async function getLowStockProducts() {
  const { data, error } = await supabase
    .from("low_stock_products")
    .select("*")
    .order("quantity", { ascending: true })
    .limit(5);

  if (error) {
    throw new Error("Could not load low products!");
  }
  return data ?? [];
}
