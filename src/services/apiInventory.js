import supabase from "./supabase";

export async function adjustProductStock({
  productId,
  quantityChange,
  reason,
  notes = "",
}) {
  if (!Number.isInteger(quantityChange) || quantityChange === 0) {
    throw new Error("Stock adjustment must be a non-zero integer");
  }

  const params = {
    p_product_id: productId,
    p_delta: quantityChange,
    p_reason: reason,
    p_notes: notes,
  };

  const { data, error } = await supabase
    .rpc("adjust_product_stock", {
      p_product_id: productId,
      p_delta: quantityChange,
      p_reason: reason,
      p_notes: notes.trim() || null,
    })
    .single();

  if (error) {
    console.error("Stock adjustment error:", error);
    throw new Error(error.message);
  }

  return data;
}
