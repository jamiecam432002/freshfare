import supabase from "./supabase";

export async function getSuppliers() {
  const { data } = await supabase.from("suppliers").select("*");

  return data;
}
