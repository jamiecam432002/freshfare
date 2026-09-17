import supabase from "./supabase";

export async function getProducts() {
  let query = supabase
    .from("products")
    .select("*, suppliers(*), categories(*)")
    .order("quantity", { ascending: false });
  const { data: products, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return products;
}

export async function createProduct(newProduct) {
  const newProductForInsert = {
    active: newProduct.active,
    category_id: newProduct.category_id,
    description: newProduct.description,
    name: newProduct.name,
    price: newProduct.price,
    quantity: newProduct.quantity,
    sku: newProduct.sku,
    supplier_id: newProduct.supplier_id,
  };
  const { data, error } = await supabase
    .from("products")
    .insert(newProductForInsert)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteProduct(id) {
  const { data, error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Product could not be deleted");
  }

  return data;
}

export async function updateProduct(product) {
  const id = Number(product.id);
  const updatedProductForInsert = {
    active: product.active,
    category_id: product.category_id,
    description: product.description,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    sku: product.sku,
    supplier_id: product.supplier_id,
  };

  const { data, error } = await supabase
    .from("products")
    .update(updatedProductForInsert)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
