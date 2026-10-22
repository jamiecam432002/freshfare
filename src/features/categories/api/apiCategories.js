import supabase from "../../../services/supabase";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories_with_counts")
    .select("*");

  if (error) throw new Error(error.message);

  return data;
}

export async function getCategoryCount() {
  const { count, error } = await supabase.from("categories").select("*", {
    count: "exact",
    head: true,
  });

  if (error) throw new Error(error.message);

  return count;
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
