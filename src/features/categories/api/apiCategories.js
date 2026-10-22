import { uploadThumbnailImage } from "@/services/apiStorage";
import supabase from "../../../services/supabase";

export async function getCategories(status, search) {
  let query = supabase
    .from("categories_with_counts")
    .select("*", { count: "exact" });

  // SEARCH
  if (search) {
    query = query.or(`name.ilike.%${search}%`);
  }

  // FILTER
  if (status === "active") {
    query = query.eq("active", true);
  }
  if (status === "inactive") {
    query = query.eq("active", false);
  }

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return { data, count };
}

export async function getCategoryCount() {
  const { count, error } = await supabase.from("categories").select("*", {
    count: "exact",
    head: true,
  });

  if (error) throw new Error(error.message);

  return count;
}

export async function saveCategory({ id, values, imageFile }) {
  let newImagePath = null;

  // first upload a new image if one was selected.
  if (imageFile) {
    newImagePath = await uploadThumbnailImage(imageFile, "categories");
  }

  const { id: formId, ...categoryValues } = values;

  // only change image_path if an image was uploaded.
  const categoryData = {
    ...categoryValues,
    ...(newImagePath && {
      image_path: newImagePath,
    }),
  };

  try {
    const query = id
      ? supabase.from("categories").update(categoryData).eq("id", id)
      : supabase.from("categories").insert(categoryData);
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

export async function createCategory(newCategory) {
  const newCategoryForInsert = {
    active: newCategory.active,
    description: newCategory.description,
    name: newCategory.name,
  };

  const { data, error } = await supabase
    .from("categories")
    .insert(newCategoryForInsert)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function updateCategory(category) {
  const id = Number(category.id);
  const updatedCategoryForInsert = {
    active: category.active,
    description: category.description,
    name: category.name,
  };

  const { data, error } = await supabase
    .from("categories")
    .update(updatedCategoryForInsert)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteCategory(id) {
  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
