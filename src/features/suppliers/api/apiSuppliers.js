import { uploadThumbnailImage } from "@/services/apiStorage";
import supabase from "../../../services/supabase";
import { PAGE_SIZE } from "../../../utils/constants";

export async function getSuppliers(status, page, search) {
  let query = supabase
    .from("suppliers_with_counts")
    .select("*", { count: "exact" });

  // SEARCH
  if (search) {
    query = query.or(`name.ilike.%${search}%,contact_name.ilike.%${search}%`);
  }

  // FILTER
  if (status === "active") {
    query = query.eq("active", true);
  }
  if (status === "inactive") {
    query = query.eq("active", false);
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error(error.message);
    throw new Error("Suppliers could not be loaded");
  }

  return { data, count };
}

export async function getSupplierCount() {
  const { count, error } = await supabase.from("suppliers").select("*", {
    count: "exact",
    head: true,
  });

  if (error) throw new Error(error.message);

  return count;
}

export async function saveSupplier({ id, values, imageFile }) {
  let newImagePath = null;

  // first upload a new image if one was selected.
  if (imageFile) {
    newImagePath = await uploadThumbnailImage(imageFile, "suppliers");
  }

  const { id: formId, ...supplierValues } = values;

  // only change image_path if an image was uploaded.
  const supplierData = {
    ...supplierValues,
    ...(newImagePath && {
      image_path: newImagePath,
    }),
  };

  try {
    const query = id
      ? supabase.from("suppliers").update(supplierData).eq("id", id)
      : supabase.from("suppliers").insert(supplierData);
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

export async function createSupplier(newSupplier) {
  const newSupplierForInsert = {
    active: newSupplier.active,
    name: newSupplier.name,
    contact_name: newSupplier.contact,
    email: newSupplier.email,
    phone: newSupplier.phone,
  };

  const { data, error } = await supabase
    .from("suppliers")
    .insert(newSupplierForInsert)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function updateSupplier(supplier) {
  const id = Number(supplier.id);
  const updatedSupplierForInsert = {
    active: supplier.active,
    name: supplier.name,
    contact_name: supplier.contact,
    email: supplier.email,
    phone: supplier.phone,
  };

  const { data, error } = await supabase
    .from("suppliers")
    .update(updatedSupplierForInsert)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function deleteSupplier(id) {
  const { data, error } = await supabase
    .from("suppliers")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
