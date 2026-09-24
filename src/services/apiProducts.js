import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getProducts(status, category, supplier, page) {
  console.log("getProducts is firing again");
  console.log(status, category, supplier);
  let query = supabase
    .from("products")
    .select("*, suppliers(*), categories(*)", { count: "exact" });
  //.order("quantity", { ascending: false });

  // FILTER
  if (status === "active") {
    query = query.eq("active", true);
  }
  if (status === "inactive") {
    query = query.eq("active", false);
  }

  if (category !== "all") {
    query = query.eq("category_id", category);
  }
  if (supplier !== "all") {
    query = query.eq("supplier_id", supplier);
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return { data, count };
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
