import {
  StatusFilters,
  CategoryFilters,
  SupplierFilters,
} from "./ProductFilters";

export default function ProductTableOperations() {
  return (
    <div className="flex items-center gap-6">
      <CategoryFilters />
      <SupplierFilters />
      <StatusFilters />
    </div>
  );
}
