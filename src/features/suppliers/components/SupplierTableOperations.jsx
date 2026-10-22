import ClearFiltersBtn from "@/features/products/filters/ClearFiltersBtn";
import SearchFilter from "@/features/products/filters/SearchFilter";
import StatusFilters from "@/features/products/filters/StatusFilters";

export default function SupplierTableOperations() {
  return (
    <div className="flex w-full flex-col gap-4 py-4">
      <div>
        <SearchFilter />
      </div>
      <div className="flex items-center gap-4">
        <StatusFilters />
        <ClearFiltersBtn />
      </div>
    </div>
  );
}
