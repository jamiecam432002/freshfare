import { PAGE_SIZE } from "../../../utils/constants";
import supabase from "../../../services/supabase";
import { uploadThumbnailImage } from "@/services/apiStorage";

export async function getProducts(status, category, supplier, page, search) {
  let query = supabase
    .from("products")
    .select("*, suppliers(*), categories(*)", { count: "exact" });

  // SEARCH
  if (search) {
    query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`);
  }

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

export async function getProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*, supplier:suppliers(id, name), category:categories(id, name)")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Product not found!");
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

export async function saveProduct({ id, values, imageFile }) {
  let newImagePath = null;

  // first upload a new image if one was selected.
  if (imageFile) {
    newImagePath = await uploadThumbnailImage(imageFile, "products");
  }

  const {
    categories,
    suppliers,
    image_path,
    id: formId,
    ...productValues
  } = values;

  // only change image_path if an image was uploaded.
  const productData = {
    ...productValues,
    ...(newImagePath && {
      image_path: newImagePath,
    }),
  };

  try {
    const query = id
      ? supabase.from("products").update(productData).eq("id", id)
      : supabase.from("products").insert(productData);
    const { data, error } = await query.select().single();

    if (error) throw error;
    return data;
  } catch (error) {
    // remove the newly uploaded image if DB save fails
    if (newImagePath) {
      const { error: cleanupError } = await supabase.storage
        .from("freshfare-images")
        .remove([newImagePath]);

      if (cleanupError) {
        console.error("Image cleanup failed:", cleanupError);
      }
    }
    throw error;
  }
}
