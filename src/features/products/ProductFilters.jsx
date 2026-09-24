import { useSearchParams } from "react-router-dom";
import useCategories from "./useCategories";
import useSuppliers from "./useSuppliers";

export function StatusFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status") ?? "all";

  function handleStatusChange(e) {
    const value = e.target.value;

    setSearchParams((params) => {
      if (value === "all") {
        params.delete("status");
      } else {
        params.set("status", value);
      }

      params.set("page", "1");
      return params;
    });
  }

  return (
    <div className="flex gap-2 rounded-sm border border-[--color-grey-100] bg-[--color-grey-0] px-2 py-2 shadow-sm">
      <label htmlFor="status">Status</label>
      <select id="status" value={status} onChange={handleStatusChange}>
        <option value="all">All products</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}

export function CategoryFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories = [] } = useCategories();

  const status = searchParams.get("category_id") ?? "all";

  function handleStatusChange(e) {
    const value = e.target.value;

    setSearchParams((params) => {
      if (value === "all") {
        params.delete("category_id");
      } else {
        params.set("category_id", value);
      }

      params.set("page", "1");
      return params;
    });
  }

  return (
    <div className="flex gap-2 rounded-sm border border-[--color-grey-100] bg-[--color-grey-0] px-2 py-2 shadow-sm">
      <label htmlFor="status">Category</label>
      <select id="status" value={status} onChange={handleStatusChange}>
        <option value="all">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SupplierFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: suppliers = [] } = useSuppliers();

  const status = searchParams.get("supplier_id") ?? "all";

  function handleStatusChange(e) {
    const value = e.target.value;

    setSearchParams((params) => {
      if (value === "all") {
        params.delete("supplier_id");
      } else {
        params.set("supplier_id", value);
      }

      params.set("page", "1");
      return params;
    });
  }

  return (
    <div className="flex gap-2 rounded-sm border border-[--color-grey-100] bg-[--color-grey-0] px-2 py-2 shadow-sm">
      <label htmlFor="status">Supplier</label>
      <select id="status" value={status} onChange={handleStatusChange}>
        <option value="all">All suppliers</option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name}
          </option>
        ))}
      </select>
    </div>
  );
}
