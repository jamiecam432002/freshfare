import CategoryFilters from "./filters/CategoryFilters";
import SupplierFilters from "./filters/SupplierFilters";
import StatusFilters from "./filters/StatusFilters";
import SearchFilter from "./filters/SearchFilter";
import ClearFiltersBtn from "./filters/ClearFiltersBtn";

export default function ProductTableOperations() {
  return (
    <div className="flex w-full flex-col gap-4 py-4">
      <div>
        <SearchFilter />
      </div>
      <div className="flex items-center gap-4">
        <CategoryFilters />
        <SupplierFilters />
        <StatusFilters />
        <ClearFiltersBtn />
      </div>
    </div>
  );
}
