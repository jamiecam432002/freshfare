import ProductTable from "../features/products/ProductTable";
import AddProduct from "../features/products/AddProduct";

export default function Inventory() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-semibold">All Products</h1>
        <div className="flex items-center gap-6">Filter / Sort</div>
      </div>
      <div>
        <ProductTable />
        <AddProduct />
      </div>
    </>
  );
}
