import supabase from "../services/supabase";

export function getProductImageUrl(path) {
  if (!path) return null;

  const { data } = supabase.storage.from("freshfare-images").getPublicUrl(path);

  return data.publicUrl;
}
