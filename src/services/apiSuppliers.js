import supabase from "./supabase";

export async function getSuppliers() {
  const { data, error } = await supabase.from("suppliers").select("*");

  return data;
}
