import AddSupplier from "@/features/suppliers/components/AddSupplier";
import SupplierTable from "@/features/suppliers/components/SupplierTable";

export default function Suppliers() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Suppliers</h1>
          <h2>Manage your product suppliers and their information.</h2>
        </div>
        <AddSupplier />
      </div>
      <div>
        <div className="flex items-center gap-6">
          {/* <SupplierTableOperations /> */}
        </div>
        <SupplierTable />
      </div>
    </>
  );
}
