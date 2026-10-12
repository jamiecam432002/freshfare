import supabase from "@/services/supabase";

export async function getDashboardStats() {
  const { data, error } = await supabase.rpc("get_dashboard_stats");

  if (error) throw new Error(error.message);
  return data;
}
