import supabase from "./supabase";

export async function getSuppliers() {
  const { data } = await supabase.from("suppliers").select("*");

  return data;
}

export async function getSupplierCount() {
  const { count, error } = await supabase.from("suppliers").select("*", {
    count: "exact",
    head: true,
  });

  if (error) throw new Error(error.message);

  return count;
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
